// Drop selected photographs into /public/studio and set src, e.g. '/studio/hero.jpg'.
// Leave src empty until the picture for that role is chosen. Do not fill every slot.

export type StillSlot = {
  id: string
  src?: string
  alt: string
  label: string
  caption: string
  code: string
}

export const makingSpaceStills = {
  hero: {
    id: 'hero',
    src: '/studio/after-hero-v3.jpg',
    alt: 'The studio after transformation: two chairs on a controlled blue cyclorama.',
    label: 'After',
    caption: 'The studio as it stands. A production environment built around the work.',
    code: '01.1 · Hero',
  },
  beforeLead: {
    id: 'before-lead',
    src: '/studio/before-01.jpg',
    alt: 'The original studio: a table, stands, and lights packed into a small production room.',
    label: 'Original studio',
    caption: 'Production environment prior to transformation.',
    code: '01.1 · Before',
  },
  beforeSupport: {
    id: 'before-support',
    src: '/studio/before-02.jpg',
    alt: 'A shoot in the original studio, with the camera and table filling the room.',
    label: 'Original studio',
    caption: 'The work, as the room allowed it.',
    code: '01.1 · Before',
  },
  intervention: {
    id: 'intervention',
    src: undefined,
    alt: 'The space during transformation.',
    label: 'Intervention',
    caption: 'Reserved for the work of changing the room.',
    code: '01.1 · Cut',
  },
  afterLead: {
    id: 'after-lead',
    src: '/studio/after-wide-v2.jpg',
    alt: 'The transformed studio: an open floor, a single chair, stands, and a lighting grid.',
    label: 'After',
    caption: 'More room to move, configure, and create.',
    code: '01.1 · After',
  },
  afterB: {
    id: 'after-b',
    src: undefined,
    alt: 'The transformed studio, another configuration.',
    label: 'After',
    caption: 'A room that can take a different setup without starting over.',
    code: '01.1 · After',
  },
  afterC: {
    id: 'after-c',
    src: '/studio/after-lights-v2.jpg',
    alt: 'A close view of a studio light after the transformation.',
    label: 'After',
    caption: 'Lighting designed around production.',
    code: '01.1 · After',
  },
  outcomeFront: {
    id: 'outcome-front',
    src: '/studio/outcome-front-graded.jpg',
    alt: 'A subject photographed in the rebuilt studio against a controlled blue cyclorama.',
    label: 'In production',
    caption: 'Interview. Controlled cyclorama.',
    code: '01.1 · Capture',
  },
  outcomeThree: {
    id: 'outcome-three',
    src: '/studio/outcome-three-graded.jpg',
    alt: 'A three-quarter interview portrait made in the rebuilt studio.',
    label: 'In production',
    caption: 'Interview. Controlled cyclorama.',
    code: '01.1 · Capture',
  },
} satisfies Record<string, StillSlot>

export const beforeReel = [
  {
    src: '/studio/before-reel-04.jpg',
    alt: 'The original cramped studio: a black backdrop, stands, and lights packed into the room.',
  },
  {
    src: '/studio/before-reel-01.jpg',
    alt: 'An unused empty room seen through a doorway — the space on the other side of the wall.',
  },
  {
    src: '/studio/before-reel-02.jpg',
    alt: 'The unused room from another doorway, empty walls and an unused floor.',
  },
  {
    src: '/studio/before-reel-03.jpg',
    alt: 'A catch-all room packed with cases, boxes, and leftover storage.',
  },
  {
    src: '/studio/before-reel-05.jpg',
    alt: 'The old green-screen setup, a single desk and camera filling the room.',
  },
  {
    src: '/studio/before-reel-06.jpg',
    alt: 'A tabletop shoot in the original studio, with lights, camera, and people sharing the room.',
  },
  {
    src: '/studio/before-reel-07.jpg',
    alt: 'The original studio during a product shoot, a light filling the foreground of the tight setup.',
  },
]

export const afterReel = [
  {
    src: '/studio/after-reel-01.jpg',
    alt: 'The transformed studio: an open floor, a single chair, stands, and a lighting grid.',
  },
  {
    src: '/studio/after-reel-02.jpg',
    alt: 'A single chair on the controlled blue cyclorama.',
  },
  {
    src: '/studio/after-reel-03.jpg',
    alt: 'The rebuilt studio in another configuration, one chair under the lighting grid.',
  },
  {
    src: '/studio/after-reel-04.jpg',
    alt: 'The empty cyclorama and overhead lighting grid after the transformation.',
  },
  {
    src: '/studio/after-reel-05.jpg',
    alt: 'A close view of a studio light after the transformation.',
  },
  {
    src: '/studio/after-reel-06.jpg',
    alt: 'A studio light in the foreground, with a chair soft in the background.',
  },
  {
    src: '/studio/after-reel-07.jpg',
    alt: 'Reclaimed storage: cabinets and cases given a permanent home.',
  },
]

export const nextInitiative = {
  index: '02',
  title: 'Equipment Management',
  path: '/creative-direction/equipment-management',
}
