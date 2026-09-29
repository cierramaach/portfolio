import { useEffect } from 'react'
import { SiteHeader } from '../components/SiteHeader'
import { StillVideo } from '../components/StillVideo'
import { coeClips, nextInitiative } from '../data/classicalOrbitalElements'
import { Link } from '../lib/nav'

export function ClassicalOrbitalElementsPage() {
  const [lead, ...cuts] = coeClips

  useEffect(() => {
    document.documentElement.classList.add('study-dark')
    return () => document.documentElement.classList.remove('study-dark')
  }, [])

  return (
    <main className="page study">
      <SiteHeader />

      <section className="study-spread coe-spread">
        <div className="study-spread-copy">
          <p className="study-kicker">02 / Experience / 3D / Interactive</p>
          <h1 className="study-title">
            <span>Classical</span>
            <span>Orbital Elements</span>
          </h1>
          <p className="study-deck study-deck-rule">
            Making orbital mechanics visible — and explorable.
          </p>
          <div className="study-copy">
            <p>
              Developed in collaboration with a Subject Matter Expert in
              Orbital Warfare, these visualizations translate the mechanics
              of classical orbital elements into clear, animated experiences
              for the classroom.
            </p>
            <p>
              The challenge went beyond making the animations look accurate.
              As an animator, I needed to develop a working understanding of
              the underlying orbital mechanics so that every movement,
              relationship, and visual cue represented the material
              correctly. The result needed to communicate complex concepts
              quickly without sacrificing technical accuracy.
            </p>
            <p>
              These visualizations were also designed with{' '}
              <strong>multiple viewing environments in mind</strong>. They
              could function as traditional classroom visuals on a screen,
              while also living inside an XR environment where students
              could explore the simulations spatially and view the orbital
              relationships from any angle.
            </p>
            <p>
              That meant designing not just for the frame, but for the{' '}
              <strong>space around the frame</strong>.
            </p>
            <p>
              For me, this became an especially rewarding animation
              challenge: taking highly technical subject matter,
              understanding it deeply enough to visualize it accurately, and
              then building an experience that could shift seamlessly
              between{' '}
              <strong>presentation, animation, and exploration</strong>.
            </p>
          </div>
        </div>
        <div className="study-spread-photo">
          {lead ? (
            <StillVideo src={lead.src} label={lead.label} fill />
          ) : null}
        </div>
      </section>

      <section className="study-proof coe-cuts" aria-label="Visualizations">
        {cuts.map((clip) => (
          <StillVideo key={clip.file} src={clip.src} label={clip.label} />
        ))}
      </section>

      <nav className="study-foot" aria-label="Case study">
        <Link className="study-back" to="/#index">
          Back to Index
        </Link>
        <Link className="study-next" to={nextInitiative.path}>
          <span className="study-next-index">
            {nextInitiative.index} / Next initiative
          </span>
          <span className="study-next-title">{nextInitiative.title}</span>
        </Link>
      </nav>
    </main>
  )
}
