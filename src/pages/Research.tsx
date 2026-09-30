import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { ArrowRight } from "lucide-react";

const directions = [
  ["01", "Human-Machine Decision Systems", "How human judgment and machine cognition combine into one decision."],
  ["02", "Operational Intelligence", "How teams make decisions across complex physical systems under uncertainty."],
  ["03", "Cognitive Architectures", "How memory, prediction, dissent, risk and context combine into coherent decisions."],
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
            Silken Reason studies how people, machines and organizations turn uncertain evidence into action.
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

      <section>
        <div className="container mx-auto max-w-6xl px-6 py-20">
          <div className="rounded-3xl border border-border bg-surface/50 p-8 md:flex md:items-end md:justify-between md:gap-12">
            <div>
              <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                Commercial experiment
              </p>
              <h2 className="max-w-2xl text-3xl font-semibold leading-tight tracking-tight text-foreground md:text-5xl">
                Veyra grows from Operational Intelligence.
              </h2>
              <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-muted-foreground">
                It turns machine incidents into decision workflows that carry evidence, action and outcome forward.
              </p>
            </div>
            <Link
              to="/veyra"
              className="mt-8 inline-flex items-center gap-1.5 rounded-full bg-foreground px-5 py-3 text-[13px] font-medium text-background transition-colors hover:bg-foreground/90 md:mt-0"
            >
              Explore Veyra <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Research;
