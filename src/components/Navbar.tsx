import { AnimatePresence, motion } from 'motion/react';
import { ChevronDown, FileText, Github, Linkedin, Mail, Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';

const contactLinks = [
  { label: "Email", href: "mailto:786rianhussain@gmail.com", icon: Mail },
  { label: "GitHub", href: "https://github.com/rianhussain007", icon: Github },
  { label: "LinkedIn", href: "https://linkedin.com/in/rian-hussain-dev", icon: Linkedin },
  { label: "Resume", href: "https://drive.google.com/file/d/1l5NIWVssYa5rXqFCPZOCeUfanhmG38pj/view?usp=sharing", icon: FileText },
];

const sectionLinks = [
  { label: "Projects", href: "#projects" },
  { label: "Stack", href: "#stack" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsContactOpen(false);
        setIsMobileOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 border-b backdrop-blur-xl transition-all duration-300 ${
        scrolled
          ? "bg-[#0b1326]/92 border-white/10 shadow-[0_10px_40px_-12px_rgba(0,0,0,0.7)] py-2.5"
          : "bg-[#0b1326]/55 border-white/5 py-4"
      }`}
    >
      <div className="w-full max-w-7xl mx-auto flex items-center justify-between px-6">
        <a
          href="#"
          aria-label="Back to top"
          className="flex items-center gap-3 group"
        >
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-[#00d9ff]/40 bg-[#00d9ff]/10 font-display text-sm font-bold text-[#00d9ff] transition-all duration-300 group-hover:shadow-[0_0_18px_rgba(0,217,255,0.35)]">
            RH
          </span>
          <span className="text-white font-display text-xl font-bold tracking-wider group-hover:text-[#00d9ff] transition-colors">
            Rian Hussain
          </span>
        </a>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-[#bbc9ce]">
          {sectionLinks.map(link => (
            <a
              key={link.href}
              href={link.href}
              className="relative hover:text-white transition-colors duration-200 after:absolute after:-bottom-1.5 after:left-0 after:h-px after:w-0 after:bg-[#00d9ff] hover:after:w-full after:transition-all after:duration-300"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <div className="relative hidden md:block">
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

          <button
            type="button"
            aria-expanded={isMobileOpen}
            aria-controls="mobile-menu"
            aria-label={isMobileOpen ? "Close menu" : "Open menu"}
            onClick={() => setIsMobileOpen((open) => !open)}
            className="md:hidden grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/5 text-[#bbc9ce] hover:text-white hover:bg-white/10 transition-colors"
          >
            {isMobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="md:hidden absolute left-0 right-0 top-full border-b border-white/10 bg-[#0b1326]/97 backdrop-blur-xl px-6 pb-6 pt-2 shadow-[0_24px_50px_-20px_rgba(0,0,0,0.8)]"
          >
            <div className="flex flex-col">
              {sectionLinks.map(link => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileOpen(false)}
                  className="rounded-xl px-3 py-3 text-base font-medium text-[#dae2fd] hover:bg-white/5 hover:text-white transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2 border-t border-white/10 pt-4">
              {contactLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={() => setIsMobileOpen(false)}
                    className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-sm font-medium text-[#bbc9ce] hover:text-white hover:border-white/20 transition-colors"
                  >
                    <Icon className="w-4 h-4 text-[#00d9ff]" />
                    {link.label}
                  </a>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
