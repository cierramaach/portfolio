export type Effort = {
  id: string
  index: string
  title: string
  purpose: string
  role: string
  domain: string
  year: string
  scale: string
  outcome: string
  lead?: boolean
  path?: string
  src?: string
  altSrc?: string
  alt?: string
}

export type Practice = {
  index: string
  slug: string
  path: string
  title: string
  line: string
  lead?: boolean
  thesis: string
  preview?: string
  previewAlt?: string
  hidden?: boolean
}

export const identity = {
  nameGiven: 'Cierra',
  nameFamily: 'Maach',
  roles: ['Creative Director', 'Creative Strategy', 'Visual Storyteller'],
  blurbBreak: 'Visual storytelling for complex, high-stakes',
  blurbContinue: 'ideas. Built with precision. Designed to hold up.',
}

export const contact = {
  line: 'Contact Me.',
  linkedin: 'https://www.linkedin.com/in/cierrajmaach',
  instagram: 'https://www.instagram.com/cierrajmaach.creative/',
  resume: '/Cierra-Maach-Resume.pdf',
}

export const practices: Practice[] = [
  {
    index: '01',
    slug: 'creative-direction',
    path: '/creative-direction/making-space',
    title: 'Creative Direction',
    line: 'Leadership across large-scale efforts.',
    thesis:
      'The proof is in what was led — programs, teams, and pictures that had to survive a hard subject.',
    lead: true,
    preview: '/studio/index-creative-direction.jpg',
    previewAlt: 'A studio light, barn door open, after the transformation.',
  },
  {
    index: '02',
    slug: 'visual-storytelling',
    path: '/visual-storytelling',
    title: 'Visual Storytelling',
    line: 'Film, animation, motion. The picture that has to hold a story.',
    thesis:
      'Moving image as argument — not a reel of shots, a point of view held over time.',
    hidden: true,
  },
  {
    index: '02',
    slug: 'experience',
    path: '/experience/classical-orbital-elements',
    title: 'Experience / 3D / Interactive',
    line: 'Worlds you enter. Systems you move through.',
    thesis:
      'Space you can stand in, digital or otherwise. The subject becomes a place.',
    preview: '/coe/index-experience-earth.jpg',
    previewAlt: 'Earth with an inclined orbit from Classical Orbital Elements.',
  },
  {
    index: '03',
    slug: 'experiments',
    path: '/experiments/dlt-visual-identity',
    title: 'Selected Works',
    line: 'The cuts that did not belong in the other chapters.',
    thesis:
      'Studies, tests, and work that is true but does not fit the larger arguments.',
    preview: '/dlt/index-experiments.jpg',
    previewAlt: 'Digital Learning Team logo system.',
  },
  {
    index: '05',
    slug: 'blog',
    path: '/blog',
    title: 'Blog',
    line: 'Notes on the work, the craft, and the rooms it happens in.',
    thesis: 'Writing, when there is something that will not fit in a frame.',
    hidden: true,
  },
]

export const efforts: Effort[] = [
  {
    id: 'making-space',
    index: '01.1',
    title: 'Making Space for the Work',
    purpose:
      'A studio that could do more, because I made room for it.',
    role: 'Creative Director',
    domain: 'Studio',
    year: '',
    scale: '',
    outcome: 'More flexible shooting. Faster setups. Broader production range.',
    lead: true,
    path: '/creative-direction/making-space',
    src: '/studio/after-hero-v3.jpg',
    alt: 'The studio after transformation.',
  },
  {
    id: 'equipment-management',
    index: '01.2',
    title: 'Equipment Management',
    purpose:
      'A production equipment management system built around how the team actually worked.',
    role: 'Creative Director',
    domain: 'Studio',
    year: '',
    scale: '',
    outcome: '95+ assets. 25+ accessories. A production library the team can find.',
    path: '/creative-direction/equipment-management',
    src: '/equipment/qr-tags.jpg',
    alt: 'Production bags tagged with QR codes.',
  },
  {
    id: 'nssi-digital-presence',
    index: '01.3',
    title: 'NSSI Digital Presence',
    purpose:
      'Turning a recurring leadership priority into a sustainable communications capability.',
    role: 'Creative Director',
    domain: '',
    year: '',
    scale: '',
    outcome:
      'A recurring leadership request had become an institutional capability.',
    path: '/creative-direction/nssi-digital-presence',
    src: '/nssi/follow-us.jpg',
    alt: 'NSSI follow-us graphic spanning the public channels.',
  },
  {
    id: 'classical-orbital-elements',
    index: '02.1',
    title: 'Classical Orbital Elements',
    purpose: 'Making orbital mechanics visible — and explorable.',
    role: '',
    domain: '',
    year: '',
    scale: '',
    outcome: '',
    lead: true,
    path: '/experience/classical-orbital-elements',
  },
  {
    id: 'classroom-game-pieces',
    index: '02.2',
    title: 'Classroom Game Pieces',
    purpose:
      '3D-printed game pieces used to help ground a classroom lesson.',
    role: '',
    domain: '',
    year: '',
    scale: '',
    outcome: '',
    path: '/experience/classroom-game-pieces',
    src: '/game-pieces/wall-grid.jpg',
    alt: 'A wall of 3D-printed classroom game pieces.',
  },
  {
    id: 'space-law-game',
    index: '02.3',
    title: 'Space Law Game',
    purpose: 'Trailer.',
    role: '',
    domain: '',
    year: '',
    scale: '',
    outcome: '',
    path: '/experience/space-law-game',
  },
  {
    id: 'dlt-visual-identity',
    index: '03.1',
    title: 'Digital Learning Team Visual Identity',
    purpose: 'The Digital Learning Team’s visual identity.',
    role: '',
    domain: '',
    year: '',
    scale: '',
    outcome: '',
    lead: true,
    path: '/experiments/dlt-visual-identity',
    src: '/dlt/logo-system.jpg',
    alt: 'Digital Learning Team logo system.',
  },
]
