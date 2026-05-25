export function Footer() {
  const currentYear = new Date().getFullYear();
  const links = [
    { label: "GitHub", href: "https://github.com/rianhussain007" },
    { label: "LinkedIn", href: "https://linkedin.com/in/rian-hussain-dev" },
    { label: "Email", href: "mailto:786rianhussain@gmail.com" },
    { label: "Resume", href: "https://drive.google.com/file/d/1l5NIWVssYa5rXqFCPZOCeUfanhmG38pj/view?usp=sharing" },
  ];
  
  return (
    <footer className="border-t border-white/5 mt-12 py-10 text-center text-sm font-medium text-[#bbc9ce] bg-[#060e20]">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="font-display font-bold text-lg tracking-widest text-[#00d9ff] drop-shadow-sm">Rian Hussain</div>
        <div>&copy; {currentYear} Rian Hussain &bull; Built with React & Tailwind</div>
        <div className="flex gap-6">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="hover:text-white hover:text-shadow transition-all duration-200"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
