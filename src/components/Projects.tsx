import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

const projects = [
  {
    title: "MediMind",
    desc: "AI-driven diagnostics assistant for radiologists, leveraging transformer architectures to detect subtle anomalies.",
    tags: ["PyTorch", "CUDA", "React"],
    image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&w=600&q=80",
    color: "#00d9ff",
    url: "https://appetize.io/app/b_arcto3zj4vfpqq4j3qvmnnevqm"
  },
  {
    title: "WattWise",
    desc: "Smart-grid optimization engine that predicts residential energy load and balances renewable distribution.",
    tags: ["Python", "TensorFlow", "Go"],
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80",
    color: "#b9f600",
    url: "https://wattwiser-mwy6dxwdvtob3zebkpmmwu.streamlit.app/"
  },
  {
    title: "Velora",
    desc: "A deployed full-stack web experience for streamlined user access and product interaction.",
    tags: ["React", "Full Stack", "Deployment"],
    image: "https://images.unsplash.com/photo-1611273426858-450d8bec726f?auto=format&fit=crop&w=600&q=80",
    color: "#ff5555",
    url: "https://velora-0n1o.onrender.com/login"
  },
  {
    title: "Digital Cultural Equity Act",
    desc: "A policy framework and data pipeline analyzing digital access disparities to inform legislative action.",
    tags: ["NLP", "Data Viz", "Policy ML"],
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80",
    color: "#ddb7ff",
    url: "https://github.com/rianhussain007/cdm-prototype"
  }
];

export function Projects() {
  return (
    <section id="projects" className="max-w-7xl mx-auto px-6 py-24 sm:py-32">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h2 className="text-4xl md:text-5xl font-display font-bold mb-4 tracking-tight drop-shadow">
          Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00d9ff] to-[#00687b]">Deployments</span>
        </h2>
        <p className="text-[#bbc9ce] max-w-2xl text-lg md:text-xl mb-16 leading-relaxed">
          Strategic implementations of machine learning across healthcare, energy, and governance.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        {projects.map((project, i) => (
          <motion.a
            key={project.title}
            href={project.url}
            aria-label={`Open ${project.title} project`}
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: i * 0.12, ease: "easeOut" }}
            className="group block relative bg-[#131b2e]/60 border border-white/5 rounded-3xl overflow-hidden hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(0,217,255,0.1)] hover:border-[#00d9ff]/30 transition-all duration-250 ease-out cursor-pointer flex flex-col lg:hover:bg-[#171f33]/80"
          >
            <div className="h-56 sm:h-64 overflow-hidden bg-[#060e20] relative p-1">
              <div className="absolute inset-0 bg-[#0b1326]/30 group-hover:bg-transparent transition-colors duration-300 z-10 mix-blend-overlay" />
              <img 
                src={project.image} 
                alt={project.title} 
                className="w-full h-full object-cover rounded-[1.25rem] group-hover:scale-[1.03] transition-transform duration-500 ease-out" 
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="p-8 flex flex-col flex-1">
              <h3 className="text-2xl md:text-3xl font-display font-semibold mb-3 text-white group-hover:text-[#00d9ff] transition-colors">{project.title}</h3>
              <p className="text-[#bbc9ce] mb-8 leading-relaxed group-hover:text-white transition-colors duration-200">
                {project.desc}
              </p>
              
              <div className="flex flex-wrap gap-2 mb-8 mt-auto">
                {project.tags.map(tag => (
                  <span 
                    key={tag} 
                    className="text-xs font-mono px-3.5 py-1.5 rounded-full bg-white/5 text-[#bbc9ce] border border-white/10 group-hover:glow-sm hover:!border-[#00d9ff] hover:!text-[#00d9ff] hover:!bg-[#00d9ff]/10 hover:-translate-y-0.5 transition-all duration-150 ease-out"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              
              <div className="flex items-center justify-between text-[#00d9ff]/80 font-semibold group-hover:text-[#00d9ff] transition-colors duration-200 w-full">
                <span className="tracking-wide">View Project</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200 ease-out" />
              </div>
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  );
}
