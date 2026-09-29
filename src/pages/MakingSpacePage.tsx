import { useEffect } from 'react'
import { SiteHeader } from '../components/SiteHeader'
import { Still } from '../components/Still'
import { StillReel } from '../components/StillReel'
import { afterReel, beforeReel, makingSpaceStills, nextInitiative } from '../data/makingSpace'
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

export function MakingSpacePage() {
  const { hero, afterC, outcomeFront, outcomeThree } =
    makingSpaceStills

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
          <p className="study-kicker">
            01 / Creative Direction
          </p>
          <h1 className="study-title">
            <span>Making Space</span>
            <span>for the Work.</span>
          </h1>
          <p className="study-deck study-deck-rule">
            A studio that could do more, because I made room for it.
          </p>
        </div>
        <div className="study-spread-photo">
          <Still
            src={hero.src}
            alt={hero.alt}
            label={hero.label}
            code={hero.code}
            ticks={['After']}
            fill
            zoom
            parallax={false}
          />
        </div>
      </section>

      <section className="study-chapter study-chapter-problem">
        <header className="study-chapter-head">
          <p className="study-kicker">02 / The Problem</p>
          <h2 className="study-title">
            <span>From Closet</span>
            <span>to Studio.</span>
          </h2>
        </header>
        <div className="study-magazine">
          <div className="study-copy">
            <p>
              The issue of space wasn’t driven by ego or a sense of “we
              ought to have more.”
            </p>
            <p>
              The problem was that the status quo had become the solution.
            </p>
            <p>
              The studio had been moved and reconfigured multiple times over
              the years, eventually landing in a closet-like space tucked
              away from the main workspace.
            </p>
            <p>
              Out of sight. Out of the way. And, for a while, that was
              simply how it was.
            </p>
            <p>
              When the team was two people, we could make the space work. I
              was one of those two. At that size, we could make almost
              anything work.
            </p>
          </div>
          <div className="study-copy">
            <p>
              But I was now leading a much larger team. The work was
              growing. The capabilities were expanding. And there were
              bigger projects on the horizon.
            </p>
            <p>The space hadn’t caught up.</p>
            <p>
              There was also an underlying sense that “good enough” was good
              enough for the media guys.
            </p>
            <p>I didn’t agree.</p>
            <p>
              The studio was increasingly difficult to work in. Equipment
              storage was squeezed into areas that were supposed to be used
              for production. Setups were compromised. Storage spilled over.
              Things that should have had a designated home ended up
              wherever there was room.
            </p>
          </div>
          <div className="study-copy">
            <p>
              And the storage area adjacent to us — originally intended for
              our team — had gradually become a catch-all for other teams’
              stuff.
            </p>
            <p>Everyone had adapted to it.</p>
            <p>That was the problem.</p>
            <p>
              It was becoming a hazard and, frankly, an embarrassment.
              Walking Colonels and Generals through a production space that
              looked like a pit stop for things on their way to the dump
              wasn’t exactly the environment I wanted representing what our
              team could do.
            </p>
            <p>It worked. Barely.</p>
            <p>
              And I wasn’t interested in preserving barely simply because it
              was familiar.
            </p>
          </div>
        </div>
        <div className="study-chapter-frame">
          <StillReel frames={beforeReel} ticks={['Before']} />
        </div>
        <ul className="study-notes">
          <li>Cramped workspace</li>
          <li>Slow to reconfigure</li>
          <li>Limited project outcomes</li>
          <li>Built for one kind of shoot</li>
        </ul>
        </section>
      </div>

      <section className="study-spread study-spread-intervene">
        <div className="study-spread-copy">
          <p className="study-kicker">03 / The Intervention</p>
          <h2 className="study-title">
            <span>Rethinking</span>
            <span>the space.</span>
          </h2>
          <div className="study-copy">
            <p>Something had to change.</p>
            <p>So I knocked down a wall. Literally.</p>
            <p>
              With the help of my team, I then redesigned the space around
              how we actually wanted — and needed — to work.
            </p>
            <p>
              The room was painted black to reduce light bounce and create a
              more controlled shooting environment. Stands and commonly used
              equipment were given permanent homes instead of being moved
              around every time we needed them. Storage was reclaimed and
              managed by our team. We thought through accessibility,
              workflow, equipment placement, and how people actually moved
              through the space.
            </p>
            <p>
              And we started treating the equipment like the production
              infrastructure it was.
            </p>
            <p>
              That meant creating a more intentional system for managing,
              storing, and accessing it — rather than continuing to rely on
              “where did someone leave that?”
            </p>
            <p>
              None of these decisions were particularly flashy on their own.
            </p>
            <p>Together, they changed the character of the space.</p>
            <p>
              What had started as a small capability run by a couple of
              people had grown into something much larger. The physical
              environment finally reflected that.
            </p>
          </div>
        </div>
        <div className="study-spread-photo">
          <StillReel frames={afterReel} ticks={['After']} />
        </div>
      </section>

      <section className="study-keys" aria-label="Key improvements">
        <p className="study-keys-kicker">Key improvements</p>
        <ul className="study-keys-list">
          <li>
            <KeyMark name="open" />
            <p className="study-key-title">Lighting infrastructure</p>
            <p className="study-key-line">
              Reorganized so the room could take a different setup without
              starting over.
            </p>
          </li>
          <li>
            <KeyMark name="floor" />
            <p className="study-key-title">Equipment access</p>
            <p className="study-key-line">
              Storage and accessibility redesigned around the work, not the
              leftover corners.
            </p>
          </li>
          <li>
            <KeyMark name="setup" />
            <p className="study-key-title">Flexible configurations</p>
            <p className="study-key-line">
              Shooting setups that can change without rebuilding the room.
            </p>
          </li>
          <li>
            <KeyMark name="team" />
            <p className="study-key-title">Equipment management</p>
            <p className="study-key-line">
              A more intentional system for how gear is held, found, and used.
            </p>
          </li>
        </ul>
      </section>

      <section className="study-spread study-spread-reverse">
        <div className="study-spread-photo">
          <Still
            src={afterC.src}
            alt={afterC.alt}
            label={afterC.label}
            code={afterC.code}
            fill
            soft
            parallax={false}
          />
        </div>
        <div className="study-spread-copy">
          <h2 className="study-title">
            <span>A studio built</span>
            <span>around the work.</span>
          </h2>
          <div className="study-copy">
            <p>
              The result was a studio that could do more, because I made room
              for it — a more flexible shooting area, faster transitions
              between setups, and a production environment that could support
              instructional video, green-screen work, and more complex media.
            </p>
          </div>
          <ol className="study-outcomes">
            <li>
              <span>01</span>
              More flexible shooting
            </li>
            <li>
              <span>02</span>
              Faster setup transitions
            </li>
            <li>
              <span>03</span>
              Broader production range
            </li>
          </ol>
        </div>
      </section>

      <section className="study-proof" aria-label="Interview stills">
        <div className="study-proof-pair">
          <Still
            src={outcomeFront.src}
            alt={outcomeFront.alt}
            label={outcomeFront.label}
            code={outcomeFront.code}
            ticks={['Interview']}
            fill
            parallax={false}
          />
          <Still
            src={outcomeThree.src}
            alt={outcomeThree.alt}
            label={outcomeThree.label}
            code={outcomeThree.code}
            ticks={['Interview']}
            fill
            parallax={false}
          />
        </div>
      </section>

      <section className="study-end">
        <p className="study-philosophy">
          I built the studio for the team we were becoming.
        </p>
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
