import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Projects } from './components/Projects';
import { TechnicalMatrix } from './components/TechnicalMatrix';
import { Impact } from './components/Impact';
import { CTA } from './components/CTA';
import { Footer } from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col font-sans">
      {/* Ambient background: soft accent glows + a fine dot grid.
          Fixed and pointer-transparent so it never blocks interaction. */}
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-[40rem] w-[40rem] rounded-full bg-[#00d9ff]/[0.09] blur-[130px]" />
        <div className="absolute top-1/3 -left-48 h-[36rem] w-[36rem] rounded-full bg-[#ddb7ff]/[0.07] blur-[140px]" />
        <div className="absolute -bottom-48 right-1/4 h-[32rem] w-[32rem] rounded-full bg-[#b9f600]/[0.05] blur-[130px]" />
        <div
          className="absolute inset-0 opacity-60"
          style={{
            backgroundImage: 'radial-gradient(rgba(255,255,255,0.045) 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />
        <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-[#060e20]/70 to-transparent" />
      </div>

      <Navbar />
      <main className="flex-1 pt-24 pb-12 overflow-hidden">
        <Hero />
        <Projects />
        <TechnicalMatrix />
        <Impact />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
