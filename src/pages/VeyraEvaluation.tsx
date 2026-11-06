import { useEffect, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Layout from "@/components/Layout";

/* Veyra's evaluations: how each was designed, what it found, what it did not win, and its limits.
   Sources: docs/research/SEALED_REAL_LOG_EVAL_2026_10_28.md and backend/research/electrical_validation/RESULTS.md
   in the Veyra repository. */

const H2 = ({ id, children }: { id: string; children: ReactNode }) => (
  <h2 id={id} className="scroll-mt-20 text-[26px] font-semibold leading-[1.15] tracking-[-0.02em] text-foreground md:text-[32px]">{children}</h2>
);
const P = ({ children }: { children: ReactNode }) => <p className="mt-4 text-[15.5px] leading-relaxed text-muted-foreground">{children}</p>;

const Table = ({ head, rows, emphasis, mono = true }: { head: string[]; rows: (string | number)[][]; emphasis?: number; mono?: boolean }) => (
  <div className="mt-6 overflow-x-auto rounded-xl border border-border">
    <table className="w-full min-w-[560px] border-collapse text-left text-[14px]">
      <thead className="bg-[#f4f6f9]">
        <tr>{head.map((h) => <th key={h} className="px-4 py-3 text-[12.5px] font-semibold text-foreground">{h}</th>)}</tr>
      </thead>
      <tbody>
        {rows.map((r, i) => (
          <tr key={i} className={`border-t border-border ${emphasis === i ? "bg-[#84d7b0]/[0.12]" : ""}`}>
            {r.map((c, j) => <td key={j} className={`px-4 py-3 align-top ${j === 0 ? "font-medium text-foreground" : mono ? "font-mono text-[13.5px] text-muted-foreground" : "text-[14px] leading-relaxed text-muted-foreground"}`}>{c}</td>)}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const Bullets = ({ items }: { items: ReactNode[] }) => (
  <ul className="mt-4 space-y-2.5">
    {items.map((x, i) => (
      <li key={i} className="grid grid-cols-[12px_minmax(0,1fr)] gap-2 text-[15px] leading-relaxed text-muted-foreground">
        <span className="mt-[10px] h-1.5 w-1.5 rounded-full bg-foreground/40" />
        <span>{x}</span>
      </li>
    ))}
  </ul>
);

const VeyraEvaluation = () => {
  useEffect(() => {
    document.title = "Veyra evaluation and methodology | Silken Reason";
  }, []);
  return (
    <Layout>
      <article className="bg-background">
        <header className="border-b border-border bg-[#0a1424] text-white">
          <div className="container mx-auto max-w-4xl px-6 pb-16 pt-14">
            <Link to="/veyra" className="inline-flex items-center gap-1.5 text-[13px] text-white/55 hover:text-white">
              <ArrowLeft size={14} /> Veyra
            </Link>
            <h1 className="mt-6 text-[38px] font-semibold leading-[1.02] tracking-[-0.035em] md:text-[56px]">
              How we test Veyra, and where it falls short.
            </h1>
            <p className="mt-6 max-w-2xl text-[17px] leading-relaxed text-white/65">
              Two tests answer two different questions. Each was designed and sealed before it ran. The results it did not
              win and the limits are published with the ones it did.
            </p>
            <p className="mt-6 text-[12.5px] text-white/40">Updated 6 November 2026</p>
          </div>
        </header>

        <div className="container mx-auto max-w-4xl px-6 py-16">
          <section>
            <H2 id="summary">At a glance</H2>
            <Table
              mono={false}
              head={["", "Real public failure logs", "Electrical physics checks"]}
              rows={[
                ["Question", "Does Veyra get an engineer to a useful next action, compared with the same AI model alone?", "Are the computed numbers right, and does it avoid false alarms?"],
                ["Data", "14 real logs from public issue threads (8 held out)", "450 held-out vehicles from an independent simulator"],
                ["Main result", "Actionable first step on 16 of 16 points, against 8 of 16", "0 of 120 healthy vehicles flagged; true cause kept open in 178 of 178 flags"],
                ["Did not win", "Diagnosis: 72 of 80, against 76 for the model alone", "Missed 31 of 45 inverters drawing too much current"],
                ["Biggest limit", "Short logs and a small set", "Simulated vehicles, not a real fleet"],
              ]}
            />
          </section>

          <section className="mt-20">
            <H2 id="real-logs">1. Real public failure logs</H2>
            <P>
              On robot failures nobody building Veyra had seen, does Veyra investigate better than a general AI agent, and
              does it save the engineer work? No synthetic data.
            </P>
            <h3 className="mt-8 text-[17px] font-semibold text-foreground">Design</h3>
            <Bullets
              items={[
                "A separate agent collected real logs pasted in public GitHub and forum threads and sealed the answer keys (the cause established later in the thread, or unresolved). The keys were hashed before any system ran. Every case the team had touched was excluded.",
                "Three conditions, with the same input (the log and the reporter's symptom, diagnosis removed) and the same output format: Veyra's rules without a model, Veyra with the AI, and the same AI model working alone on the raw log.",
                "A separate grader, blind to the condition, scored five criteria from 0 to 2 against the keys. A script checked every cited line and quote mechanically.",
                "Three of the eight held-out cases are unresolved upstream, to test whether Veyra admits what a log cannot show.",
              ]}
            />
            <h3 className="mt-10 text-[17px] font-semibold text-foreground">Results on the 8 held-out cases</h3>
            <Table
              head={["", "Events", "Cause vs effect", "Next check", "Evidence", "Uncertainty", "Total /80", "Actionable step /16"]}
              rows={[
                ["Veyra (with AI)", 14, 13, 14, 16, 15, 72, 16],
                ["Same AI model alone", 16, 16, 15, 15, 14, 76, 8],
                ["Veyra rules, no AI", 3, 0, 2, 4, 8, 17, 0],
              ]}
              emphasis={0}
            />
            <Bullets
              items={[
                "Veyra's measured gain is in the engineer's workload. Every first step was directly actionable, a concrete command or value plus what each result would mean, against half for the model alone. Every quote was verified against the file. It took 22 to 26 seconds from upload to the next action.",
                "On diagnosis, Veyra matched the model alone but did not beat it. In two cases it led with an explanation the symptom or the thread had already ruled out.",
                "Without the AI, Veyra's rules alone are weak (17 of 80), and the product says so when it falls back to them.",
                "An earlier batch of 6 cases, run before a rebuild, showed Veyra adding nothing over the model alone (55 against 57 of 60). That result is why the investigator was rebuilt.",
              ]}
            />
            <h3 className="mt-10 text-[17px] font-semibold text-foreground">Limits</h3>
            <Bullets
              items={[
                "14 cases, and short logs (8 to 152 lines) that a general model can read at once. Long and multi-file logs, where Veyra's approach should matter more, are not yet tested.",
                "The grader was blind to labels, but the output formats differ, so a grader could infer which system wrote which.",
                "Several answer keys rest on a contributor's analysis rather than a maintainer's confirmation.",
                "Both AI conditions use the same model, and memorisation of public threads cannot be ruled out.",
              ]}
            />
          </section>

          <section className="mt-20">
            <H2 id="physics">2. Electrical physics checks</H2>
            <P>
              Veyra computes electrical relations from a vehicle's voltages and currents. It keeps what is measured apart
              from what a model infers and from what no signal shows. This test asks whether those numbers and flags hold up
              against physics the checks do not assume.
            </P>
            <h3 className="mt-8 text-[17px] font-semibold text-foreground">Design</h3>
            <Bullets
              items={[
                "An independent simulator generates battery-electric vehicles with richer physics than the checks assume: power-driven motor loads, a battery with temperature- and charge-dependent behaviour, sensor offsets and noise, and timing skew between controllers.",
                "Scenarios: healthy vehicles, uneven loads, connector and cable faults (including contacts that fail only under load), inverters drawing too much current, sensor errors, cold batteries, combined faults, missing signals and low load.",
                "Pass criteria were written down before the run. Thresholds were set on a separate development set and frozen. The 450 held-out vehicles were run once, and the true parameters were kept from the checks.",
              ]}
            />
            <h3 className="mt-10 text-[17px] font-semibold text-foreground">Results against the criteria set in advance</h3>
            <Table
              mono={false}
              head={["Criterion", "Required", "Result"]}
              rows={[
                ["Estimates made where the data cannot support one", "0", "0 of 450"],
                ["Healthy vehicles wrongly flagged", "≤ 5 %", "0 of 120"],
                ["True cause kept among the open explanations", "≥ 95 %", "178 of 178"],
                ["Drop-per-amp measurement error, median", "≤ 10 %", "4.2 %"],
                ["True resistance inside the reported range", "≥ 90 %", "94 %"],
                ["Battery comparisons that flag a charge-level difference", "100 %", "14 of 14"],
                ["Sensor offsets of 0.5 V or more caught", "≥ 90 %", "93 %"],
                ["Recommended check rules out a wrong explanation, keeps the right one", "≥ 90 %", "97 %"],
                ["Faults missed", "≤ 10 %", "28 %: failed"],
              ]}
            />
            <h3 className="mt-10 text-[17px] font-semibold text-foreground">Where it misses</h3>
            <Bullets
              items={[
                "Inverters drawing 1.5 to 2.2 times their share of current: 31 of 45 missed. A normal cable carrying double current adds only 2 to 5 mΩ of apparent resistance, inside the spread between healthy cables. Voltage alone cannot show it; per-wheel current or a vehicle's own history can.",
                "Contacts that fail only under load: 7 of 30 missed. In 6 cases the recommended depot check would read normal, so the recommendation carries a follow-up measurement under load.",
                "8.5 % of cases had a healthy wheel wrongly flagged with a sensor offset.",
              ]}
            />
            <h3 className="mt-10 text-[17px] font-semibold text-foreground">Limits</h3>
            <Bullets
              items={[
                "The vehicles are simulated. The checks and the simulator share an author, so this shows the checks hold up against physics they do not assume, not that they work on a real fleet.",
                "Validation on real vehicle data with a design partner is next.",
              ]}
            />
          </section>

          <section className="mt-20 rounded-2xl bg-[#f4f6f9] p-8">
            <H2 id="claims">What we do not claim</H2>
            <Bullets
              items={[
                "That Veyra diagnoses better than a strong general model on short logs. On our test it did not.",
                "Any time or cost saving at a customer. The pilot measures that against how your team works today.",
                "A confirmed cause. Veyra's conclusions stay probable until an engineer's reproduction or a fix that holds moves them up.",
              ]}
            />
            <h3 className="mt-8 text-[17px] font-semibold text-foreground">Next tests</h3>
            <Bullets
              items={[
                "A fresh held-out set with long and multi-file logs, measuring time to the next action and whether the first action resolved the failure.",
                "Real fleet data from a design partner, including engineers' accounts of how they debugged closed cases.",
                "Investigations with and without the expected-vs-observed engine on cases with known causes, with success criteria set in advance.",
              ]}
            />
          </section>

          <div className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-8">
            <p className="text-[14px] text-muted-foreground">The raw outputs, keys and grades are available to pilot partners on request.</p>
            <Link to="/contact" className="inline-flex items-center gap-1.5 rounded-full bg-[#0a1424] px-6 py-3 text-[14px] font-medium text-white hover:bg-[#16243b]">
              Request a pilot <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </article>
    </Layout>
  );
};

export default VeyraEvaluation;
