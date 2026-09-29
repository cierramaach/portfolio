import { Aperture } from '../components/Aperture'
import { Editable } from '../components/Editable'
import { SiteHeader } from '../components/SiteHeader'
import { useEditor } from '../lib/content'
import { Link } from '../lib/nav'

type PracticePageProps = {
  slug: string
}

export function PracticePage({ slug }: PracticePageProps) {
  const { site, update } = useEditor()
  const index = site.practices.findIndex((item) => item.slug === slug)
  const practice = site.practices[index]

  if (!practice) {
    return null
  }

  return (
    <main className="page">
      <SiteHeader />
      <header className="page-intro">
        <p className="page-kicker">
          <Link to="/#index">Index</Link>
          <span aria-hidden="true"> / </span>
          {practice.index}
        </p>
        <Editable
          as="h1"
          className="page-title"
          multiline
          value={practice.title}
          onChange={(title) =>
            update((draft) => {
              draft.practices[index].title = title
            })
          }
        />
        <Editable
          as="p"
          className="page-thesis"
          multiline
          value={practice.thesis}
          onChange={(thesis) =>
            update((draft) => {
              draft.practices[index].thesis = thesis
            })
          }
        />
      </header>
      <div className="page-hold">
        <Aperture
          code={practice.index}
          caption="Chapter hold"
          note="Work to come"
        />
        <p className="page-hold-note">
          This chapter is open. The work will land here as a cut, not a grid.
        </p>
      </div>
    </main>
  )
}
