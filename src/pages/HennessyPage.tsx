import { useEffect } from 'react'
import { SiteHeader } from '../components/SiteHeader'
import { Still } from '../components/Still'
import { StillVideo } from '../components/StillVideo'
import { hennessyWork, previousInitiative } from '../data/hennessy'
import { Link } from '../lib/nav'

export function HennessyPage() {
  useEffect(() => {
    document.documentElement.classList.add('study-dark')
    return () => document.documentElement.classList.remove('study-dark')
  }, [])

  return (
    <main className="page study">
      <SiteHeader />

      <section className="slg-spread hen-spread" aria-label="Hennessy composite">
        <div className="slg-copy">
          <p className="study-kicker">03 / Selected Works</p>
          <h1 className="study-title study-title-line">Hennessy</h1>
          <p className="study-deck study-deck-rule hen-deck">
            Composite by me. Design by Natalia Mrozek.
          </p>
        </div>
        <div className="slg-stage">
          <StillVideo
            src={hennessyWork.video.src}
            poster={hennessyWork.video.poster}
            label={hennessyWork.video.label}
            fill
            loop={false}
            muted={false}
            autoPlayInView={false}
            preload="none"
          />
        </div>
      </section>

      <section className="hen-banner" aria-label="Composite still">
        <Still
          src={hennessyWork.still.src}
          alt={hennessyWork.still.alt}
          ticks={[hennessyWork.still.label]}
          ratio="3840 / 632"
          contain
          parallax={false}
        />
      </section>

      <nav className="study-foot" aria-label="Case study">
        <Link className="study-back" to="/#index">
          Back to Index
        </Link>
        <Link className="study-next study-prev" to={previousInitiative.path}>
          <span className="study-next-index">
            {previousInitiative.index} / Previous initiative
          </span>
          <span className="study-next-title">{previousInitiative.title}</span>
        </Link>
      </nav>
    </main>
  )
}
