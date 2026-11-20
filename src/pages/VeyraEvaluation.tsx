import { useEffect, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Layout from "@/components/Layout";

/* Veyra's evaluations: how each was designed, what it found, what it did not win, and its limits.
   Sources in the Veyra repository: the expert-methods evaluation results, the anonymised field case shown in the demo,
   docs/research/SEALED_REAL_LOG_EVAL_2026_10_28.md and backend/research/electrical_validation/RESULTS.md. The field
   case is real data, not public, published anonymised with the manufacturer's agreement. */

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
    document.title = "Veyra evaluation: what works, what doesn't, and the evidence | Silken Reason";
  }, []);
  return (
    <Layout>
      <article className="bg-background">
        <header className="border-b border-border bg-[#0a1424] text-white">
          <div className="container mx-auto max-w-4xl px-6 pb-16 pt-14">
            <Link to="/veyra" className="inline-flex items-center gap-1.5 text-[13px] text-white/55 hover:text-white">
              <ArrowLeft size={14} /> Veyra
            </Link>
            <h1 className="mt-6 text-[38px] font-semibold leading-[1.05] tracking-[-0.035em] md:text-[56px]">
              We know what works.
              <br />
              We know what doesn&apos;t.
              <br />
              <span className="text-[#84d7b0]">And we can show you the evidence.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-[17px] leading-relaxed text-white/65">
              Veyra is the engineering intelligence field teams rely on to understand why a machine failed. That only
              works if it can be trusted, so every capability is tested against criteria fixed before the run, on real
              field data where we have it, and the misses ship with the wins.
            </p>
            <p className="mt-6 text-[12.5px] text-white/40">Updated 20 November 2026</p>
          </div>
        </header>

        <div className="container mx-auto max-w-4xl px-6 py-16">
          <section>
            <H2 id="summary">The short version</H2>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {[
                {
                  title: "What works",
                  tone: "border-[#84d7b0] bg-[#84d7b0]/[0.08]",
                  items: [
                    "On a real field failure from an autonomous vehicle: 16 seconds to surface the decisive SOC inconsistency, a full AI investigation in 7 minutes, and the check it put first is where the manufacturer found the cause.",
                    "System-level and physics methods never weakened the true cause: 0 of 120 sealed cases. Their evidence leads were right 12 of 12.",
                    "No false alarms on 120 healthy simulated vehicles; the true cause kept on the table in 178 of 178 flagged faults.",
                  ],
                },
                {
                  title: "What doesn't, yet",
                  tone: "border-border bg-[#f4f6f9]",
                  items: [
                    "On the field case, the logs alone could not separate three causes. The confirmation came from the manufacturer's charge history.",
                    "A chemistry-based prior is only as good as the base rate behind it: on an even mix of causes it was right 15 of 36 times. Veyra labels it a prior and puts the separating check first.",
                    "31 of 45 inverters drawing too much current go unseen: voltage alone cannot show them.",
                  ],
                },
                {
                  title: "The evidence",
                  tone: "border-border bg-white",
                  items: [
                    "Pass criteria are written down and frozen before each run.",
                    "Results we did not win are published next to the ones we did.",
                    "Raw outputs, keys and grades are open to pilot partners.",
                  ],
                },
              ].map((c) => (
                <div key={c.title} className={`rounded-2xl border p-6 ${c.tone}`}>
                  <h3 className="text-[16px] font-semibold text-foreground">{c.title}</h3>
                  <ul className="mt-4 space-y-3">
                    {c.items.map((x) => (
                      <li key={x} className="text-[14.5px] leading-relaxed text-muted-foreground">{x}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-20">
            <H2 id="field-case">A real field failure: does Veyra reach the decisive point, without seeing the machine?</H2>
            <P>
              An autonomous vehicle lost high voltage while parked and could not drive. Real data from the vehicle, not
              public, shared by the manufacturer and anonymised here. The manufacturer&apos;s own investigation took about
              two days across after-sales, on-site operations and engineering, including the battery supplier.
            </P>
            <h3 className="mt-8 text-[17px] font-semibold text-foreground">How we tested it</h3>
            <Bullets
              items={[
                "Only the vehicle's own BMS and VCU logs, from three time windows: 2.2 million recorded values. No visit to the vehicle, no supplier data, no chemistry, no manufacturer rules.",
                "Pass criteria were fixed before the first run on 16 November. The manufacturer shared its confirmed cause on 19 November.",
                "Veyra's agent ran the full investigation on its own, calling the engine's system-level and physics checks, and its run was recorded step by step.",
              ]}
            />
            <h3 className="mt-10 text-[17px] font-semibold text-foreground">The result, against what the manufacturer confirmed</h3>
            <Table
              mono={false}
              head={["Veyra found", "The manufacturer confirmed"]}
              rows={[
                ["The displayed charge fell 40 points while only 0.08 Ah flowed: an SOC correction, not a real discharge (16 seconds)", "An SOC estimation correction, not a real discharge"],
                ["First check: the charge and calibration history since the last full charge", "No full charge for a long time: SOC drift accumulated from small standby currents"],
                ["The weakest cell sets the timing of the trip, not the size of the shortfall", "Cell balance normal after a full charge"],
                ["Lost capacity still to be verified", "The full-charge test did not support it as the main cause"],
                ["High voltage allowed again after each reset, 5 times, while the hazard remained: a safety hold", "Reported for the manufacturer's own review"],
              ]}
            />
            <Table
              head={["", "Time"]}
              rows={[
                ["Veyra, to the decisive SOC inconsistency", "16 s"],
                ["Veyra, full AI investigation (33 engineering tool calls)", "7 min"],
                ["Veyra, every agent run on this case so far (20 runs)", "1.4 to 7.2 min"],
                ["The manufacturer's investigation, with its battery supplier", "about 2 days"],
              ]}
              emphasis={0}
            />
            <h3 className="mt-10 text-[17px] font-semibold text-foreground">What this does not prove yet</h3>
            <Bullets
              items={[
                "One case. Parts of the system-level and physics methods were refined on this case's data after the cause was known. The first run, before it was known, had already flagged the unexplained SOC drop, listed the re-closures and kept SOC estimation among three open causes.",
                "The logs alone could not separate SOC drift from low capacity and a current sensor reading low. Veyra said so; the separating evidence was the manufacturer's charge history.",
                "The two days include work Veyra does not do, such as talking to the supplier. The comparison is time to the decisive finding, not a measured saving.",
              ]}
            />
          </section>

          <section className="mt-20">
            <H2 id="methods">System-level and physics methods: do they add evidence without harming the answer?</H2>
            <P>
              The methods of experienced vehicle-systems and battery engineers, written down step by step and built into
              Veyra as checks: follow the control sequence through every reset, ask which signals are truly independent,
              check whether a load could bypass the current sensor, and weigh what each explanation would physically require.
            </P>
            <h3 className="mt-8 text-[17px] font-semibold text-foreground">How we tested it</h3>
            <Bullets
              items={[
                "60 sealed synthetic battery cases, 12 per cause, each in two conditions: with the chemistry declared, and without it. Engine only, no AI model.",
                "Criteria fixed and the code frozen before the run.",
              ]}
            />
            <Table
              mono={false}
              head={["Criterion", "Result"]}
              rows={[
                ["Record evidence never weakens the true cause", "0 of 120 case-conditions: pass"],
                ["Evidence leads are right (at least 90 %)", "12 of 12: pass"],
                ["No firm chemistry-based lead when the chemistry is not confirmed", "0 firm leads, 54 labelled conditional: pass"],
                ["The first check still separates the true cause", "60 of 60 in each condition: pass, with no gain (it already did)"],
              ]}
            />
            <h3 className="mt-10 text-[17px] font-semibold text-foreground">What it misses</h3>
            <Bullets
              items={[
                "With the chemistry declared, the chemistry-based prior led 36 times and was right 15: right on every SOC-drift case, wrong on every other cause it was given for. That is what a prior does on an even mix of causes. Veyra labels it as a prior, and the check that separates the causes always comes first.",
                "A load bypassing the current sensor was shown in 6 of 12 records. In the other 6 the record was too short, and Veyra abstained rather than guess. None were wrong.",
                "The cases are synthetic, so field accuracy is not measured here.",
              ]}
            />
          </section>

          <section className="mt-20">
            <H2 id="real-logs">Real failure logs: does Veyra get an engineer to the next action?</H2>
            <P>
              Robot failures from public issue threads that nobody building Veyra had seen, compared against the same AI
              model working on its own. No synthetic data.
            </P>
            <h3 className="mt-8 text-[17px] font-semibold text-foreground">How we tested it</h3>
            <Bullets
              items={[
                "A separate agent collected real logs pasted in public GitHub and forum threads and sealed the answer keys (the cause established later in the thread, or unresolved). The keys were hashed before any system ran. Every case the team had touched was excluded.",
                "Three conditions, with the same input (the log and the reporter's symptom, diagnosis removed) and the same output format: Veyra's rules without a model, Veyra with the AI, and the same AI model working alone on the raw log.",
                "A separate grader, blind to the condition, scored five criteria from 0 to 2 against the keys. A script checked every cited line and quote mechanically.",
                "Three of the eight held-out cases are unresolved upstream, to test whether Veyra admits what a log cannot show.",
              ]}
            />
            <h3 className="mt-10 text-[17px] font-semibold text-foreground">The result, on the 8 cases kept back for the final test</h3>
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
            <h3 className="mt-10 text-[17px] font-semibold text-foreground">What this does not prove yet</h3>
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
            <H2 id="physics">Electrical physics: are the numbers right, without false alarms?</H2>
            <P>
              Veyra computes electrical relations from a vehicle's voltages and currents. It keeps what is measured apart
              from what a model infers and from what no signal shows. This test asks whether those numbers and flags hold up
              against physics the checks do not assume.
            </P>
            <h3 className="mt-8 text-[17px] font-semibold text-foreground">How we tested it</h3>
            <Bullets
              items={[
                "An independent simulator generates battery-electric vehicles with richer physics than the checks assume: power-driven motor loads, a battery with temperature- and charge-dependent behaviour, sensor offsets and noise, and timing skew between controllers.",
                "Scenarios: healthy vehicles, uneven loads, connector and cable faults (including contacts that fail only under load), inverters drawing too much current, sensor errors, cold batteries, combined faults, missing signals and low load.",
                "Pass criteria were written down before the run. Thresholds were set on a separate development set and frozen. The 450 held-out vehicles were run once, and the true parameters were kept from the checks.",
              ]}
            />
            <h3 className="mt-10 text-[17px] font-semibold text-foreground">The result, against the bar we set before the run</h3>
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
            <h3 className="mt-10 text-[17px] font-semibold text-foreground">What it misses</h3>
            <Bullets
              items={[
                "Inverters drawing 1.5 to 2.2 times their share of current: 31 of 45 missed. A normal cable carrying double current adds only 2 to 5 mΩ of apparent resistance, inside the spread between healthy cables. Voltage alone cannot show it; per-wheel current or a vehicle's own history can.",
                "Contacts that fail only under load: 7 of 30 missed. In 6 cases the recommended depot check would read normal, so the recommendation carries a follow-up measurement under load.",
                "8.5 % of cases had a healthy wheel wrongly flagged with a sensor offset.",
              ]}
            />
            <h3 className="mt-10 text-[17px] font-semibold text-foreground">What this does not prove yet</h3>
            <Bullets
              items={[
                "The vehicles are simulated. The checks and the simulator share an author, so this shows the checks hold up against physics they do not assume, not that they work on a real fleet.",
                "The first real-vehicle case is above; more real cases are needed before any fleet-wide claim.",
              ]}
            />
          </section>

          <section className="mt-20 rounded-2xl bg-[#f4f6f9] p-8">
            <H2 id="claims">What we don&apos;t claim</H2>
            <Bullets
              items={[
                "That Veyra diagnoses better than a strong general model on short logs. On our test it did not.",
                "Any time or cost saving at a customer. The 16 seconds and 2 days above are time to the decisive finding on one case, not a measured saving; the pilot measures that against how your team works today.",
                "That the saved checks apply across a fleet. How widely they apply, and how often they raise a false alarm, is measured as they run on new records.",
                "A confirmed cause. Veyra's conclusions stay probable until a record with data moves them up: a reproduction recorded with its data, or the fix shown working in data recorded after it. An engineer's word alone is shown as reported.",
              ]}
            />
            <h3 className="mt-8 text-[17px] font-semibold text-foreground">What we are proving next</h3>
            <Bullets
              items={[
                "More real field cases, run before the cause is shared, with criteria fixed in advance.",
                "The saved checks on new records of the same kind: how widely they apply, and how often they raise a false alarm.",
                "Long and multi-file logs, measuring time to the decisive finding and whether the first check resolved the failure.",
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
