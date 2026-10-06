import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Projects } from './components/Projects';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Recognition } from './components/Recognition';
import { ProofOfWork } from './components/ProofOfWork';
import { CTA } from './components/CTA';
import { Footer } from './components/Footer';

export default function App() {
  return (
    <div className="flex min-h-screen flex-col overflow-x-clip font-sans">
      {/* Ambient backdrop: two faint accent glows and a fine dot grid.
          Fixed and pointer-transparent so it never blocks interaction. */}
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -right-40 -top-40 h-[38rem] w-[38rem] rounded-full bg-[#00d9ff]/[0.07] blur-[130px]" />
        <div className="absolute -left-48 top-1/3 h-[34rem] w-[34rem] rounded-full bg-[#ddb7ff]/[0.05] blur-[140px]" />
        <div
          className="absolute inset-0 opacity-50"
          style={{
            backgroundImage: 'radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />
      </div>

      <Navbar />

      <main className="flex-1 pt-20">
        <Hero />
        <Projects />
        <About />
        <Skills />
        <Recognition />
        <ProofOfWork />
        <CTA />
      </main>

      <Footer />
    </div>
  );
}
