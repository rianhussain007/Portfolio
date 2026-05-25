import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';

const skills = [
  { name: "PyTorch", type: "AI/ML", prof: "Expertise", projects: "MediMind, WattWise", years: "2 Years", color: "#00d9ff" },
  { name: "Python", type: "AI/ML", prof: "Expertise", projects: "All Projects", years: "3+ Years", color: "#00d9ff" },
  { name: "ML/LLMs", type: "AI/ML", prof: "Expertise", projects: "Digital Culture Act", years: "1.5 Years", color: "#00d9ff" },
  { name: "TensorFlow", type: "AI/ML", prof: "Comfortable", projects: "WattWise", years: "1 Year", color: "#00d9ff" },
  { name: "Diffusers", type: "AI/ML", prof: "Learning", projects: "Personal Labs", years: "<1 Year", color: "#00d9ff" },
  { name: "AWS IoT", type: "Backend", prof: "Comfortable", projects: "Velora", years: "1 Year", color: "#ddb7ff" },
  { name: "Docker", type: "Backend", prof: "Comfortable", projects: "Velora, MediMind", years: "1.5 Years", color: "#ddb7ff" },
  { name: "Go", type: "Backend", prof: "Learning", projects: "WattWise", years: "<1 Year", color: "#ddb7ff" },
  { name: "React", type: "Frontend", prof: "Comfortable", projects: "MediMind", years: "2 Years", color: "#b9f600" },
  { name: "OpenCV", type: "AI/ML", prof: "Comfortable", projects: "Velora", years: "1.5 Years", color: "#00d9ff" },
];

export function TechnicalMatrix() {
  const [selectedSkill, setSelectedSkill] = useState<typeof skills[0] | null>(null);

  return (
    <section id="stack" className="max-w-7xl mx-auto px-6 py-24 sm:py-32 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mb-16"
      >
        <h2 className="text-4xl md:text-5xl font-display font-bold mb-4 tracking-tight drop-shadow">
          The <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00d9ff] to-[#ddb7ff]">Technical Matrix</span>
        </h2>
        <p className="text-[#bbc9ce] max-w-2xl mx-auto text-lg md:text-xl leading-relaxed">
          Mastery across the full spectrum of modern AI product development.
        </p>
      </motion.div>

      <div className="relative min-h-[500px] bg-gradient-to-br from-[#131b2e]/60 to-[#060e20]/60 rounded-[2.5rem] border border-white/5 p-8 flex flex-wrap justify-center items-center gap-x-10 gap-y-12 overflow-hidden shadow-2xl backdrop-blur-md">
        {/* Subtle background grid pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiLz48L3N2Zz4=')] opacity-50 z-0" />
        
        {skills.map((skill, i) => (
          <motion.button
            key={skill.name}
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: i * 0.08, ease: "easeOut" }}
            whileHover={{ 
              scale: 1.15,
              boxShadow: `0 0 30px ${skill.color}60`,
              borderColor: skill.color,
              backgroundColor: `${skill.color}15`
            }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedSkill(skill)}
            className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-[#171f33] border border-white/10 flex flex-col items-center justify-center cursor-pointer transition-colors duration-200 z-10 backdrop-blur-sm group"
          >
            <span className="text-sm sm:text-base font-mono font-medium text-white group-hover:text-shadow">{skill.name}</span>
          </motion.button>
        ))}

        <AnimatePresence>
          {selectedSkill && (
            <>
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedSkill(null)}
                className="absolute inset-0 bg-[#060e20]/80 backdrop-blur-md z-20"
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 10 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 w-[90%] max-w-md bg-[#131b2e] border border-white/10 rounded-3xl p-8 shadow-[0_0_50px_rgba(0,0,0,0.5)] text-left"
              >
                <button 
                  onClick={() => setSelectedSkill(null)}
                  className="absolute top-5 right-5 text-[#bbc9ce] hover:text-white bg-white/5 hover:bg-white/10 p-2 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
                <div 
                  className="w-16 h-16 rounded-2xl mb-6 flex items-center justify-center font-display font-bold text-2xl" 
                  style={{ backgroundColor: `${selectedSkill.color}20`, color: selectedSkill.color, border: `1px solid ${selectedSkill.color}40` }} 
                >
                  {selectedSkill.name.substring(0,2).toUpperCase()}
                </div>
                <h3 className="text-3xl font-display font-bold mb-2 text-white">{selectedSkill.name}</h3>
                
                <div className="flex items-center gap-3 mb-8">
                  <div className="inline-flex items-center px-3 py-1.5 rounded-lg bg-[#171f33] font-mono text-xs font-semibold uppercase tracking-wider text-white border border-white/5">
                    <span className="w-2 h-2 rounded-full mr-2" style={{ backgroundColor: selectedSkill.color }}></span>
                    {selectedSkill.type}
                  </div>
                  <div className="inline-flex items-center px-3 py-1.5 rounded-lg bg-white/5 font-mono text-xs text-[#00d9ff] border border-[#00d9ff]/20">
                    {selectedSkill.prof} / {selectedSkill.years}
                  </div>
                </div>

                <div className="bg-[#0b1326] rounded-2xl p-5 border border-white/5">
                  <div className="text-xs text-[#bbc9ce] uppercase tracking-wider mb-2 font-mono">Associated Projects</div>
                  <div className="font-medium text-white leading-relaxed">{selectedSkill.projects}</div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
