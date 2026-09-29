import { SiteHeader } from '../components/SiteHeader'
import { Link } from '../lib/nav'

export function NotFoundPage() {
  return (
    <main className="page">
      <SiteHeader />
      <header className="page-intro">
        <p className="page-kicker">404</p>
        <h1 className="page-title">Not in the cut</h1>
        <p className="page-thesis">
          <Link to="/#index">Back to the index.</Link>
        </p>
      </header>
    </main>
  )
}
