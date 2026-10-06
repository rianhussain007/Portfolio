/** Single source of truth for identity and outbound links. */
export const site = {
  name: 'Rian Hussain',
  role: 'AI/ML Engineer & Product Builder',
  url: 'https://rianportfolio.netlify.app',
  github: 'https://github.com/rianhussain007',
  linkedin: 'https://linkedin.com/in/rian-hussain-dev',
  email: '786rianhussain@gmail.com',
  resume: 'https://drive.google.com/file/d/1l5NIWVssYa5rXqFCPZOCeUfanhmG38pj/view?usp=sharing',
  photo: '/rian-photo.png',
  /** Understated status line in the hero. */
  status: 'Building across applied AI, computer vision and intelligent products.',
} as const;

/** The three builds that carry the portfolio, in presentation order. */
export const flagshipOrder = ['marmaai', 'kisan360', 'ergovigilance'] as const;

export const navSections = [
  { label: 'Work', href: '#work' },
  { label: 'About', href: '#about' },
  { label: 'Engineering', href: '#engineering' },
  { label: 'Journey', href: '#journey' },
  { label: 'Contact', href: '#contact' },
] as const;
