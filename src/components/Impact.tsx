import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { Trophy, Globe, Code, Layers } from 'lucide-react';

function AnimatedCounter({ end, duration = 1.5, suffix = "" }: { end: number, duration?: number, suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView) {
      let startTimestamp: number;
      const step = (timestamp: number) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
        const easeOutQuad = progress * (2 - progress);
        setCount(Math.floor(easeOutQuad * end));
        if (progress < 1) {
          window.requestAnimationFrame(step);
        }
      };
      window.requestAnimationFrame(step);
    }
  }, [isInView, end, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
}

export function Impact() {
  return (
    <section id="experience" className="max-w-7xl mx-auto px-6 py-24 sm:py-32 scroll-mt-24">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4 tracking-tight drop-shadow">
              Impact <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#b9f600] to-[#00d9ff]">& Recognition</span>
            </h2>
            <p className="text-[#bbc9ce] text-lg md:text-xl mb-12 leading-relaxed">
              Beyond the code, I focus on measurable outcomes that drive the industry forward.
            </p>
          </motion.div>

          <div className="space-y-6">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
              className="flex items-start md:items-center gap-6 p-6 md:p-8 rounded-3xl bg-[#131b2e]/60 border border-white/5 backdrop-blur-md hover:bg-[#171f33]/80 hover:border-white/10 transition-colors duration-300"
            >
              <div className="w-14 h-14 shrink-0 rounded-2xl bg-[#b9f600]/10 flex items-center justify-center border border-[#b9f600]/20 shadow-[0_0_20px_rgba(185,246,0,0.1)]">
                <Trophy className="w-6 h-6 text-[#b9f600]" />
              </div>
              <div>
                <h4 className="text-xl font-display font-semibold text-white mb-1">Top 20 National Capstone</h4>
                <p className="text-sm md:text-base text-[#bbc9ce]">Engineering Excellence Award 2023</p>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              className="flex items-start md:items-center gap-6 p-6 md:p-8 rounded-3xl bg-[#131b2e]/60 border border-white/5 backdrop-blur-md hover:bg-[#171f33]/80 hover:border-white/10 transition-colors duration-300"
            >
              <div className="w-14 h-14 shrink-0 rounded-2xl bg-[#ddb7ff]/10 flex items-center justify-center border border-[#ddb7ff]/20 shadow-[0_0_20px_rgba(221,183,255,0.1)]">
                <Globe className="w-6 h-6 text-[#ddb7ff]" />
              </div>
              <div>
                <h4 className="text-xl font-display font-semibold text-white mb-1">Policy Innovation Fellow</h4>
                <p className="text-sm md:text-base text-[#bbc9ce]">Digital Rights Collective</p>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 md:gap-6">
          {[
            { end: 10, suffix: "+", label: "Projects Built & Shipped", color: "#00d9ff", icon: Code },
            { end: 100, suffix: "+", label: "GitHub Contributions (Q1 2026)", color: "#ddb7ff", icon: Layers },
            { end: 2, suffix: "", label: "Years Building in Public | AI/ML", color: "#b9f600", icon: Globe },
            { end: 3, suffix: "+", label: "Recognition Awards", color: "#ffffff", icon: Trophy }
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.1 * i, ease: "easeOut" }}
              className="relative p-6 md:p-8 rounded-3xl bg-[#131b2e]/40 border border-white/5 flex flex-col items-center justify-center text-center backdrop-blur-sm hover:border-white/10 hover:bg-[#171f33]/60 transition-colors duration-300 overflow-hidden group"
            >
              {/* Subtle hover glow accent */}
              <div 
                className="absolute -inset-2 opacity-0 group-hover:opacity-10 transition-opacity duration-300 blur-xl"
                style={{ backgroundColor: stat.color }}
              />
              
              <div className="text-5xl md:text-6xl lg:text-7xl font-display font-bold mb-3 tracking-tighter drop-shadow-md relative z-10" style={{ color: stat.color }}>
                <AnimatedCounter end={stat.end} suffix={stat.suffix} />
              </div>
              <div className="text-xs md:text-sm font-medium text-[#bbc9ce] leading-relaxed max-w-[150px] relative z-10">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
