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

function Chevron({ dir }: { dir: 'prev' | 'next' }) {
  return (
    <svg viewBox="0 0 24 36" aria-hidden="true">
      {dir === 'prev' ? (
        <path d="M16 3 6 18l10 15" />
      ) : (
        <path d="M8 3l10 15L8 33" />
      )}
    </svg>
  )
}

export function StillReel({
  frames,
  ticks,
  holdMs = 6000,
}: StillReelProps) {
  const frameRef = useRef<HTMLDivElement>(null)
  const activeRef = useRef(0)
  const fadeTimerRef = useRef(0)
  const holdTimerRef = useRef(0)
  const visibleRef = useRef(false)
  const reduceRef = useRef(false)
  const goRef = useRef<(delta: number) => void>(() => {})
  const restartHoldRef = useRef<() => void>(() => {})
  const [active, setActive] = useState(0)
  const [leaving, setLeaving] = useState<number | null>(null)

  useEffect(() => {
    activeRef.current = active
  }, [active])

  const go = (delta: number) => {
    const count = frames.length
    if (count < 2) return
    const from = activeRef.current
    const next = (from + delta + count) % count
    if (next === from) return
    setLeaving(from)
    setActive(next)
    window.clearTimeout(fadeTimerRef.current)
    fadeTimerRef.current = window.setTimeout(() => {
      setLeaving((current) => (current === from ? null : current))
    }, FADE_MS)
  }

  goRef.current = go

  useEffect(() => {
    if (frames.length < 2) return

    const node = frameRef.current
    if (!node) return

    reduceRef.current = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches

    const stop = () => {
      window.clearInterval(holdTimerRef.current)
      holdTimerRef.current = 0
    }

    const start = () => {
      if (reduceRef.current || holdTimerRef.current) return
      holdTimerRef.current = window.setInterval(() => {
        goRef.current(1)
      }, holdMs)
    }

    restartHoldRef.current = () => {
      stop()
      if (visibleRef.current) start()
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        visibleRef.current = entry.isIntersecting
        if (entry.isIntersecting) start()
        else stop()
      },
      { threshold: 0.2 },
    )
    observer.observe(node)

    return () => {
      stop()
      window.clearTimeout(fadeTimerRef.current)
      observer.disconnect()
    }
  }, [frames.length, holdMs])

  if (!frames.length) return null

  const canNav = frames.length > 1
  const handleNav = (delta: number) => {
    go(delta)
    restartHoldRef.current()
  }

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
        {canNav ? (
          <>
            <button
              type="button"
              className="still-reel-nav still-reel-prev"
              aria-label="Previous still"
              onClick={() => handleNav(-1)}
            >
              <Chevron dir="prev" />
            </button>
            <button
              type="button"
              className="still-reel-nav still-reel-next"
              aria-label="Next still"
              onClick={() => handleNav(1)}
            >
              <Chevron dir="next" />
            </button>
          </>
        ) : null}
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
