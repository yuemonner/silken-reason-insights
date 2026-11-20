import { useEffect, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Layout from "@/components/Layout";
import { VeyraFooter } from "@/pages/Landing";

/* Technology: how Veyra works, for engineers judging whether to trust it. It explains what each part does and why,
   not the case-specific numbers (those are in the case study) or the recipe behind each check. */

const INK = "text-[#0b1220]";

const Section = ({ id, kicker, title, intro, children }: { id: string; kicker: string; title: string; intro?: ReactNode; children: ReactNode }) => (
  <section id={id} className="scroll-mt-20 border-t border-[#e4e7ec] py-16">
    <div className="max-w-3xl">
      <p className="text-[13px] font-medium text-[#3d3ac8]">{kicker}</p>
      <h2 className={`mt-2 text-[26px] font-semibold leading-[1.15] tracking-[-0.02em] md:text-[32px] ${INK}`}>{title}</h2>
      {intro && <p className="mt-4 text-[16px] leading-relaxed text-[#475467]">{intro}</p>}
    </div>
    <div className="mt-8">{children}</div>
  </section>
);

const Cards = ({ items, cols = "md:grid-cols-2" }: { items: [string, string][]; cols?: string }) => (
  <div className={`grid gap-4 ${cols}`}>
    {items.map(([t, d]) => (
      <div key={t} className="rounded-xl border border-[#e4e7ec] bg-white p-5">
        <p className={`text-[15.5px] font-semibold ${INK}`}>{t}</p>
        <p className="mt-1.5 text-[14px] leading-relaxed text-[#475467]">{d}</p>
      </div>
    ))}
  </div>
);

const parts: { name: string; role: string; items: string[] }[] = [
  {
    name: "Veyra agent",
    role: "Runs the investigation",
    items: [
      "Plans what to establish first and what would separate the explanations.",
      "Writes down a prediction before each test, then runs it.",
      "Decides when the evidence is enough, and when it is not.",
    ],
  },
  {
    name: "Engineering engine",
    role: "Does the engineering",
    items: [
      "Reads the record, decides which signals to trust and rebuilds the sequence of events.",
      "Runs the system-level and physics checks as calculations, not as text.",
      "Every number it returns can be reproduced from the record.",
    ],
  },
  {
    name: "Verification",
    role: "Holds the report to the record",
    items: [
      "Every quote and number in a report is checked against the data and the calculations.",
      "A report that does not hold up is sent back for correction before anyone sees it.",
      "Uncertainty is stated, never smoothed over.",
    ],
  },
];

const system: [string, string][] = [
  ["Decides which signals to trust", "Copies of the same measurement are counted once, and a field that does not measure what its name says is set aside before any reasoning starts."],
  ["Checks the complaint against the record", "What was reported and what the machine recorded often differ. The investigation starts from what was recorded."],
  ["Rebuilds sequences across subsystems", "Software, controls, electrical systems and protections in one timeline, so cause and consequence are not confused."],
  ["Infers what was not specified", "Where no specification is given, behaviour such as protection levels is inferred from the record and labelled as inferred."],
  ["Reasons across resets and states", "A cleared fault is not a safe machine. Veyra follows the system through every reset and mode change, and raises safety holds."],
];

const physics: [string, string][] = [
  ["Conservation", "Charge, energy and motion must add up. An explanation the physics cannot support is weakened, whatever the log text says."],
  ["Dynamics", "How quickly quantities change, and how differences between them grow, separates what triggered a protection from the upstream cause."],
  ["Sensor limits", "Resolution, placement and what each sensor cannot see are part of the reasoning, so a quiet signal is not mistaken for a healthy one."],
  ["What each explanation requires", "Each explanation predicts a different trace. Veyra compares them, and names the measurement that would separate the ones still standing."],
];

const methodLoop: [string, string, string][] = [
  ["Real field cases", "First", "Veyra investigates a real failure from the customer's own logs, and is checked against the cause their engineers confirmed."],
  ["Methods written with engineers", "From each case", "Where experienced engineers reasoned further than Veyra, their method is written down step by step."],
  ["Built in as checks", "In the product", "Each method becomes a check that runs on every new case, not a note in a document."],
  ["Tested on unseen cases", "Every upgrade", "Pass criteria are fixed before the run. A method stays only if it never argues against the true cause."],
];

const inputs = ["ROS 1 and ROS 2 bags", "MCAP", "PX4 ULog", "CSV and table exports from CAN-based systems", "Text logs"];

const security: [string, string][] = [
  ["Read-only", "Veyra reads exported logs or a read-only connection. There is no control path into your machines."],
  ["Private by default", "Your data, your investigations and the knowledge built from them stay in your workspace and are not shared with other customers."],
  ["AI model use on your terms", "Your data is sent to an AI model only with your recorded permission, and only for your investigation."],
  ["Nothing published without you", "A case appears outside your company only anonymised, and only with your written agreement."],
  ["Every claim traceable", "Each finding points to the record or the calculation behind it."],
  ["You confirm what is kept", "Knowledge records hold only what your engineers have verified, and say what is not yet established."],
];

const VeyraTechnology = () => {
  useEffect(() => {
    document.title = "Technology | Veyra";
  }, []);
  return (
    <Layout>
      <article className="bg-white">
        <header className="border-b border-[#e4e7ec] bg-[#f9fafb]">
          <div className="container mx-auto max-w-6xl px-6 pb-14 pt-12">
            <Link to="/veyra" className="inline-flex items-center gap-1.5 text-[13px] text-[#667085] hover:text-[#0b1220]">
              <ArrowLeft size={14} /> Veyra
            </Link>
            <p className="mt-8 text-[13px] font-medium text-[#3d3ac8]">Technology</p>
            <h1 className={`mt-3 max-w-4xl text-[36px] font-semibold leading-[1.05] tracking-[-0.035em] md:text-[52px] ${INK}`}>
              An agent that investigates. An engine that does the engineering.
            </h1>
            <p className="mt-5 max-w-3xl text-[17px] leading-relaxed text-[#475467]">
              Veyra combines an AI agent with an engineering engine and methods from experienced engineers. The agent
              decides what to test; the engine computes it from the record; verification holds every claim to the data.
            </p>
            <nav aria-label="On this page" className="mt-8 flex flex-wrap gap-2 text-[13px]">
              {[
                ["#architecture", "Architecture"],
                ["#system", "System-level investigation"],
                ["#physics", "Physics-grounded reasoning"],
                ["#methods", "Engineering expertise"],
                ["#inputs", "Data it reads"],
                ["#security", "Security"],
              ].map(([h, l]) => (
                <a key={h} href={h} className="rounded-full border border-[#e4e7ec] bg-white px-3 py-1 text-[#475467] hover:border-[#c7c6f5] hover:text-[#0b1220]">{l}</a>
              ))}
            </nav>
          </div>
        </header>

        <div className="container mx-auto max-w-6xl px-6">
          <Section id="architecture" kicker="Architecture" title="Three parts, each with one job" intro="An AI model alone can read a short log well. What it cannot do on its own is compute from millions of values, keep every number honest, and carry what was learned to the next case.">
            <div className="grid gap-4 lg:grid-cols-3">
              {parts.map((p, i) => (
                <div key={p.name} className="rounded-xl border border-[#e4e7ec] bg-white p-5">
                  <span className="font-mono text-[12px] text-[#98a2b3]">0{i + 1}</span>
                  <p className={`mt-2 text-[17px] font-semibold ${INK}`}>{p.name}</p>
                  <p className="text-[13px] text-[#667085]">{p.role}</p>
                  <ul className="mt-4 space-y-2.5">
                    {p.items.map((x) => (
                      <li key={x} className="text-[14px] leading-relaxed text-[#475467]">{x}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Section>

          <Section id="system" kicker="System-level investigation" title="What the machine actually did" intro="Most field failures cross subsystem boundaries. Veyra investigates the machine as a system, not one alarm at a time.">
            <Cards items={system} />
          </Section>

          <Section id="physics" kicker="Physics-grounded reasoning" title="What physics allows" intro="Not just anomalies in logs. Every explanation is held to physical constraints, and where the evidence cannot separate competing causes, Veyra says so.">
            <Cards items={physics} />
          </Section>

          <Section id="methods" kicker="Engineering expertise, made executable" title="Each case makes Veyra more capable" intro="The methods experienced engineers use are written down and built into Veyra as checks, then tested before they ship.">
            <ol className="grid gap-px overflow-hidden rounded-xl border border-[#e4e7ec] bg-[#e4e7ec] md:grid-cols-2 lg:grid-cols-4">
              {methodLoop.map(([t, tag, d], i) => (
                <li key={t} className="bg-white p-5">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono text-[12px] text-[#98a2b3]">0{i + 1}</span>
                    <span className="rounded-full bg-[#eeedfc] px-2 py-0.5 text-[11.5px] font-medium text-[#3d3ac8]">{tag}</span>
                  </div>
                  <p className={`mt-3 text-[15.5px] font-semibold ${INK}`}>{t}</p>
                  <p className="mt-1.5 text-[13.5px] leading-relaxed text-[#475467]">{d}</p>
                </li>
              ))}
            </ol>
            <p className="mt-4 text-[13.5px] text-[#667085]">
              Each customer&apos;s confirmed knowledge stays private to that customer. Checks are measured on new records
              before any claim about how widely they apply.
            </p>
          </Section>

          <Section id="inputs" kicker="Data it reads" title="The machine's own records" intro="Veyra works from what the machine already logs. No new sensors, no agent on the machine.">
            <ul className="flex flex-wrap gap-2">
              {inputs.map((x) => (
                <li key={x} className="rounded-lg border border-[#e4e7ec] bg-[#f9fafb] px-3 py-2 text-[14px] text-[#0b1220]">{x}</li>
              ))}
            </ul>
            <p className="mt-4 text-[13.5px] text-[#667085]">Other formats are added per customer, with the mapping reviewed by your engineers.</p>
          </Section>

          <Section id="security" kicker="Security and data handling" title="Your machines, your data, your knowledge">
            <Cards items={security} cols="md:grid-cols-2 lg:grid-cols-3" />
          </Section>

          <section className="border-t border-[#e4e7ec] py-16">
            <div className="flex flex-col gap-6 rounded-2xl bg-[#0b1220] p-8 text-white md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-[20px] font-semibold">See it on a real case, or test it on yours.</p>
                <p className="mt-1 text-[14px] text-white/60">The case study shows every step of a real investigation.</p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link to="/veyra/field-case" className="inline-flex items-center gap-1.5 rounded-lg bg-white px-4 py-2.5 text-[14px] font-semibold text-[#0b1220] hover:bg-white/90">
                  Case study <ArrowRight size={14} />
                </Link>
                <Link to="/contact" className="inline-flex items-center gap-1.5 rounded-lg bg-[#3d3ac8] px-4 py-2.5 text-[14px] font-semibold text-white hover:bg-[#4f4bdc]">
                  Book a technical briefing
                </Link>
              </div>
            </div>
          </section>
        </div>
      </article>
      <VeyraFooter />
    </Layout>
  );
};

export default VeyraTechnology;
