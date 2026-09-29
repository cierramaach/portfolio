import { useEffect, useRef, useState } from 'react'
import { useEditor } from '../lib/content'
import { Link, useNav } from '../lib/nav'

export function IndexNav() {
  const { site } = useEditor()
  const { path, hash } = useNav()
  const rootRef = useRef<HTMLDivElement>(null)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    setOpen(false)
  }, [path, hash])

  useEffect(() => {
    if (!open) return

    const onPointer = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false)
      }
    }
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }

    window.addEventListener('pointerdown', onPointer)
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('pointerdown', onPointer)
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <div className="index-nav" ref={rootRef}>
      <button
        className="index-nav-toggle"
        type="button"
        aria-expanded={open}
        aria-controls="index-nav-panel"
        onClick={() => setOpen((value) => !value)}
      >
        Menu
      </button>
      {open ? (
        <nav id="index-nav-panel" className="index-nav-panel" aria-label="Menu">
          {site.practices.filter((practice) => !practice.hidden).map((practice) => {
            const children = site.efforts.filter((effort) =>
              effort.path?.startsWith(`/${practice.slug}/`),
            )
            return (
              <div key={practice.slug} className="index-nav-group">
                <Link
                  className={
                    path === '/' && hash === practice.slug
                      ? 'index-nav-practice is-current'
                      : 'index-nav-practice'
                  }
                  to={`/#${practice.slug}`}
                >
                  <span>{practice.index}</span>
                  {practice.title}
                </Link>
                {children.map((effort) => (
                  <Link
                    key={effort.id}
                    className={
                      path === effort.path
                        ? 'index-nav-effort is-current'
                        : 'index-nav-effort'
                    }
                    to={effort.path ?? practice.path}
                  >
                    {effort.title}
                  </Link>
                ))}
              </div>
            )
          })}
        </nav>
      ) : null}
    </div>
  )
}
