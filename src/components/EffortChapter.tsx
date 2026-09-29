import { Fragment } from 'react'
import { useEditor } from '../lib/content'
import { Link } from '../lib/nav'
import type { Effort } from '../data/site'
import { Aperture } from './Aperture'
import { Editable } from './Editable'

type EffortChapterProps = {
  effort: Effort
}

export function EffortChapter({ effort }: EffortChapterProps) {
  const { update, editing } = useEditor()

  const patch = (partial: Partial<Effort>) => {
    update((draft) => {
      const current = draft.efforts.find((item) => item.id === effort.id)
      if (current) Object.assign(current, partial)
    })
  }

  const slate = [
    { key: 'role', value: effort.role, onChange: (role: string) => patch({ role }) },
    { key: 'domain', value: effort.domain, onChange: (domain: string) => patch({ domain }) },
    { key: 'year', value: effort.year, onChange: (year: string) => patch({ year }) },
    { key: 'scale', value: effort.scale, onChange: (scale: string) => patch({ scale }) },
  ]
  const visibleSlate = editing ? slate : slate.filter((item) => item.value)

  return (
    <article
      id={effort.id}
      className={effort.lead ? 'effort effort-lead' : 'effort'}
      aria-labelledby={`${effort.id}-title`}
    >
      <div className="effort-copy">
        <p className="effort-index">{effort.index}</p>
        {effort.path && !editing ? (
          <Link
            id={`${effort.id}-title`}
            className="effort-title"
            to={effort.path}
          >
            {effort.title}
          </Link>
        ) : (
          <Editable
            as="h2"
            id={`${effort.id}-title`}
            className="effort-title"
            value={effort.title}
            onChange={(title) => patch({ title })}
          />
        )}
        <Editable
          as="p"
          className="effort-purpose"
          multiline
          value={effort.purpose}
          onChange={(purpose) => patch({ purpose })}
        />
        {visibleSlate.length ? (
          <p className="effort-slate">
            {visibleSlate.map((item, index) => (
              <Fragment key={item.key}>
                {index > 0 ? <span aria-hidden="true">  ·  </span> : null}
                <Editable value={item.value} onChange={item.onChange} />
              </Fragment>
            ))}
          </p>
        ) : null}
        {editing || effort.outcome ? (
          <Editable
            as="p"
            className="effort-outcome"
            multiline
            value={effort.outcome}
            onChange={(outcome) => patch({ outcome })}
          />
        ) : null}
      </div>
      {effort.path && !editing ? (
        <Link className="effort-still" to={effort.path}>
          <Aperture
            code={effort.index}
            caption="No picture"
            note={effort.lead ? '16:9 · Still + silent loop' : '16:9 · Hold'}
            src={effort.src}
            altSrc={effort.altSrc}
            alt={effort.alt ?? ''}
          />
        </Link>
      ) : (
        <Aperture
          code={effort.index}
          caption="No picture"
          note={effort.lead ? '16:9 · Still + silent loop' : '16:9 · Hold'}
          src={effort.src}
          altSrc={effort.altSrc}
          alt={effort.alt ?? ''}
        />
      )}
    </article>
  )
}
