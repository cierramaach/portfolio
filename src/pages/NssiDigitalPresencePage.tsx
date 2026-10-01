import { useEffect } from 'react'
import { SiteHeader } from '../components/SiteHeader'
import { Still } from '../components/Still'
import {
  nssiChannels,
  nssiStills,
  previousInitiative,
} from '../data/nssiDigitalPresence'
import { Link } from '../lib/nav'

export function NssiDigitalPresencePage() {
  const { hero, mark, youtube } = nssiStills

  useEffect(() => {
    document.documentElement.classList.add('study-dark')
    return () => document.documentElement.classList.remove('study-dark')
  }, [])

  return (
    <main className="page study">
      <SiteHeader />

      <div className="study-pin">
        <section className="study-spread study-spread-lead">
          <div className="study-spread-copy">
            <p className="study-kicker">01 / Creative Direction</p>
            <h1 className="study-title">
              <span>Digital</span>
              <span>Presence.</span>
            </h1>
            <p className="study-deck study-deck-rule">
              Turning a recurring leadership priority into a sustainable
              communications capability.
            </p>
          </div>
          <div className="study-spread-photo">
            <Still
              src={hero.src}
              alt={hero.alt}
              fill
              zoom
              parallax={false}
            />
          </div>
        </section>

        <section className="study-chapter study-chapter-problem">
          <header className="study-chapter-head">
            <p className="study-kicker">02 / The Challenge</p>
            <h2 className="study-title">
              <span>The challenge</span>
              <span>was ownership.</span>
            </h2>
          </header>
          <div className="study-magazine">
            <div className="study-copy">
              <p>
                For three leadership rotations, one request continued to
                surface at NSSI: build a stronger, more established YouTube
                presence.
              </p>
              <p>
                As leadership changed, priorities and communication styles
                evolved—but the desire for a stronger public-facing digital
                presence remained. And as YouTube became a recurring
                priority, the conversation naturally expanded to the broader
                social ecosystem: LinkedIn, Facebook, Truth Social, and other
                platforms.
              </p>
              <p>The need was clear.</p>
              <p>The challenge was ownership.</p>
            </div>
            <div className="study-copy">
              <p>
                Social media and external communications had historically been
                managed through an informal group known as the XP Team.
                Typically made up of one or two military personnel, the team
                would take ownership of the initiative as priorities shifted
                from one leadership cycle to the next.
              </p>
              <p>
                The Digital Learning Team was not originally responsible for
                social media.
              </p>
              <p>
                But DLT housed the organization's concentration of creative
                expertise—video production, animation, 3D, game design, visual
                communication, and digital media. As a result, the XP Team
                regularly relied on DLT whenever a project required
                specialized creative or production support.
              </p>
            </div>
            <div className="study-copy">
              <p>That model worked—until it didn't.</p>
              <p>
                The demand for content continued to grow while creative
                resources still had to support NSSI's primary educational
                mission. Social media work could become an additional
                responsibility layered onto an already committed production
                schedule, creating an ongoing resource-allocation problem.
              </p>
              <p>Eventually, the initiative faltered.</p>
              <p>The question became:</p>
              <p>
                Could the Digital Learning Team take ownership of the
                capability permanently?
              </p>
              <p>
                The answer was yes—but not without changing the structure
                behind it.
              </p>
            </div>
          </div>
          <ul className="study-notes">
            <li>Informal XP Team</li>
            <li>Creative expertise in DLT</li>
            <li>Resource-allocation problem</li>
            <li>Permanent ownership</li>
          </ul>
        </section>
      </div>

      <section className="study-spread study-spread-intervene">
        <div className="study-spread-copy">
          <p className="study-kicker">03 / The Capability</p>
          <h2 className="study-title">
            <span>Building the</span>
            <span>right capability.</span>
          </h2>
          <div className="study-copy">
            <p>
              Taking ownership of the work meant more than adding social
              media to an existing team's workload.
            </p>
            <p>
              It required dedicated capacity and the right creative expertise.
            </p>
            <p>
              Two positions were dedicated to the initiative and reoriented
              around the actual needs of the work. Previously, those roles had
              been filled by personnel whose professional backgrounds were
              primarily in software development. Through no fault of their
              own, the staffing model no longer matched the creative and
              communications requirements of the initiative.
            </p>
            <p>
              The new structure placed people with the appropriate media,
              creative, and communications experience into those roles.
            </p>
            <p>
              From there, the focus shifted from simply producing individual
              posts to building a repeatable system for communicating NSSI's
              work.
            </p>
            <p>The goal wasn't simply to post more.</p>
            <p>
              It was to build a communications capability that could continue
              working after the next leadership change.
            </p>
          </div>
        </div>
        <div className="study-spread-photo">
          <Still src={mark.src} alt={mark.alt} fill parallax={false} />
        </div>
      </section>

      <section className="study-chapter study-chapter-problem">
        <header className="study-chapter-head">
          <p className="study-kicker">04 / The Ecosystem</p>
          <h2 className="study-title">
            <span>From channels</span>
            <span>to an ecosystem.</span>
          </h2>
        </header>
        <div className="study-magazine">
          <div className="study-copy">
            <p>
              What began as a recurring request for a stronger YouTube
              presence evolved into a broader digital communications
              strategy.
            </p>
            <p>
              NSSI moved from a relatively limited and sporadic social
              presence toward an established multi-platform ecosystem
              spanning:
            </p>
          </div>
          <div className="study-copy">
            <p>
              LinkedIn · YouTube · Facebook · Truth Social · and additional
              channels
            </p>
            <p>
              Each platform became an opportunity to communicate NSSI's
              mission differently while maintaining a recognizable visual
              identity across the organization.
            </p>
          </div>
          <div className="study-copy">
            <p>
              Rather than treating each channel as an isolated feed, the work
              connected content, design, video, and messaging into a cohesive
              system.
            </p>
          </div>
        </div>
        <div className="study-chapter-frame study-chapter-frame-strip">
          <Still
            src={youtube.src}
            alt={youtube.alt}
            ticks={['Ecosystem']}
            fill
            parallax={false}
          />
        </div>
      </section>

      <section className="study-chapter study-chapter-problem study-explore">
        <header className="study-chapter-head">
          <p className="study-kicker">05 / Explore the work</p>
          <h2 className="study-title">Explore the work.</h2>
        </header>
        <ul className="study-channels">
          {nssiChannels.map((channel) => (
            <li key={channel.label}>
              <a href={channel.href} target="_blank" rel="noreferrer">
                {channel.label}
              </a>
            </li>
          ))}
        </ul>
      </section>

      <nav className="study-foot" aria-label="Case study">
        <Link className="study-back" to="/#index">
          Back to Index
        </Link>
        <Link className="study-next" to={previousInitiative.path}>
          <span className="study-next-index">
            {previousInitiative.index} / Previous initiative
          </span>
          <span className="study-next-title">{previousInitiative.title}</span>
        </Link>
      </nav>
    </main>
  )
}
