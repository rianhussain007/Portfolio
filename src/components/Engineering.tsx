import { SectionHeading } from './SectionHeading';

interface Step {
  label: string;
  detail: string;
}

const steps: Step[] = [
  {
    label: 'Problem',
    detail: 'Start from the decision someone actually has to make, not from the model I want to train.',
  },
  {
    label: 'Research',
    detail: 'Read the literature, check what already exists, and write down what would count as evidence.',
  },
  {
    label: 'Architecture',
    detail: 'Split the system into stages that can each fail and be tested on their own.',
  },
  {
    label: 'Prototype',
    detail: 'Get the riskiest stage working end to end before polishing anything around it.',
  },
  {
    label: 'Implementation',
    detail: 'Typed interfaces between services, explicit failure modes, no silent fallbacks.',
  },
  {
    label: 'Testing',
    detail: 'Unit tests for logic, hand-checked data for accuracy claims, and limits written next to the number.',
  },
  {
    label: 'Deployment',
    detail: 'Containers, health checks, secrets that fail closed, and a way to run the whole thing locally.',
  },
  {
    label: 'Iteration',
    detail: 'Publish what did not hold up, retire the measurement, and rebuild the claim honestly.',
  },
];

interface CapabilityGroup {
  title: string;
  items: string[];
  seenIn: string;
}

const capabilities: CapabilityGroup[] = [
  {
    title: 'AI + Computer Vision',
    items: ['Python', 'OpenCV', 'MediaPipe', 'Pose estimation (YOLOv8)', 'scikit-learn', 'ML evaluation'],
    seenIn: 'MarmaAI · ErgoVigilance · WattWise',
  },
  {
    title: 'Product Engineering',
    items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'React Query', 'Zustand'],
    seenIn: 'ErgoVigilance · Kisan360 · TradeGuard AI',
  },
  {
    title: 'Backend',
    items: ['FastAPI', 'Flask', 'Node / Express', 'REST APIs', 'WebSockets', 'MongoDB · SQL'],
    seenIn: 'Kisan360 · ErgoVigilance · InternIQ',
  },
  {
    title: 'Engineering Practice',
    items: ['Git', 'Docker Compose', 'Automated testing', 'Deployment', 'System design', 'Data provenance'],
    seenIn: '805 tests in MarmaAI · 765 in ErgoVigilance',
  },
];

export function Engineering() {
  return (
    <section id="engineering" className="mx-auto max-w-[84rem] scroll-mt-24 px-6 py-20 sm:py-28">
      <SectionHeading
        index="04"
        eyebrow="Engineering"
        title="From idea → working system"
        copy="I'm most interested in the space where research, engineering and product decisions have to work together. This is the order I try to work in — the parts I skip are usually the parts that come back."
      />

      <ol className="mt-14 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((step, i) => (
          <li key={step.label} className="border-t border-line pt-5">
            <span className="meta-label tabular-nums text-ink-mute">
              {String(i + 1).padStart(2, '0')}
            </span>
            <h3 className="mt-3 font-display text-xl font-medium tracking-tight text-ink">
              {step.label}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">{step.detail}</p>
          </li>
        ))}
      </ol>

      <div className="mt-20 border-t border-line pt-14">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-baseline lg:justify-between">
          <h3 className="display-section text-ink">Capabilities</h3>
          <p className="max-w-xl text-sm leading-relaxed text-ink-mute">
            No self-assigned percentages. Every item below appears in the projects on this page, and
            the projects are the evidence.
          </p>
        </div>

        <dl className="mt-10 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {capabilities.map(group => (
            <div key={group.title} className="border-t border-line pt-5">
              <dt className="font-display text-lg font-medium tracking-tight text-ink">
                {group.title}
              </dt>
              <dd>
                <ul className="mt-3 space-y-1.5 text-sm text-ink-soft">
                  {group.items.map(item => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <p className="meta-label mt-4 text-ink-mute">Seen in</p>
                <p className="mt-1.5 text-xs leading-relaxed text-ink-soft">{group.seenIn}</p>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
