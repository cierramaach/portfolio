import { useEffect } from 'react'
import { SiteHeader } from '../components/SiteHeader'
import { Still } from '../components/Still'
import {
  gamePieceStills,
  nextInitiative,
  previousInitiative,
} from '../data/classroomGamePieces'
import { Link } from '../lib/nav'

export function ClassroomGamePiecesPage() {
  const { wall, trio, fidSfa, uw, isr, cyberspaceIsr, satcom } =
    gamePieceStills

  useEffect(() => {
    document.documentElement.classList.add('study-dark')
    return () => document.documentElement.classList.remove('study-dark')
  }, [])

  return (
    <main className="page study">
      <SiteHeader />

      <section className="study-spread gp-spread">
        <div className="study-spread-copy">
          <p className="study-kicker">02 / Experience / 3D / Interactive</p>
          <h1 className="study-title">
            <span>Classroom</span>
            <span>Game Pieces</span>
          </h1>
          <p className="study-deck study-deck-rule">
            3D-printed game pieces used to help ground a classroom lesson.
          </p>
          <div className="study-copy">
            <p>
              I designed these pieces to bring classroom concepts into the
              physical space. Printed for NSSI courses, they serve as both
              instructional tools and pieces of a larger strategy game.
            </p>
          </div>
        </div>
        <div className="study-spread-photo">
          <Still
            src={wall.src}
            alt={wall.alt}
            ticks={wall.ticks}
            fill
            parallax={false}
          />
        </div>
      </section>

      <section className="study-proof gp-cuts" aria-label="Game pieces">
        <Still
          src={trio.src}
          alt={trio.alt}
          ticks={trio.ticks}
          fill
          parallax={false}
        />
        <div className="study-proof-pair">
          <Still
            src={fidSfa.src}
            alt={fidSfa.alt}
            ticks={fidSfa.ticks}
            fill
            parallax={false}
          />
          <Still
            src={uw.src}
            alt={uw.alt}
            ticks={uw.ticks}
            fill
            parallax={false}
          />
        </div>
        <div className="study-proof-pair">
          <Still
            src={isr.src}
            alt={isr.alt}
            ticks={isr.ticks}
            fill
            parallax={false}
          />
          <Still
            src={cyberspaceIsr.src}
            alt={cyberspaceIsr.alt}
            ticks={cyberspaceIsr.ticks}
            fill
            parallax={false}
          />
        </div>
        <Still
          src={satcom.src}
          alt={satcom.alt}
          ticks={satcom.ticks}
          fill
          parallax={false}
        />
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
