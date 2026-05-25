import { motion } from 'motion/react';
import { Code, User } from 'lucide-react';
import { useState } from 'react';

const links = {
  github: "https://github.com/rianhussain007",
  linkedin: "https://linkedin.com/in/rian-hussain-dev",
};

export function Hero() {
  const [photoLoaded, setPhotoLoaded] = useState(true);

  return (
    <section className="max-w-7xl mx-auto px-6 py-20 flex flex-col-reverse lg:flex-row items-center justify-between gap-12 lg:gap-8 min-h-[85vh]">
      <div className="flex-1 space-y-8 z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10"
        >
          <div className="w-2 h-2 rounded-full bg-[#b9f600] animate-[pulse_3s_ease-in-out_infinite]"></div>
          <span className="text-[10px] sm:text-xs font-mono tracking-widest text-[#bbc9ce] uppercase">Available for Innovation</span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
          className="text-5xl sm:text-6xl md:text-7xl font-display font-bold leading-[1.1] tracking-tight text-white drop-shadow-lg"
        >
          From Ideation to<br/>
          Impact | <span className="text-[#00d9ff]">AI</span> &<br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00d9ff] to-[#ddb7ff]">Policy Innovation</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-lg md:text-xl text-[#bbc9ce] max-w-xl leading-relaxed"
        >
          AI/ML Engineer specializing in building scalable products that bridge the gap between complex technical architectures and human-centric policy.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4"
        >
          <a
            href={links.github}
            aria-label="Open Rian Hussain's GitHub profile"
            className="flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-[#00d9ff]/50 hover:shadow-[0_0_20px_rgba(0,217,255,0.2)] transition-all duration-200 ease-out group active:scale-95"
          >
            <Code className="w-4 h-4 text-[#bbc9ce] group-hover:text-[#00d9ff] transition-colors" />
            <span className="font-semibold text-white">GitHub</span>
          </a>
          <a
            href={links.linkedin}
            aria-label="Open Rian Hussain's LinkedIn profile"
            className="flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-[#ddb7ff]/50 hover:shadow-[0_0_20px_rgba(221,183,255,0.2)] transition-all duration-200 ease-out group active:scale-95"
          >
            <User className="w-4 h-4 text-[#bbc9ce] group-hover:text-[#ddb7ff] transition-colors" />
            <span className="font-semibold text-white">LinkedIn</span>
          </a>
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
        className="flex-1 w-full relative flex justify-center items-center lg:justify-end"
      >
        {/* Subtle continuous animation for 3D visual context */}
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 180, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 max-w-sm max-h-sm m-auto bg-gradient-to-tr from-[#00d9ff]/15 to-[#ddb7ff]/15 rounded-full blur-[80px] -z-10"
        />
        <div className="relative z-10 w-full max-w-[320px] sm:max-w-sm aspect-square rounded-[2rem] bg-[#171f33]/40 border border-white/10 p-2 shadow-[0_0_40px_rgba(0,217,255,0.05)] backdrop-blur-sm group">
            <div className="w-full h-full rounded-[1.5rem] overflow-hidden relative">
               {photoLoaded ? (
                 <img 
                   src="/rian-photo.png" 
                   alt="Rian Hussain" 
                   onError={() => setPhotoLoaded(false)}
                   className="w-full h-full object-cover object-center opacity-100 group-hover:scale-105 transition-transform duration-700 ease-out" 
                 />
               ) : (
                 <div className="w-full h-full flex items-center justify-center bg-[#0f1a2f] text-white">
                   <div className="text-center">
                     <div className="text-5xl font-display font-bold text-[#00d9ff] mb-3">RH</div>
                     <div className="text-sm font-mono text-[#bbc9ce]">Rian Hussain</div>
                   </div>
                 </div>
               )}
               <motion.div 
                 initial={{ opacity: 0, x: 20 }}
                 animate={{ opacity: 1, x: 0 }}
                 transition={{ delay: 1, duration: 0.5 }}
                 className="absolute top-4 right-4 bg-[#0b1326]/80 backdrop-blur-md border border-white/10 px-4 py-2 rounded-xl shadow-lg"
               >
                 <p className="text-xs font-mono text-[#bbc9ce] leading-relaxed">Hi, I am<br/><span className="text-[#00d9ff] font-semibold">Rian.</span></p>
               </motion.div>
            </div>
        </div>
      </motion.div>
    </section>
  );
}
