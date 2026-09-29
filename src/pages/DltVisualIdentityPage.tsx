import { useEffect } from 'react'
import { SiteHeader } from '../components/SiteHeader'
import { Still } from '../components/Still'
import { dltStills } from '../data/dltVisualIdentity'
import { Link } from '../lib/nav'

export function DltVisualIdentityPage() {
  const { mark, system, letterhead, pamphletA, pamphletB, tiers, video } =
    dltStills

  useEffect(() => {
    document.documentElement.classList.add('study-dark')
    return () => document.documentElement.classList.remove('study-dark')
  }, [])

  return (
    <main className="page study dlt">
      <SiteHeader />

      <section className="study-spread dlt-spread">
        <div className="study-spread-copy">
          <p className="study-kicker">03 / Selected Works</p>
          <h1 className="study-title">
            <span>Digital Learning</span>
            <span>Team</span>
          </h1>
          <p className="study-deck study-deck-rule">Visual Identity</p>
          <div className="study-copy">
            <p>
              I saw an opportunity to give the Digital Learning Team
              something it didn’t yet have:{' '}
              <strong>a recognizable identity of its own.</strong>
            </p>
            <p>
              By this point, the team had grown into a multidisciplinary
              creative capability supporting education, communication,
              visualization, animation, video, games, immersive
              experiences, and emerging technology. But the breadth of that
              capability wasn’t always immediately visible from the outside.
            </p>
            <p>I believed that needed to change.</p>
          </div>
        </div>
        <figure className="dlt-mark">
          <img src={mark.src} alt={mark.alt} />
        </figure>
      </section>

      <section className="study-chapter study-chapter-problem dlt-essay">
        <div className="study-magazine dlt-essay-lead">
          <div className="study-copy">
            <p>
              Leadership changes. Priorities shift. Technology evolves. And
              when resources are being evaluated, a large creative team can
              become an easy target if its value isn’t immediately
              understood.
            </p>
            <p>
              I wanted to make our capability more visible — not by
              overstating what we did, but by creating a visual identity
              that reflected the quality, range, and thoughtfulness of the
              work already being produced.
            </p>
          </div>
          <div className="study-copy">
            <p>So I developed the DLT brand.</p>
            <p>
              I approached it as more than a logo exercise. I wanted to
              create a visual system that could help define how the team
              presented itself internally and establish a recognizable
              design mark within NSSI.
            </p>
          </div>
        </div>
        <div className="study-copy dlt-turn">
          <p>
            The creative direction balanced two things that I felt were
            essential to our identity:
          </p>
        </div>
        <div className="study-magazine dlt-balance">
          <div className="study-copy">
            <p>
              <strong>Creative excellence.</strong>
            </p>
            <p>
              A polished, contemporary, and intentional visual language that
              reflected the caliber of our work.
            </p>
          </div>
          <div className="study-copy">
            <p>
              <strong>Mission expertise.</strong>
            </p>
            <p>
              A design language grounded in the complexity of the subjects
              we worked with and the depth of understanding required to
              translate them effectively.
            </p>
          </div>
        </div>
        <div className="study-magazine">
          <div className="study-copy">
            <p>
              The brand became a way to unify a growing team under something
              recognizable — a visual banner that could move across
              presentations, digital experiences, social media, learning
              products, and other team deliverables.
            </p>
          </div>
          <div className="study-copy">
            <p>
              I wasn’t trying to make the team look bigger than it was.
            </p>
            <p>
              I was trying to make the value of what we had built{' '}
              <strong>easier to see</strong>.
            </p>
          </div>
          <div className="study-copy">
            <p>
              And that, to me, is where the branding became strategic: the
              identity didn’t replace the work.
            </p>
            <p>
              <strong>It helped the work speak for itself.</strong>
            </p>
          </div>
        </div>
      </section>

      <figure className="dlt-plate dlt-plate-white">
        <Still
          src={`${system.src}?v=2`}
          alt={system.alt}
          ticks={[system.label]}
          fill
          contain
          parallax={false}
        />
      </figure>

      <section className="dlt-cut">
        <p className="study-kicker">Letter heading</p>
        <figure className="dlt-plate dlt-plate-portrait">
          <Still
            src={letterhead.src}
            alt={letterhead.alt}
            ticks={[letterhead.label]}
            fill
            contain
            parallax={false}
          />
        </figure>
      </section>

      <section className="dlt-cut">
        <p className="study-kicker">Pamphlet</p>
        <figure className="dlt-plate">
          <Still
            src={pamphletA.src}
            alt={pamphletA.alt}
            ticks={[pamphletA.label]}
            fill
            contain
            parallax={false}
          />
        </figure>
        <figure className="dlt-plate">
          <Still
            src={pamphletB.src}
            alt={pamphletB.alt}
            ticks={[pamphletB.label]}
            fill
            contain
            parallax={false}
          />
        </figure>
      </section>

      <section className="dlt-cut">
        <p className="study-kicker">Curriculum tiers</p>
        <figure className="dlt-plate">
          <Still
            src={tiers.src}
            alt={tiers.alt}
            ticks={[tiers.label]}
            fill
            contain
            parallax={false}
          />
        </figure>
      </section>

      <section className="dlt-cut">
        <p className="study-kicker">Video styles</p>
        <figure className="dlt-plate">
          <Still
            src={video.src}
            alt={video.alt}
            ticks={[video.label]}
            fill
            contain
            parallax={false}
          />
        </figure>
      </section>

      <nav className="study-foot" aria-label="Work">
        <Link className="study-back" to="/#index">
          Back to Index
        </Link>
      </nav>
    </main>
  )
}
