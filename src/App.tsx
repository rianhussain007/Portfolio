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
