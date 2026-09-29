type ApertureProps = {
  code: string
  caption?: string
  note?: string
  src?: string
  altSrc?: string
  alt?: string
  bleed?: boolean
}

export function Aperture({
  code,
  caption = 'No picture',
  note = '16:9 · Hold',
  src,
  altSrc,
  alt = '',
  bleed = false,
}: ApertureProps) {
  const hasPicture = Boolean(src)

  return (
    <div className={bleed ? 'aperture aperture-bleed' : 'aperture'}>
      <div className="aperture-frame">
        {hasPicture ? (
          <div className="aperture-parallax" data-parallax="16">
            <img className="aperture-img aperture-img-a" src={src} alt={alt} />
            {altSrc ? (
              <img className="aperture-img aperture-img-b" src={altSrc} alt="" />
            ) : null}
          </div>
        ) : (
          <>
            <div className="aperture-hold aperture-hold-a">
              <span className="aperture-code">{code}</span>
              <span className="aperture-caption">{caption}</span>
              <span className="aperture-note">{note}</span>
            </div>
            <div className="aperture-hold aperture-hold-b" aria-hidden="true">
              <span className="aperture-code">{code}</span>
              <span className="aperture-caption">Alt frame</span>
              <span className="aperture-note">{note}</span>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
