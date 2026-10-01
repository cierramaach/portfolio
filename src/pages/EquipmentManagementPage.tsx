import { useEffect } from 'react'
import { SiteHeader } from '../components/SiteHeader'
import { Still } from '../components/Still'
import { StillReel } from '../components/StillReel'
import {
  equipmentStills,
  nextInitiative,
  previousInitiative,
  problemReel,
  systemReel,
} from '../data/equipmentManagement'
import { Link } from '../lib/nav'

function KeyMark({
  name,
}: {
  name: 'open' | 'floor' | 'setup' | 'team'
}) {
  return (
    <svg
      className="study-key-mark"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="square"
      aria-hidden="true"
    >
      {name === 'open' ? (
        <path d="M9 4H4v5M15 4h5v5M4 15v5h5M20 15v5h-5" />
      ) : null}
      {name === 'floor' ? (
        <path d="M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z" />
      ) : null}
      {name === 'setup' ? (
        <path d="M12 3.5v17M3.5 12h17M7 7l10 10M17 7 7 17" />
      ) : null}
      {name === 'team' ? (
        <>
          <circle cx="8.5" cy="8" r="2.1" />
          <circle cx="15.5" cy="8" r="2.1" />
          <path d="M4.8 18c.6-2.4 2.2-3.6 3.7-3.6s3.1 1.2 3.7 3.6M11.8 18c.6-2.4 2.2-3.6 3.7-3.6s3.1 1.2 3.7 3.6" />
        </>
      ) : null}
    </svg>
  )
}

export function EquipmentManagementPage() {
  const { hero, library, qrHead, mobileHome, mobileCheckout } =
    equipmentStills

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
              <span>Equipment</span>
              <span>Management.</span>
            </h1>
            <p className="study-deck study-deck-rule">
              A production equipment management system built around how the
              team actually worked.
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
          <div className="study-magazine study-magazine-flow">
            <header className="study-mast">
              <p className="study-kicker">02 / The Problem</p>
              <h2 className="study-title">
                <span>Where is it?</span>
              </h2>
            </header>
            <div className="study-copy">
              <p>
                As the team grew, so did the equipment we were responsible
                for.
              </p>
              <p>
                Cameras. Lenses. Tripods. Lighting. Audio. Cases. Cables.
                Accessories. Kits.
              </p>
              <p>
                The challenge wasn’t simply knowing what we owned. It was
                knowing{' '}
                <strong>
                  what we had, where it was, who had it, whether it was ready
                  to use, and how to get it back.
                </strong>
              </p>
              <p>
                For a small team, an informal approach can work. You
                remember where things live. You ask a teammate if they’ve
                seen the red extension cord. Someone remembers where the
                C200 battery was last used.
              </p>
              <p>
                But as a production team grows, that kind of institutional
                knowledge becomes increasingly difficult to maintain.
              </p>
              <p>
                And we were approaching a point where the consequences
                extended beyond our own team.
              </p>
              <p>
                Our equipment was also being used by an adjacent team.
                Without a shared system, scheduling conflicts, misplaced
                equipment, and uncertainty around availability were becoming
                increasingly likely.
              </p>
              <p>
                There was another consideration: this wasn’t privately owned
                production gear. It was{' '}
                <strong>government property.</strong>
              </p>
              <p>
                Our equipment, its location, and its accountability needed
                to be documented and readily verifiable. We had to be
                prepared for the possibility of a government property audit
                at any time.
              </p>
              <p>
                The knowledge couldn’t continue living exclusively in a few
                people’s heads.
              </p>
              <p>
                We needed a system that could make our resources visible,
                establish accountability, and support a growing production
                operation without creating another administrative burden.
              </p>
            </div>
          </div>
          <div className="study-chapter-continue">
            <header className="study-chapter-head">
              <h2 className="study-title study-title-line">The Constraint.</h2>
            </header>
            <div className="study-magazine">
              <div className="study-copy">
                <p>
                  There was another problem:{' '}
                  <strong>there was no budget for a solution.</strong>
                </p>
                <p>
                  Commercial asset-management platforms existed. There were
                  established tools that could track equipment, assign
                  assets, manage checkouts, and give us the visibility we
                  needed.
                </p>
                <p>
                  But purchasing another software platform simply wasn’t in
                  the cards.
                </p>
              </div>
              <div className="study-copy">
                <p>So we had to approach the problem differently.</p>
                <p>
                  Rather than asking, <em>“What can we buy?”</em> I
                  challenged the team to ask,{' '}
                  <strong>
                    “What can we build from what already exists?”
                  </strong>
                </p>
                <p>
                  We researched open-source options and discovered{' '}
                  <strong>Snipe-IT</strong> — an open-source
                  asset-management platform that could be self-hosted and,
                  importantly, customized around our specific needs.
                </p>
              </div>
              <div className="study-copy">
                <p>
                  Self-hosting meant we could have full access to the
                  application without being constrained by licensing costs
                  or a vendor’s predefined workflow.
                </p>
                <p>For the first time, we had a viable path forward.</p>
                <p>So we got to work.</p>
              </div>
            </div>
          </div>
          <div className="study-chapter-frame">
            <StillReel frames={problemReel} ticks={['Before']} />
          </div>
          <ol className="study-outcomes study-outcomes-four">
            <li>
              <span>95+</span>
              Assets
            </li>
            <li>
              <span>25+</span>
              Accessories
            </li>
            <li>
              <span>QR</span>
              QR-coded equipment
            </li>
            <li>
              <span>In / Out</span>
              Check-in / check-out
            </li>
          </ol>
        </section>
      </div>

      <section className="study-spread study-spread-intervene">
        <div className="study-spread-copy">
          <p className="study-kicker">03 / The Approach</p>
          <h2 className="study-title study-title-line">Making it work.</h2>
          <div className="study-copy">
            <p>
              We weren’t starting from nothing. We had extensive equipment
              records in spreadsheets, and most of the major equipment had
              already been labeled at least once. What we didn’t have was a
              system that brought all of that information together in a way
              the team could actually use.
            </p>
            <p>
              So the first step was the least glamorous one: getting
              everything into the system.
            </p>
            <p>
              Equipment had to be inventoried, records cleaned up, teammates
              added, and physical assets matched to their digital records.
              Then came the slow work of labeling and applying QR codes. It
              was a time slog — but it was the foundation the system needed.
            </p>
            <p>
              From there, we shaped the system around two realities of our
              inventory.
            </p>
          </div>
        </div>
        <div className="study-spread-photo study-spread-photo-cover">
          <StillReel frames={systemReel} ticks={['Record']} />
        </div>
        <div className="study-magazine study-magazine-flow">
          <div className="study-copy">
            <p>
              <strong>Equipment</strong> represented the assets that needed
              formal tracking — cameras, lenses, lighting, audio equipment,
              and other gear that moved between people and locations. These
              items received QR codes, allowing teammates to quickly access
              an asset record and check equipment in or out.
            </p>
            <p>
              <strong>Accessories</strong> covered the smaller things that
              didn’t make sense to individually label — cables, adapters,
              small peripherals, and equipment that naturally lived at desks
              or with individual teammates in post-production.
            </p>
            <p>That distinction mattered.</p>
            <p>Not everything needed a QR code to be accountable.</p>
            <p>
              By separating Equipment from Accessories, we could still
              maintain visibility into where things were and who had them
              without creating an impractical labeling system for every
              cable, adapter, or small accessory.
            </p>
            <p>
              The result was a system that reflected how the team actually
              worked — formal tracking where it mattered, and a lighter-touch
              approach where it didn’t.
            </p>
            <p>
              The goal was never to account for every object in the building.
            </p>
            <p>
              It was to make the equipment ecosystem visible, usable, and
              accountable.
            </p>
          </div>
        </div>
      </section>

      <section className="study-spread study-spread-reverse eq-physical">
        <div className="study-spread-photo">
          <Still
            src={qrHead.src}
            alt={qrHead.alt}
            ticks={['Tag']}
            fill
            parallax={false}
          />
        </div>
        <div className="study-spread-copy">
          <p className="study-kicker">04 / Make it physical</p>
          <h2 className="study-title study-title-line">Make it physical.</h2>
          <div className="study-copy">
            <p>The system couldn’t live only on a screen.</p>
            <p>The equipment needed a connection to it.</p>
            <p>So we started tagging it.</p>
            <p>
              QR codes went on cameras, bags, tripods, accessories, and
              other production equipment. Scan the code and the asset is
              immediately identifiable.
            </p>
            <p>
              Physical asset. Identification. Digital record. One motion.
            </p>
          </div>
        </div>
      </section>

      <section className="study-keys" aria-label="The workflow">
        <p className="study-keys-kicker">The workflow</p>
        <ul className="study-keys-list">
          <li>
            <KeyMark name="open" />
            <p className="study-key-title">Find it</p>
            <p className="study-key-line">
              See what we have, and where it lives, without asking around.
            </p>
          </li>
          <li>
            <KeyMark name="floor" />
            <p className="study-key-title">Scan it</p>
            <p className="study-key-line">
              The code on the gear opens the record. No hunting through a
              list.
            </p>
          </li>
          <li>
            <KeyMark name="setup" />
            <p className="study-key-title">Check it out</p>
            <p className="study-key-line">
              Use it. The system knows who has it and whether it is out.
            </p>
          </li>
          <li>
            <KeyMark name="team" />
            <p className="study-key-title">Bring it back</p>
            <p className="study-key-line">
              Return it, and the kit is ready for the next shoot.
            </p>
          </li>
        </ul>
      </section>

      <section className="study-proof" aria-label="The app">
        <p className="study-keys-kicker study-proof-kicker">The app</p>
        <div className="study-proof-pair">
          <Still
            src={mobileHome.src}
            alt={mobileHome.alt}
            ticks={['Inventory']}
            fill
            contain
            parallax={false}
          />
          <Still
            src={mobileCheckout.src}
            alt={mobileCheckout.alt}
            ticks={['Check-out']}
            fill
            contain
            parallax={false}
          />
        </div>
      </section>

      <section className="study-chapter study-chapter-infra">
        <div className="study-chapter-infra-copy">
          <header className="study-chapter-head">
            <p className="study-kicker">05 / From stuff to infrastructure</p>
            <h2 className="study-title">
              <span>From stuff</span>
              <span>to infrastructure.</span>
            </h2>
          </header>
          <div className="study-copy">
            <p>
              This was part of a larger shift in how we thought about the
              studio.
            </p>
            <p>We weren’t just accumulating equipment anymore.</p>
            <p>We were building a production capability.</p>
            <p>
              What started as a practical problem became a system that gave
              the team a clearer picture of its production resources.
            </p>
            <p>
              The knowledge stopped living exclusively in people’s heads.
              The team could see what we had. People could find what they
              needed. Equipment had a place. And the production capability
              could grow without the management system becoming another
              bottleneck.
            </p>
          </div>
        </div>
        <div className="study-chapter-infra-photo">
          <Still
            src={library.src}
            alt={library.alt}
            ticks={['Library']}
            fill
            parallax={false}
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
