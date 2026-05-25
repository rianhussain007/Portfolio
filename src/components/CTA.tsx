import { Mail, FileText } from 'lucide-react';
import { motion } from 'motion/react';

const resumeUrl = "https://drive.google.com/file/d/1l5NIWVssYa5rXqFCPZOCeUfanhmG38pj/view?usp=sharing";

export function CTA() {
  return (
    <section className="max-w-5xl mx-auto px-6 py-24 sm:py-32 text-center">
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="p-10 md:p-20 rounded-[3rem] bg-gradient-to-b from-[#131b2e] to-[#060e20] border border-white/5 shadow-2xl relative overflow-hidden"
      >
        <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-[#00d9ff]/50 to-transparent"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wMykiLz48L3N2Zz4=')] opacity-50"></div>
        
        <div className="relative z-10">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 tracking-tight text-white drop-shadow">Ready to Build the <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00d9ff] to-[#ddb7ff]">Next Generation?</span></h2>
          <p className="text-[#bbc9ce] text-lg md:text-xl mb-12 max-w-2xl mx-auto leading-relaxed">
            I'm currently open to collaborative ventures at the intersection of AI, Robotics, and Public Interest. Let's engineer something meaningful.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
            <a 
              href="mailto:786rianhussain@gmail.com"
              aria-label="Email Rian Hussain"
              className="group w-full sm:w-auto flex items-center justify-center gap-3 px-10 py-4 rounded-full bg-gradient-to-r from-[#00d9ff] to-[#6f00be] text-white font-semibold hover:scale-105 transition-all duration-200 ease-out shadow-[0_0_20px_rgba(0,217,255,0.3)] hover:shadow-[0_0_30px_rgba(0,217,255,0.6)] active:scale-95 text-lg"
            >
              <Mail className="w-5 h-5 group-hover:animate-pulse" />
              Email Me
            </a>
            <a
              href={resumeUrl}
              aria-label="Open Rian Hussain's resume PDF"
              className="group w-full sm:w-auto flex items-center justify-center gap-3 px-10 py-4 rounded-full bg-[#131b2e] border border-white/10 text-white font-semibold hover:bg-[#171f33] hover:border-white/20 transition-all duration-200 active:scale-95 text-lg shadow-lg"
            >
              <FileText className="w-5 h-5 text-[#bbc9ce] group-hover:text-white transition-colors" />
              Download Resume
            </a>
          </div>
          
          <div className="mt-20 flex justify-center gap-6 text-white/20 font-display select-none">
            <span className="font-semibold text-2xl hover:text-white/40 transition-colors duration-300">Aa</span>
            <span className="font-semibold text-2xl hover:text-white/40 transition-colors duration-300">Aa</span>
            <span className="font-semibold text-2xl hover:text-white/40 transition-colors duration-300">Aa</span>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
