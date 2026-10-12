import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Clipboard, RotateCcw, Sparkles } from "lucide-react";
import Layout from "@/components/Layout";

const sampleIncident = `14:02 autonomy release 2.7 deployed to 12 machines.
14:11 EX03 entered safe-stop near loading zone B.
14:18 EX05 entered safe-stop near loading zone B.
14:26 EX08 entered safe-stop near loading zone B.
EX11 has autonomy 2.7 and localization L4, but is healthy in Zone C.
Operator opened review at 14:31.`;

const sampleChanges = `Autonomy 2.6 to 2.7 on all 12 machines.
Localization L3 to L4 on EX03, EX05, EX08 and EX11.
LiDAR firmware 5.2 to 5.3 on 10 machines.
Map M18 to M19.
Loading zone B missions updated this morning.`;

const sampleMachines = `machine,status,release,localization,zone,lidar
EX01,healthy,2.7,L3,A,5.3
EX02,healthy,2.7,L3,C,5.3
EX03,affected,2.7,L4,B,5.3
EX04,healthy,2.7,L3,B,5.2
EX05,affected,2.7,L4,B,5.3
EX06,healthy,2.7,L3,C,5.3
EX07,healthy,2.7,L3,A,5.3
EX08,affected,2.7,L4,B,5.3
EX09,healthy,2.7,L3,B,5.3
EX10,healthy,2.7,L3,C,5.3
EX11,healthy,2.7,L4,C,5.3
EX12,healthy,2.7,L3,A,5.2`;

type MachineRow = {
  machine: string;
  status: string;
  release: string;
  localization: string;
  zone: string;
  lidar: string;
};

type Explanation = {
  name: string;
  status: "Strong" | "Possible" | "Weak";
  supports: string;
  against: string;
  missing: string;
};

const parseMachineRows = (csv: string): MachineRow[] => {
  const rows = csv
    .trim()
    .split(/\n+/)
    .map((line) => line.split(",").map((cell) => cell.trim()));

  const body = rows[0]?.[0]?.toLowerCase() === "machine" ? rows.slice(1) : rows;

  return body
    .filter((row) => row.length >= 6)
    .map(([machine, status, release, localization, zone, lidar]) => ({
      machine,
      status,
      release,
      localization,
      zone,
      lidar,
    }));
};

const countBy = (rows: MachineRow[], key: keyof MachineRow) =>
  rows.reduce<Record<string, number>>((acc, row) => {
    const value = row[key] || "unknown";
    acc[value] = (acc[value] || 0) + 1;
    return acc;
  }, {});

const topValue = (rows: MachineRow[], key: keyof MachineRow) => {
  const entries = Object.entries(countBy(rows, key)).sort((a, b) => b[1] - a[1]);
  return entries[0]?.[0] || "unknown";
};

const statusClass = {
  Strong: "border-emerald-500/30 bg-emerald-500/[0.06] text-emerald-800",
  Possible: "border-blue-500/30 bg-blue-500/[0.06] text-blue-800",
  Weak: "border-slate-300 bg-white text-slate-700",
};

const TryFieldCase = () => {
  const [incident, setIncident] = useState(sampleIncident);
  const [changes, setChanges] = useState(sampleChanges);
  const [machines, setMachines] = useState(sampleMachines);
  const [ran, setRan] = useState(true);
  const [copied, setCopied] = useState(false);

  const analysis = useMemo(() => {
    const rows = parseMachineRows(machines);
    const affected = rows.filter((row) => /affected|fail|safe|unhealthy/i.test(row.status));
    const healthy = rows.filter((row) => !/affected|fail|safe|unhealthy/i.test(row.status));
    const affectedIds = affected.map((row) => row.machine);
    const healthyIds = healthy.map((row) => row.machine);
    const commonRelease = topValue(affected, "release");
    const commonLocalization = topValue(affected, "localization");
    const commonZone = topValue(affected, "zone");
    const commonLidar = topValue(affected, "lidar");
    const comparator = healthy.find(
      (row) => row.release === commonRelease && row.localization === commonLocalization
    );
    const zoneComparator = healthy.find(
      (row) => row.localization === commonLocalization && row.zone === commonZone
    );

    const releaseHealthyCount = healthy.filter((row) => row.release === commonRelease).length;
    const localizationHealthyCount = healthy.filter((row) => row.localization === commonLocalization).length;
    const zoneHealthyCount = healthy.filter((row) => row.zone === commonZone).length;
    const lidarHealthyCount = healthy.filter((row) => row.lidar === commonLidar).length;

    const explanations: Explanation[] = [
      {
        name: `Release ${commonRelease}`,
        status: releaseHealthyCount >= Math.max(3, healthy.length / 2) ? "Weak" : "Possible",
        supports: `${affected.length}/${affected.length || 1} affected machines share it.`,
        against: `${releaseHealthyCount}/${healthy.length || 1} healthy machines share it too.`,
        missing: "No useful next check from release alone.",
      },
      {
        name: `Localization ${commonLocalization}`,
        status: comparator ? "Possible" : "Strong",
        supports: `${affected.length}/${affected.length || 1} affected machines share it.`,
        against: comparator
          ? `${comparator.machine} also has ${commonLocalization} and is currently healthy.`
          : "No healthy comparator found yet.",
        missing: comparator
          ? `${comparator.machine} under the affected zone or task.`
          : "A healthy machine with the same localization profile.",
      },
      {
        name: `${commonLocalization} plus Zone ${commonZone}`,
        status: zoneComparator ? "Possible" : "Strong",
        supports: `${affected.length}/${affected.length || 1} affected machines share both.`,
        against: zoneComparator
          ? `${zoneComparator.machine} shares both and is healthy.`
          : "No healthy machine has yet been observed with both conditions.",
        missing: `A healthy ${commonLocalization} machine in Zone ${commonZone}.`,
      },
      {
        name: `LiDAR ${commonLidar}`,
        status: lidarHealthyCount >= Math.max(3, healthy.length / 2) ? "Weak" : "Possible",
        supports: `${affected.length}/${affected.length || 1} affected machines share it.`,
        against: `${lidarHealthyCount}/${healthy.length || 1} healthy machines share it too.`,
        missing: "No useful next check.",
      },
    ];

    const strongest = explanations.find((item) => item.status === "Strong") || explanations[1];
    const nextCheck = comparator
      ? `Observe ${comparator.machine} in Zone ${commonZone}`
      : `Find one healthy ${commonLocalization} machine in Zone ${commonZone}`;
    const nextWhy = comparator
      ? `It separates ${commonLocalization} alone from ${commonLocalization} plus Zone ${commonZone} without changing a production machine.`
      : `It tests whether the strongest remaining explanation also appears in a healthy comparator.`;

    return {
      rows,
      affected,
      healthy,
      affectedIds,
      healthyIds,
      commonRelease,
      commonLocalization,
      commonZone,
      commonLidar,
      comparator,
      releaseHealthyCount,
      localizationHealthyCount,
      zoneHealthyCount,
      lidarHealthyCount,
      explanations,
      strongest,
      nextCheck,
      nextWhy,
      facts: [
        `${rows.length || 0} machines in the case.`,
        `${affected.length || 0} affected machines: ${affectedIds.join(", ") || "none detected"}.`,
        `${healthy.length || 0} healthy machines available for comparison.`,
        `Release ${commonRelease} appears on affected machines and ${releaseHealthyCount} healthy machines.`,
        comparator
          ? `${comparator.machine} is a useful comparator because it shares ${commonLocalization} but remains healthy.`
          : `No healthy ${commonLocalization} comparator was found in the table.`,
      ],
    };
  }, [machines]);

  const investigationSummary = [
    "Veyra field case draft",
    "",
    "Confirmed facts",
    ...analysis.facts.map((fact) => `- ${fact}`),
    "",
    "Strongest current explanation",
    `- ${analysis.strongest.name}`,
    "",
    "Next useful check",
    `- ${analysis.nextCheck}`,
    `- Why: ${analysis.nextWhy}`,
  ].join("\n");

  const loadSample = () => {
    setIncident(sampleIncident);
    setChanges(sampleChanges);
    setMachines(sampleMachines);
    setRan(true);
    setCopied(false);
  };

  const copySummary = async () => {
    await navigator.clipboard.writeText(investigationSummary);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };

  return (
    <Layout>
      <section className="border-b border-[#c8d5e8] bg-[#07111f] text-white">
        <div className="container mx-auto max-w-6xl px-6 py-12">
          <Link
            to="/veyra"
            className="mb-8 inline-flex items-center gap-2 text-[13px] text-blue-100/70 transition-colors hover:text-white"
          >
            <ArrowLeft size={14} />
            Back to Veyra
          </Link>

          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_330px] lg:items-end">
            <div>
              <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.22em] text-blue-200/70">
                Try one field case
              </p>
              <h1 className="max-w-4xl text-4xl font-semibold leading-[1.03] tracking-tight md:text-6xl">
                Upload one incident.
                <span className="block text-blue-300">Get a structured investigation.</span>
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-blue-50/70 md:text-lg">
                Paste a short incident note, change log and machine table. Veyra
                turns them into confirmed facts, possible explanations and the
                next useful check.
              </p>
            </div>

            <div className="rounded-lg border border-blue-300/20 bg-white/[0.04] p-5">
              <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-blue-200/70">
                Data handling
              </div>
              <p className="mt-3 text-[13px] leading-relaxed text-blue-50/70">
                This demo runs in your browser. Do not paste sensitive logs. Use
                the sample case or a simplified historical incident.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#f8fbff]">
        <div className="container mx-auto grid max-w-7xl gap-5 px-6 py-8 lg:grid-cols-[390px_minmax(0,1fr)]">
          <aside className="space-y-4">
            <div className="rounded-lg border border-[#c8d5e8] bg-white p-4 shadow-sm">
              <div className="mb-3 flex items-center justify-between gap-3">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                    Input
                  </p>
                  <h2 className="mt-1 text-[18px] font-semibold tracking-tight">
                    Field case material
                  </h2>
                </div>
                <button
                  onClick={loadSample}
                  className="inline-flex items-center gap-1.5 rounded-md border border-[#c8d5e8] px-3 py-2 text-[12px] font-medium text-muted-foreground transition-colors hover:bg-[#f8fbff] hover:text-foreground"
                >
                  <RotateCcw size={13} />
                  Sample
                </button>
              </div>

              <label className="block">
                <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                  Incident note
                </span>
                <textarea
                  value={incident}
                  onChange={(event) => setIncident(event.target.value)}
                  className="mt-2 h-40 w-full resize-none rounded-md border border-[#c8d5e8] bg-[#fbfdff] p-3 text-[12px] leading-relaxed outline-none transition-colors focus:border-blue-400"
                />
              </label>

              <label className="mt-4 block">
                <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                  Change log
                </span>
                <textarea
                  value={changes}
                  onChange={(event) => setChanges(event.target.value)}
                  className="mt-2 h-32 w-full resize-none rounded-md border border-[#c8d5e8] bg-[#fbfdff] p-3 text-[12px] leading-relaxed outline-none transition-colors focus:border-blue-400"
                />
              </label>

              <label className="mt-4 block">
                <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                  Machine table
                </span>
                <textarea
                  value={machines}
                  onChange={(event) => setMachines(event.target.value)}
                  className="mt-2 h-48 w-full resize-none rounded-md border border-[#c8d5e8] bg-[#fbfdff] p-3 font-mono text-[11px] leading-relaxed outline-none transition-colors focus:border-blue-400"
                />
              </label>

              <button
                onClick={() => setRan(true)}
                className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-md bg-[#0f172a] px-4 py-3 text-[13px] font-semibold text-white transition-colors hover:bg-[#17233a]"
              >
                <Sparkles size={14} />
                Generate investigation
              </button>
            </div>
          </aside>

          <main className="min-w-0 space-y-5">
            <div className="rounded-lg border border-[#c8d5e8] bg-white p-5 shadow-sm">
              <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                    Veyra output
                  </p>
                  <h2 className="mt-1 text-[24px] font-semibold tracking-tight">
                    Structured investigation
                  </h2>
                </div>
                <button
                  onClick={copySummary}
                  className="inline-flex items-center gap-1.5 rounded-md border border-[#c8d5e8] px-3 py-2 text-[12px] font-medium text-muted-foreground transition-colors hover:bg-[#f8fbff] hover:text-foreground"
                >
                  <Clipboard size={13} />
                  {copied ? "Copied" : "Copy summary"}
                </button>
              </div>

              {!ran ? (
                <div className="rounded-lg border border-dashed border-[#c8d5e8] bg-[#f8fbff] p-8 text-center text-[14px] text-muted-foreground">
                  Add a case or load the sample, then generate an investigation.
                </div>
              ) : (
                <div className="grid gap-4 xl:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
                  <section className="rounded-lg border border-[#c8d5e8] bg-[#fbfdff] p-4">
                    <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                      Confirmed facts
                    </div>
                    <div className="mt-4 space-y-3">
                      {analysis.facts.map((fact) => (
                        <div key={fact} className="rounded-md border border-[#d8e2f1] bg-white px-3 py-2 text-[13px] leading-relaxed">
                          {fact}
                        </div>
                      ))}
                    </div>
                  </section>

                  <section className="rounded-lg border border-[#c8d5e8] bg-[#fbfdff] p-4">
                    <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                      Possible explanations
                    </div>
                    <div className="mt-4 grid gap-3 sm:grid-cols-2">
                      {analysis.explanations.map((item) => (
                        <article key={item.name} className="rounded-md border border-[#d8e2f1] bg-white p-3">
                          <div className="flex items-start justify-between gap-2">
                            <h3 className="text-[14px] font-semibold leading-snug">{item.name}</h3>
                            <span className={`shrink-0 rounded-full border px-2 py-0.5 text-[10px] font-medium ${statusClass[item.status]}`}>
                              {item.status}
                            </span>
                          </div>
                          <dl className="mt-3 space-y-2 text-[12px] leading-relaxed">
                            <div>
                              <dt className="font-mono text-[9px] uppercase tracking-[0.12em] text-muted-foreground">Supports</dt>
                              <dd className="mt-0.5 text-foreground">{item.supports}</dd>
                            </div>
                            <div>
                              <dt className="font-mono text-[9px] uppercase tracking-[0.12em] text-muted-foreground">Against</dt>
                              <dd className="mt-0.5 text-foreground">{item.against}</dd>
                            </div>
                            <div>
                              <dt className="font-mono text-[9px] uppercase tracking-[0.12em] text-muted-foreground">Missing</dt>
                              <dd className="mt-0.5 text-foreground">{item.missing}</dd>
                            </div>
                          </dl>
                        </article>
                      ))}
                    </div>
                  </section>
                </div>
              )}
            </div>

            {ran && (
              <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_330px]">
                <section className="rounded-lg border border-blue-500/25 bg-blue-500/[0.045] p-5 shadow-sm">
                  <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-blue-800/70">
                    Next useful check
                  </div>
                  <h2 className="mt-2 text-[26px] font-semibold tracking-tight text-foreground">
                    {analysis.nextCheck}
                  </h2>
                  <p className="mt-4 max-w-2xl text-[14px] leading-relaxed text-muted-foreground">
                    {analysis.nextWhy}
                  </p>
                  <div className="mt-5 grid gap-3 sm:grid-cols-3">
                    {[
                      ["Cost", "Low"],
                      ["Time", "About 15 min"],
                      ["Risk", "Low"],
                    ].map(([label, value]) => (
                      <div key={label} className="rounded-md border border-blue-500/20 bg-white/70 p-3">
                        <div className="font-mono text-[9px] uppercase tracking-[0.14em] text-muted-foreground">
                          {label}
                        </div>
                        <div className="mt-1 text-[14px] font-semibold">{value}</div>
                      </div>
                    ))}
                  </div>
                </section>

                <section className="rounded-lg border border-[#c8d5e8] bg-white p-5 shadow-sm">
                  <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                    Ask the team
                  </div>
                  <ul className="mt-4 space-y-3 text-[13px] leading-relaxed text-foreground">
                    <li>Was {analysis.comparator?.machine || "the comparator"} ever routed through Zone {analysis.commonZone}?</li>
                    <li>Did safe-stop coincide with localization confidence dropping?</li>
                    <li>Was any intervention tried, and did recovery persist?</li>
                  </ul>
                </section>
              </div>
            )}

            <div className="rounded-lg border border-[#c8d5e8] bg-white p-5 text-[13px] leading-relaxed text-muted-foreground shadow-sm">
              <span className="font-semibold text-foreground">Boundary:</span> this
              is a structured starting point. It does not prove root cause. It
              shows what is known, what is still open, and what evidence would
              help next.
            </div>
          </main>
        </div>
      </section>
    </Layout>
  );
};

export default TryFieldCase;
