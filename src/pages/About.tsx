import Layout from "@/components/Layout";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const About = () => {
  return (
    <Layout>
      <section className="border-b border-border">
        <div className="container mx-auto max-w-6xl px-6 pb-20 pt-36">
          <p className="mb-5 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
            About
          </p>
          <h1 className="max-w-5xl text-5xl font-semibold leading-[0.98] tracking-tight text-foreground md:text-7xl">
            An independent lab for intelligence in real-world systems.
          </h1>
          <p className="mt-7 max-w-2xl text-xl leading-relaxed text-muted-foreground">
            Silken Reason studies how people, machines and organizations turn uncertain evidence into action in real-world systems.
          </p>
        </div>
      </section>

      <section className="border-b border-border">
        <div className="container mx-auto grid max-w-6xl gap-4 px-6 py-20 md:grid-cols-3">
          <article className="rounded-lg border border-border bg-background p-6">
            <p className="mb-16 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">Research</p>
            <h2 className="text-2xl font-semibold leading-tight tracking-tight text-foreground">
              Decision systems, operational intelligence and physical systems under uncertainty.
            </h2>
          </article>
          <article className="rounded-lg border border-border bg-background p-6">
            <p className="mb-16 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">Products</p>
            <h2 className="text-2xl font-semibold leading-tight tracking-tight text-foreground">
              Veyra is the first product from the lab, built around operational intelligence for Physical AI.
            </h2>
          </article>
          <article className="rounded-lg border border-border bg-background p-6">
            <p className="mb-16 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">Conversations</p>
            <h2 className="text-2xl font-semibold leading-tight tracking-tight text-foreground">
              Conversations with people working where intelligence, uncertainty and action meet.
            </h2>
          </article>
        </div>
      </section>

      <section>
        <div className="container mx-auto flex max-w-6xl flex-col gap-8 px-6 py-20 md:flex-row md:items-end md:justify-between">
          <p className="max-w-3xl text-2xl font-semibold leading-tight tracking-tight text-foreground md:text-4xl">
            The lab exists to make better sense of systems where human judgment, machine behavior and organizational action meet.
          </p>
          <Link
            to="/veyra"
            className="inline-flex w-fit items-center gap-1.5 rounded-full bg-foreground px-5 py-3 text-[13px] font-medium text-background transition-colors hover:bg-foreground/90"
          >
            Explore Veyra <ArrowRight size={14} />
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default About;
