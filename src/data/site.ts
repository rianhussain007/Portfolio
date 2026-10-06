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
} as const;

export const navSections = [
  { label: 'Home', href: '#home' },
  { label: 'Work', href: '#work' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
] as const;
