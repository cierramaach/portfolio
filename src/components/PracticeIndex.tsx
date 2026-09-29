import { useEditor } from '../lib/content'
import { Link } from '../lib/nav'
import { Editable } from './Editable'

export function PracticeIndex() {
  const { site, update, editing } = useEditor()

  return (
    <section id="index" className="index" aria-label="Index">
      {site.practices.map((practice, index) =>
        practice.hidden ? null : (
        <Link
          key={practice.slug}
          id={practice.slug}
          to={practice.path}
          className={`index-feature index-feature-${practice.slug}`}
        >
          <span className="index-kicker">
            <span className="index-num">{practice.index}</span>
            <span className="index-rule" aria-hidden="true" />
          </span>
          <div className="index-copy">
            <Editable
              as="h2"
              className="index-title"
              value={practice.title}
              onChange={(value) =>
                update((draft) => {
                  draft.practices[index].title = value
                })
              }
            />
            <Editable
              as="p"
              className="index-line"
              multiline
              value={practice.line}
              onChange={(value) =>
                update((draft) => {
                  draft.practices[index].line = value
                })
              }
            />
          </div>
          <span
            className={
              practice.preview
                ? `index-still index-still-${practice.slug}`
                : 'index-still'
            }
            aria-hidden="true"
          >
            {practice.preview ? (
              <img
                className={`index-still-img index-still-img-${practice.slug}`}
                src={practice.preview}
                alt=""
              />
            ) : editing ? (
              <label className="index-still-add">
                Add preview
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onClick={(event) => event.stopPropagation()}
                  onChange={(event) => {
                    const file = event.target.files?.[0]
                    if (!file) return
                    const reader = new FileReader()
                    reader.onload = () => {
                      update((draft) => {
                        draft.practices[index].preview = String(reader.result)
                      })
                    }
                    reader.readAsDataURL(file)
                  }}
                />
              </label>
            ) : null}
          </span>
        </Link>
      ))}
    </section>
  )
}
