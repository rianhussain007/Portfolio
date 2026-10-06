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
    <section id="about" className="mx-auto max-w-7xl scroll-mt-24 px-6 py-20 sm:py-28">
      <SectionHeading
        eyebrow="About"
        title="The model is usually the smallest part of the problem"
        accent="#ddb7ff"
      />

      <div className="mt-12 grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="space-y-6 text-base leading-relaxed text-[#c3cee6] lg:col-span-7 sm:text-lg">
          <p>
            I&rsquo;m an engineering student and product builder working across AI, machine learning,
            computer vision and full-stack systems. I like problems where an ML model is only one part of
            the solution — where the real work is connecting perception, backend logic, interfaces,
            verification, testing and deployment into something a person can actually use.
          </p>
          <p>
            My work currently includes computer-vision systems such as{' '}
            <span className="font-semibold text-white">ErgoVigilance</span>, and ongoing research and
            product development through <span className="font-semibold text-white">MarmaAI</span>.
          </p>
          <p className="border-l-2 border-[#00d9ff]/40 pl-5 text-[#9fb0c9]">
            I care about the unglamorous half of engineering: what happens when a model is wrong, what the
            interface claims, how a system behaves when a camera disconnects or a stream drops, and whether
            the numbers on screen can be traced back to something measured.
          </p>
        </div>

        <div className="lg:col-span-5">
          <div className="rounded-3xl border border-white/10 bg-[#0d1528]/70 p-7">
            <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-[#7f93ad]">
              Especially interested in
            </p>
            <ul className="mt-5 space-y-3">
              {interests.map(interest => (
                <li key={interest} className="flex items-center gap-3 text-sm font-medium text-[#dae2fd]">
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#ddb7ff]" aria-hidden="true" />
                  {interest}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
