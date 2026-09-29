import {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type KeyboardEvent,
  type MouseEvent,
  type RefObject,
} from 'react'
import { useEditor } from '../lib/content'

type EditableProps = {
  value: string
  onChange: (value: string) => void
  className?: string
  id?: string
  as?: 'span' | 'p' | 'h1' | 'h2'
  multiline?: boolean
}

export function Editable({
  value,
  onChange,
  className,
  id,
  as: Tag = 'span',
  multiline = false,
}: EditableProps) {
  const { editing } = useEditor()
  const [active, setActive] = useState(false)
  const [draft, setDraft] = useState(value)
  const fieldRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null)

  useEffect(() => {
    if (!active) setDraft(value)
  }, [value, active])

  useEffect(() => {
    if (!active || !fieldRef.current) return
    fieldRef.current.focus()
    fieldRef.current.select()
    if (multiline && fieldRef.current instanceof HTMLTextAreaElement) {
      fieldRef.current.style.height = 'auto'
      fieldRef.current.style.height = `${fieldRef.current.scrollHeight}px`
    }
  }, [active, multiline])

  if (!editing) {
    return (
      <Tag id={id} className={className}>
        {value}
      </Tag>
    )
  }

  const commit = () => {
    const next = draft.replace(/\s+$/u, '')
    onChange(next)
    setActive(false)
  }

  const onKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      setDraft(value)
      setActive(false)
    }
    if (event.key === 'Enter' && !multiline) {
      event.preventDefault()
      commit()
    }
  }

  if (active) {
    const shared = {
      className: `${className ?? ''} is-editing`.trim(),
      value: draft,
      onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setDraft(event.target.value)
        if (multiline && event.target instanceof HTMLTextAreaElement) {
          event.target.style.height = 'auto'
          event.target.style.height = `${event.target.scrollHeight}px`
        }
      },
      onBlur: commit,
      onKeyDown,
      onClick: (event: MouseEvent) => {
        event.preventDefault()
        event.stopPropagation()
      },
    }

    return multiline ? (
      <textarea
        ref={fieldRef as RefObject<HTMLTextAreaElement>}
        {...shared}
        rows={1}
      />
    ) : (
      <input
        ref={fieldRef as RefObject<HTMLInputElement>}
        type="text"
        {...shared}
      />
    )
  }

  return (
    <Tag
      id={id}
      className={`${className ?? ''} is-editable`.trim()}
      onClick={(event) => {
        event.preventDefault()
        event.stopPropagation()
        setActive(true)
      }}
    >
      {value || 'Write here'}
    </Tag>
  )
}
