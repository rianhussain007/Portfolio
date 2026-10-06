import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { SelectedWork } from './components/Projects';
import { About } from './components/About';
import { Engineering } from './components/Engineering';
import { Journey } from './components/Journey';
import { ProofOfWork } from './components/ProofOfWork';
import { CTA } from './components/CTA';
import { Footer } from './components/Footer';

export default function App() {
  return (
    <div className="flex min-h-screen flex-col overflow-x-clip bg-canvas font-sans text-ink">
      <Navbar />

      <main className="flex-1 pt-20">
        <Hero />
        <SelectedWork />
        <About />
        <Engineering />
        <Journey />
        <ProofOfWork />
        <CTA />
      </main>

      <Footer />
    </div>
  );
}
