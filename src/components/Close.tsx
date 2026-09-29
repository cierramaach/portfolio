import { useEditor } from '../lib/content'
import { Editable } from './Editable'

const channels = [
  { key: 'linkedin', label: 'LinkedIn' },
  { key: 'instagram', label: 'Instagram' },
  { key: 'resume', label: 'Résumé' },
] as const

export function Close() {
  const { site, update, editing } = useEditor()
  const name = `${site.identity.nameGiven} ${site.identity.nameFamily}`

  return (
    <div className="close">
      <div className="close-intro">
        <Editable
          as="h2"
          className="close-name"
          value={name}
          onChange={(value) =>
            update((draft) => {
              const [given, ...rest] = value.trim().split(/\s+/)
              draft.identity.nameGiven = given || draft.identity.nameGiven
              draft.identity.nameFamily = rest.join(' ')
            })
          }
        />
      </div>

      <ul className="close-links">
        {channels.map((channel) => {
          const href = site.contact[channel.key]
          return (
            <li key={channel.key}>
              {href ? (
                <a
                  className="close-link"
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                >
                  {channel.label}
                </a>
              ) : (
                <span className="close-link is-hold">{channel.label}</span>
              )}
              {editing ? (
                <Editable
                  className="close-link-url"
                  value={href}
                  onChange={(value) =>
                    update((draft) => {
                      draft.contact[channel.key] = value.trim()
                    })
                  }
                />
              ) : null}
            </li>
          )
        })}
      </ul>
    </div>
  )
}
