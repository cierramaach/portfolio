type StillProps = {
  src?: string
  alt?: string
  label?: string
  caption?: string
  code?: string
  ratio?: string
  ticks?: string[]
  mark?: string
  fill?: boolean
  soft?: boolean
  zoom?: boolean
  contain?: boolean
  parallax?: number | false
}

export function Still({
  src,
  alt = '',
  label,
  caption,
  code = 'Hold',
  ratio = '16 / 10',
  ticks,
  mark,
  fill = false,
  soft = false,
  zoom = false,
  contain = false,
  parallax = 16,
}: StillProps) {
  const figureClass = [
    'still',
    fill ? 'still-fill' : '',
    soft ? 'still-soft' : '',
    zoom ? 'still-zoom' : '',
    contain ? 'still-contain' : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <figure className={figureClass}>
      <div className="still-frame" style={fill ? undefined : { aspectRatio: ratio }}>
        {src ? (
          <div
            className="still-parallax"
            data-parallax={parallax === false ? undefined : String(parallax)}
          >
            <img className="still-img" src={src} alt={alt} />
          </div>
        ) : (
          <div className={ticks?.length ? 'still-hold still-hold-quiet' : 'still-hold'}>
            <span>{code}</span>
            {ticks?.length ? null : <span>{label ?? 'Still'}</span>}
          </div>
        )}
        {mark ? <span className="still-mark">{mark}</span> : null}
        {ticks?.length ? (
          <ol className="still-ticks">
            {ticks.map((tick) => (
              <li key={tick}>{tick}</li>
            ))}
          </ol>
        ) : null}
      </div>
      {!fill && (label || caption) ? (
        <figcaption className="still-meta">
          {label ? <span className="still-label">{label}</span> : null}
          {caption ? <span className="still-caption">{caption}</span> : null}
        </figcaption>
      ) : null}
    </figure>
  )
}
