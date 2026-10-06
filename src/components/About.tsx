import { SectionHeading } from './SectionHeading';

const interests = [
  'Applied AI',
  'Computer vision',
  'ML systems',
  'Product engineering',
  'Research-driven development',
];

export function About() {
  return (
    <section id="about" className="mx-auto max-w-[84rem] scroll-mt-24 px-6 py-20 sm:py-28">
      <SectionHeading index="03" eyebrow="About" title="Why I build the way I do" accent="#9e4e26" />

      <div className="mt-14 grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-7">
          <p className="font-display text-2xl font-medium leading-snug tracking-tight text-ink sm:text-3xl">
            I like building systems where AI has to leave the notebook and become part of a real
            product.
          </p>

          <div className="mt-8 space-y-6 text-base leading-relaxed text-ink-soft sm:text-[1.0625rem]">
            <p>
              My work spans computer vision, machine learning, backend systems and product
              engineering. I&rsquo;m particularly interested in problems where perception,
              intelligence, interfaces and verification have to work together.
            </p>
            <p>
              Projects such as{' '}
              <span className="font-medium text-ink">MarmaAI</span>,{' '}
              <span className="font-medium text-ink">Kisan360</span> and{' '}
              <span className="font-medium text-ink">ErgoVigilance</span> reflect that direction —
              different problem spaces, but the same goal: turn technical ideas into systems people
              can actually use.
            </p>
            <p className="border-l-2 border-clay/45 pl-5">
              I care about the unglamorous half of engineering: what happens when a model is wrong,
              what the interface claims, how a system behaves when a camera disconnects or a price
              feed goes stale, and whether the number on screen can be traced back to something
              measured.
            </p>
          </div>
        </div>

        <div className="lg:col-span-5">
          <p className="meta-label text-ink-mute">Especially interested in</p>
          <ul className="mt-5 border-t border-line">
            {interests.map(interest => (
              <li
                key={interest}
                className="border-b border-line-soft py-3.5 text-sm font-medium text-ink"
              >
                {interest}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
