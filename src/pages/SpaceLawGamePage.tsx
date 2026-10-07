import { useEffect } from 'react'
import { SiteHeader } from '../components/SiteHeader'
import { StillVideo } from '../components/StillVideo'
import {
  nextInitiative,
  previousInitiative,
  spaceLawTrailer,
} from '../data/spaceLawGame'
import { Link } from '../lib/nav'

export function SpaceLawGamePage() {
  useEffect(() => {
    document.documentElement.classList.add('study-dark')
    return () => document.documentElement.classList.remove('study-dark')
  }, [])

  return (
    <main className="page study">
      <SiteHeader />

      <section className="slg-spread" aria-label="Space Law Game trailer">
        <div className="slg-copy">
          <p className="study-kicker">02 / Experience / 3D / Interactive</p>
          <h1 className="study-title study-title-line">Space Law Game</h1>
          <p className="study-deck study-deck-rule">Trailer.</p>
        </div>
        <div className="slg-stage">
          <StillVideo
            src={spaceLawTrailer.src}
            poster={spaceLawTrailer.poster}
            label={spaceLawTrailer.label}
            fill
            loop={false}
            muted={false}
            autoPlayInView={false}
            preload="none"
          />
        </div>
      </section>

      <nav className="study-foot" aria-label="Case study">
        <Link className="study-back" to="/#index">
          Back to Index
        </Link>
        <div className="study-foot-ends">
          <Link className="study-next study-prev" to={previousInitiative.path}>
            <span className="study-next-index">
              {previousInitiative.index} / Previous initiative
            </span>
            <span className="study-next-title">{previousInitiative.title}</span>
          </Link>
          <Link className="study-next" to={nextInitiative.path}>
            <span className="study-next-index">
              {nextInitiative.index} / Next initiative
            </span>
            <span className="study-next-title">{nextInitiative.title}</span>
          </Link>
        </div>
      </nav>
    </main>
  )
}
