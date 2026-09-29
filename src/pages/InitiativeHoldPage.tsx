import { SiteHeader } from '../components/SiteHeader'
import { Aperture } from '../components/Aperture'
import { efforts } from '../data/site'
import { Link } from '../lib/nav'

type InitiativeHoldPageProps = {
  id: string
}

export function InitiativeHoldPage({ id }: InitiativeHoldPageProps) {
  const effort = efforts.find((item) => item.id === id)

  if (!effort) return null

  return (
    <main className="page">
      <SiteHeader />
      <header className="page-intro">
        <p className="page-kicker">
          <Link to="/#index">Index</Link>
          <span aria-hidden="true"> / </span>
          <Link to="/creative-direction/making-space">01 / Creative Direction</Link>
          <span aria-hidden="true"> / </span>
          {effort.index}
        </p>
        <h1 className="page-title">{effort.title}</h1>
        <p className="page-thesis">{effort.purpose}</p>
      </header>
      <div className="page-hold">
        <Aperture
          code={effort.index}
          caption="Chapter hold"
          note="This initiative is open."
        />
        <p className="page-hold-note">
          This chapter is open. The work will land here as a cut, not a grid.
        </p>
      </div>
    </main>
  )
}
