import { useLayoutEffect, useState } from 'react'
import { useEditor } from '../lib/content'
import { Editable } from './Editable'
import { HeroHexes } from './HeroHexes'

export function AuthorPlate() {
  const { site, update } = useEditor()
  const [lead, mid, end] = site.identity.roles
  const [lockup, setLockup] = useState<HTMLDivElement | null>(null)
  const [copyIn, setCopyIn] = useState(false)

  useLayoutEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (reduce.matches) {
      setCopyIn(true)
      return
    }
    let cancelled = false
    const outer = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (!cancelled) setCopyIn(true)
      })
    })
    return () => {
      cancelled = true
      cancelAnimationFrame(outer)
    }
  }, [])

  return (
    <section id="plate" className="hero" aria-labelledby="hero-title">
      <HeroHexes lockup={lockup} />

      <div className={copyIn ? 'hero-lockup is-in' : 'hero-lockup'} ref={setLockup}>
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

      <a className="hero-next" href="#index">
        Index
        <svg
          className="hero-next-icon"
          viewBox="0 0 14 9"
          aria-hidden="true"
          focusable="false"
        >
          <path
            d="M1 2 L7 7.2 L13 2"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.35"
            strokeLinecap="square"
            strokeLinejoin="miter"
          />
        </svg>
      </a>
    </section>
  )
}
