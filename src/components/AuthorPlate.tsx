import { useEditor } from '../lib/content'
import { HERO_HEX_FRAME, HERO_HEXES } from '../data/heroHex'
import { Editable } from './Editable'
import { useLayoutEffect, useRef, type CSSProperties } from 'react'

export function AuthorPlate() {
  const { site, update } = useEditor()
  const [lead, mid, end] = site.identity.roles
  const heroRef = useRef<HTMLElement>(null)
  const lockupRef = useRef<HTMLDivElement>(null)
  const fieldRef = useRef<HTMLDivElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const hero = heroRef.current
    const lockup = lockupRef.current
    const field = fieldRef.current
    const stage = stageRef.current
    if (!hero || !lockup || !field || !stage) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)')

    const fit = () => {
      const pane = hero.querySelector('.hero-geometry')
      const leadEl = lockup.querySelector('.hero-lead')
      const midEl = lockup.querySelector('.hero-mid')
      const endEl = lockup.querySelector('.hero-end')
      if (
        !(pane instanceof HTMLElement) ||
        !(leadEl instanceof HTMLElement) ||
        !(midEl instanceof HTMLElement) ||
        !(endEl instanceof HTMLElement)
      ) {
        return
      }

      const stacked = window.matchMedia('(max-width: 860px)').matches
      if (stacked) {
        pane.style.clipPath = ''
        field.style.left = ''
        field.style.width = ''
        field.style.transform = ''
      } else {
        const heroBox = hero.getBoundingClientRect()
        const leadBox = leadEl.getBoundingClientRect()
        const lowerRight = Math.max(
          midEl.getBoundingClientRect().right,
          endEl.getBoundingClientRect().right,
        )
        const gap = 18
        const topCut = leadBox.right + gap - heroBox.left
        const lowCut = lowerRight + gap - heroBox.left
        const shelf = leadBox.bottom + 10 - heroBox.top
        const room = Math.max(heroBox.width - lowCut, 160)
        const t = Math.max(0, Math.min(1, (room - 280) / 800))
        const scale = 0.92 + t * 0.08
        pane.style.clipPath = `polygon(${topCut}px 0, 100% 0, 100% 100%, ${lowCut}px 100%, ${lowCut}px ${shelf}px, ${topCut}px ${shelf}px)`
        field.style.left = `${lowCut}px`
        field.style.width = `${room}px`
        field.style.transformOrigin = '100% 0%'
        field.style.transform = `scale(${scale.toFixed(3)})`
      }

      const box = field.getBoundingClientRect()
      const cover = Math.max(box.width / HERO_HEX_FRAME.w, box.height / HERO_HEX_FRAME.h)
      stage.style.width = `${HERO_HEX_FRAME.w * cover}px`
      stage.style.height = `${HERO_HEX_FRAME.h * cover}px`
    }

    fit()
    const observer = new ResizeObserver(fit)
    observer.observe(hero)
    const pane = hero.querySelector('.hero-geometry')
    if (pane) observer.observe(pane)
    observer.observe(lockup)
    observer.observe(field)
    reduce.addEventListener('change', fit)

    const arrive = () => {
      if (reduce.matches) {
        field.classList.add('is-in')
        return
      }
      requestAnimationFrame(() => {
        requestAnimationFrame(() => field.classList.add('is-in'))
      })
    }

    const tiles = [...field.querySelectorAll('img')]
    const decoded = Promise.all(
      tiles.map((img) => img.decode().catch(() => undefined)),
    )
    const fallback = new Promise((resolve) => window.setTimeout(resolve, 900))
    Promise.race([decoded, fallback]).then(arrive)

    return () => {
      observer.disconnect()
      reduce.removeEventListener('change', fit)
    }
  }, [])

  return (
    <section id="plate" className="hero" aria-labelledby="hero-title" ref={heroRef}>
      <div className="hero-lockup" ref={lockupRef}>
        <h1 id="hero-title" className="hero-title">
          <Editable
            className="hero-line hero-lead"
            value={lead}
            onChange={(value) =>
              update((draft) => {
                draft.identity.roles[0] = value
              })
            }
          />
          <span className="hero-roles">
            <span className="hero-mid-row">
              <span className="hero-rule" aria-hidden="true" />
              <Editable
                className="hero-line hero-mid"
                value={mid}
                onChange={(value) =>
                  update((draft) => {
                    draft.identity.roles[1] = value
                  })
                }
              />
            </span>
            <Editable
              className="hero-line hero-end"
              value={end}
              onChange={(value) =>
                update((draft) => {
                  draft.identity.roles[2] = value
                })
              }
            />
          </span>
        </h1>

        <p className="hero-blurb">
          <Editable
            value={site.identity.blurbBreak}
            onChange={(value) =>
              update((draft) => {
                draft.identity.blurbBreak = value
              })
            }
          />
          <Editable
            value={site.identity.blurbContinue}
            onChange={(value) =>
              update((draft) => {
                draft.identity.blurbContinue = value
              })
            }
          />
        </p>
      </div>

      <div className="hero-geometry" aria-hidden="true">
        <div className="hero-geometry-field" ref={fieldRef}>
          <div className="hero-geometry-stage" ref={stageRef}>
            {HERO_HEXES.map((hex) => (
              <img
                key={hex.id}
                className="hero-hex"
                src={hex.src}
                alt=""
                width={hex.w}
                height={hex.h}
                style={
                  {
                    left: `${(hex.x / HERO_HEX_FRAME.w) * 100}%`,
                    top: `${(hex.y / HERO_HEX_FRAME.h) * 100}%`,
                    width: `${(hex.w / HERO_HEX_FRAME.w) * 100}%`,
                    height: `${(hex.h / HERO_HEX_FRAME.h) * 100}%`,
                    zIndex: hex.z,
                    '--hex-delay': `${hex.delay}s`,
                    '--hex-move': `${hex.move}s`,
                    '--hex-fade': `${hex.fade}s`,
                  } as CSSProperties
                }
              />
            ))}
          </div>
        </div>
      </div>

      <a className="hero-next" href="#index">
        Index
        <svg
          className="hero-next-icon"
          viewBox="0 0 12 8"
          aria-hidden="true"
          focusable="false"
        >
          <path
            d="M1 1.5 L6 6.5 L11 1.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.2"
          />
        </svg>
      </a>
    </section>
  )
}
