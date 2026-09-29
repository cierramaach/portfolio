import { useEditor } from '../lib/content'
import { Link } from '../lib/nav'
import { Editable } from './Editable'
import { IndexNav } from './IndexNav'

type SiteHeaderProps = {
  onHero?: boolean
}

export function SiteHeader({ onHero = false }: SiteHeaderProps) {
  const { site, update } = useEditor()
  const name = `${site.identity.nameGiven} ${site.identity.nameFamily}`

  return (
    <header className={onHero ? 'hero-bar' : 'page-bar'}>
      <Link className="hero-brand" to="/">
        <Editable
          className="hero-brand-name"
          value={name}
          onChange={(value) =>
            update((draft) => {
              const [given, ...rest] = value.trim().split(/\s+/)
              draft.identity.nameGiven = given || draft.identity.nameGiven
              draft.identity.nameFamily = rest.join(' ')
            })
          }
        />
      </Link>
      <IndexNav />
    </header>
  )
}
