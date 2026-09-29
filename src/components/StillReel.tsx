import { useEffect, useRef, useState } from 'react'

export type ReelFrame = {
  src: string
  alt: string
}

type StillReelProps = {
  frames: ReelFrame[]
  ticks?: string[]
  holdMs?: number
}

const FADE_MS = 1000

export function StillReel({
  frames,
  ticks,
  holdMs = 6000,
}: StillReelProps) {
  const frameRef = useRef<HTMLDivElement>(null)
  const activeRef = useRef(0)
  const [active, setActive] = useState(0)
  const [leaving, setLeaving] = useState<number | null>(null)

  useEffect(() => {
    activeRef.current = active
  }, [active])

  useEffect(() => {
    if (frames.length < 2) return

    const node = frameRef.current
    if (!node) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return

    let holdTimer = 0
    let fadeTimer = 0

    const advance = () => {
      const from = activeRef.current
      const next = (from + 1) % frames.length
      setLeaving(from)
      setActive(next)
      window.clearTimeout(fadeTimer)
      fadeTimer = window.setTimeout(() => {
        setLeaving((current) => (current === from ? null : current))
      }, FADE_MS)
    }

    const start = () => {
      if (holdTimer) return
      holdTimer = window.setInterval(advance, holdMs)
    }
    const stop = () => {
      window.clearInterval(holdTimer)
      window.clearTimeout(fadeTimer)
      holdTimer = 0
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) start()
        else stop()
      },
      { threshold: 0.2 },
    )
    observer.observe(node)

    return () => {
      stop()
      observer.disconnect()
    }
  }, [frames.length, holdMs])

  if (!frames.length) return null

  return (
    <figure className="still still-fill still-reel">
      <div className="still-frame" ref={frameRef}>
        {frames.map((frame, index) => {
          const isActive = index === active
          const isLeaving = index === leaving
          return (
            <img
              key={frame.src}
              className={[
                'still-img',
                'still-reel-img',
                isActive ? 'is-active' : '',
                isLeaving ? 'is-leaving' : '',
              ]
                .filter(Boolean)
                .join(' ')}
              src={frame.src}
              alt={isActive ? frame.alt : ''}
              aria-hidden={!isActive}
            />
          )
        })}
        {ticks?.length ? (
          <ol className="still-ticks">
            {ticks.map((tick) => (
              <li key={tick}>{tick}</li>
            ))}
          </ol>
        ) : null}
      </div>
    </figure>
  )
}
