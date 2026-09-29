export type CoeClip = {
  file: string
  src: string
  label: string
}

const files = [
  'HoloWall_Aries.mp4',
  'HoloWall_Eccentricity.mp4',
  'HoloWall_Inclination.mp4',
  'HoloWall_Perigee_SideView and TopView.mp4',
  'HoloWall_Perigee_SideView.mp4',
  'HoloWall_Perigee_TopView.mp4',
  'HoloWall_Semi-Major Axis.mp4',
  'HoloWall_TrueAnomoly.mp4',
] as const

function labelFromFile(file: string): string {
  return file
    .replace(/\.mp4$/i, '')
    .replace(/^HoloWall[_ ]*/i, '')
    .replace(/[_]+/g, ' ')
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/\s+/g, ' ')
    .trim()
}

export const coeClips: CoeClip[] = files.map((file) => ({
  file,
  src: `/coe/${encodeURIComponent(file)}`,
  label: labelFromFile(file),
}))

export const nextInitiative = {
  index: '02',
  title: 'Classroom Game Pieces',
  path: '/experience/classroom-game-pieces',
}
