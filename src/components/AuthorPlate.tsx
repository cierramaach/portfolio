import { useState } from 'react'
import { useEditor } from '../lib/content'
import { Editable } from './Editable'
import { HeroHexes } from './HeroHexes'

export function AuthorPlate() {
  const { site, update } = useEditor()
  const [lead, mid, end] = site.identity.roles
  const [lockup, setLockup] = useState<HTMLDivElement | null>(null)

  return (
    <section id="plate" className="hero" aria-labelledby="hero-title">
      <HeroHexes lockup={lockup} />

      <div className="hero-lockup" ref={setLockup}>
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
