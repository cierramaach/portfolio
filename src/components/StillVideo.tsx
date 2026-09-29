import { useEffect, useRef } from 'react'

type StillVideoProps = {
  src: string
  poster?: string
  label?: string
  fill?: boolean
  loop?: boolean
  muted?: boolean
  autoPlayInView?: boolean
  preload?: 'none' | 'metadata' | 'auto'
}

export function StillVideo({
  src,
  poster,
  label,
  fill = false,
  loop = true,
  muted = true,
  autoPlayInView = true,
  preload = 'metadata',
}: StillVideoProps) {
  const caption = label?.trim() ?? ''

  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const node = videoRef.current
    if (!node || !autoPlayInView) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)')
    let observer: IntersectionObserver | null = null

    const stop = () => {
      observer?.disconnect()
      observer = null
      node.pause()
    }

    const start = () => {
      if (observer) return
      observer = new IntersectionObserver(
        ([entry]) => {
          if (reduce.matches) {
            node.pause()
            return
          }
          if (entry.isIntersecting) {
            node.play().catch(() => {})
          } else {
            node.pause()
          }
        },
        { threshold: 0.45 },
      )
      observer.observe(node)
    }

    const sync = () => {
      if (reduce.matches) stop()
      else start()
    }

    sync()
    reduce.addEventListener('change', sync)
    return () => {
      reduce.removeEventListener('change', sync)
      stop()
    }
  }, [src, autoPlayInView])

  return (
    <figure className={fill ? 'still still-fill still-video-cut' : 'still still-video-cut'}>
      <div className="still-frame">
        <video
          ref={videoRef}
          className="still-video"
          src={src}
          poster={poster}
          muted={muted}
          loop={loop}
          playsInline
          controls
          preload={preload}
          aria-label={caption || 'Visualization'}
        />
        {caption ? (
          <ol className="still-ticks">
            <li>{caption}</li>
          </ol>
        ) : null}
      </div>
    </figure>
  )
}
