/** Single source of truth for identity and outbound links. */
export const site = {
  name: 'Rian Hussain',
  role: 'AI/ML Engineer & Product Builder',
  url: 'https://rianportfolio.netlify.app',
  github: 'https://github.com/rianhussain007',
  linkedin: 'https://linkedin.com/in/rian-hussain-dev',
  email: '786rianhussain@gmail.com',
  /**
   * Served from the site itself so the link can never rot or flip to a Drive
   * "request access" wall. The Google Drive copy is a mirror, not the source.
   */
  resume: '/resume.pdf',
  photo: '/rian-photo.png',
  /** Understated status line in the hero. */
  status: 'Building across applied AI, computer vision and intelligent products.',
} as const;

export const navSections = [
  { label: 'Work', href: '#work' },
  { label: 'About', href: '#about' },
  { label: 'Engineering', href: '#engineering' },
  { label: 'Journey', href: '#journey' },
  { label: 'Contact', href: '#contact' },
] as const;
