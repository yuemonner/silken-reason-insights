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
      <section className="border-b border-border">
        <div className="container mx-auto max-w-6xl px-6 pb-20 pt-36">
          <p className="mb-5 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
            Research
          </p>
          <h1 className="max-w-4xl text-5xl font-semibold leading-[0.98] tracking-tight text-foreground md:text-7xl">
            Questions before products.
          </h1>
          <p className="mt-7 max-w-2xl text-xl leading-relaxed text-muted-foreground">
            Silken Reason studies how intelligence emerges, acts and adapts in real-world systems.
          </p>
        </div>
      </section>

      <section className="border-b border-border">
        <div className="container mx-auto max-w-6xl px-6 py-20">
          <div className="divide-y divide-border border-y border-border">
            {directions.map(([number, title, description]) => (
              <article key={number} className="grid gap-6 py-10 md:grid-cols-[120px_1fr]">
                <span className="font-mono text-sm text-primary">{number}</span>
                <div>
                  <h2 className="text-3xl font-semibold tracking-tight text-foreground md:text-5xl">
                    {title}
                  </h2>
                  <p className="mt-4 max-w-2xl text-[16px] leading-relaxed text-muted-foreground">
                    {description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Research;
