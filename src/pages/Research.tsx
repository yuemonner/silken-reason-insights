import Layout from "@/components/Layout";

const directions = [
  ["01", "Distributed Intelligence", "How human judgment, machine perception and organizational routines act as one system."],
  ["02", "Decision Systems", "How action forms when evidence is incomplete and responsibility is shared."],
  ["03", "Physical Intelligence", "How robots, embodied systems and machine fleets meet the real world."],
  ["04", "Memory & Adaptation", "How prior outcomes become usable context for the next decision."],
];

const Research = () => {
  return (
    <Layout>
      <section className="border-b border-border bg-[#fbfbf8]">
        <div className="container mx-auto max-w-6xl px-6 pb-20 pt-36">
          <p className="mb-5 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
            Research
          </p>
          <h1 className="max-w-4xl text-5xl font-semibold leading-[0.98] tracking-tight text-[#053f31] md:text-7xl">
            Questions before products.
          </h1>
          <p className="mt-7 max-w-2xl text-xl leading-relaxed text-muted-foreground">
            Silken Reason studies how intelligence emerges, acts and adapts in real-world systems.
          </p>
        </div>
      </section>

      <section className="border-b border-border bg-background">
        <div className="container mx-auto max-w-6xl px-6 py-24">
          <div className="border-y border-border">
            {directions.map(([number, title, description]) => (
              <article key={number} className="grid gap-8 border-b border-border py-12 last:border-b-0 md:grid-cols-[120px_minmax(0,1fr)_280px] md:items-start">
                <span className="font-mono text-sm text-[#0b6b55]">{number}</span>
                <div className="max-w-2xl">
                  <h2 className="text-3xl font-semibold tracking-tight text-[#053f31] md:text-5xl">
                    {title}
                  </h2>
                  <p className="mt-4 max-w-2xl text-[16px] leading-relaxed text-muted-foreground">
                    {description}
                  </p>
                </div>
                <p className="font-mono text-[11px] uppercase leading-relaxed tracking-[0.18em] text-muted-foreground">
                  Research area
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Research;
