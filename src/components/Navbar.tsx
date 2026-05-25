import { AnimatePresence, motion } from 'motion/react';
import { ChevronDown, FileText, Github, Linkedin, Mail } from 'lucide-react';
import { useState } from 'react';

const contactLinks = [
  { label: "Email", href: "mailto:786rianhussain@gmail.com", icon: Mail },
  { label: "GitHub", href: "https://github.com/rianhussain007", icon: Github },
  { label: "LinkedIn", href: "https://linkedin.com/in/rian-hussain-dev", icon: Linkedin },
  { label: "Resume", href: "https://drive.google.com/file/d/1l5NIWVssYa5rXqFCPZOCeUfanhmG38pj/view?usp=sharing", icon: FileText },
];

export function Navbar() {
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-[#0b1326]/80 backdrop-blur-md border-b border-white/5 transition-all">
      <div className="w-full max-w-7xl mx-auto flex items-center justify-between">
        <div className="text-white font-display text-xl font-bold tracking-wider hover:text-[#00d9ff] transition-colors cursor-pointer">
          Rian Hussain
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-[#bbc9ce]">
          <a href="#projects" className="hover:text-[#00d9ff] hover:scale-105 transition-all duration-200">Projects</a>
          <a href="#stack" className="hover:text-[#00d9ff] hover:scale-105 transition-all duration-200">Stack</a>
          <a href="#research" className="hover:text-[#00d9ff] hover:scale-105 transition-all duration-200">Research</a>
          <a href="#experience" className="hover:text-[#00d9ff] hover:scale-105 transition-all duration-200">Experience</a>
        </div>
        <div className="relative">
          <button
            type="button"
            aria-expanded={isContactOpen}
            aria-haspopup="menu"
            onClick={() => setIsContactOpen((open) => !open)}
            className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-[#00d9ff] to-[#6f00be] text-white font-semibold text-sm hover:scale-105 transition-transform duration-200 shadow-[0_0_15px_rgba(0,217,255,0.4)] active:scale-95"
          >
            Get in Touch
            <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isContactOpen ? "rotate-180" : ""}`} />
          </button>

          <AnimatePresence>
            {isContactOpen && (
              <motion.div
                role="menu"
                initial={{ opacity: 0, y: -8, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.98 }}
                transition={{ duration: 0.16, ease: "easeOut" }}
                className="absolute right-0 mt-3 w-52 overflow-hidden rounded-2xl border border-white/10 bg-[#0b1326]/95 shadow-2xl backdrop-blur-md"
              >
                {contactLinks.map((link) => {
                  const Icon = link.icon;

                  return (
                    <a
                      key={link.label}
                      href={link.href}
                      role="menuitem"
                      onClick={() => setIsContactOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-[#bbc9ce] hover:bg-white/5 hover:text-white transition-colors"
                    >
                      <Icon className="w-4 h-4 text-[#00d9ff]" />
                      {link.label}
                    </a>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </nav>
  );
}
