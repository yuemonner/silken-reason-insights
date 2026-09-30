import Layout from "@/components/Layout";

const Conversations = () => {
  return (
    <Layout>
      <section className="border-b border-border">
        <div className="container mx-auto max-w-6xl px-6 pb-20 pt-36">
          <p className="mb-5 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
            Conversations
          </p>
          <h1 className="max-w-5xl text-5xl font-semibold leading-[0.98] tracking-tight text-foreground md:text-7xl">
            How people and machines make sense of uncertain worlds.
          </h1>
          <p className="mt-7 max-w-2xl text-xl leading-relaxed text-muted-foreground">
            A future home for interviews, field notes and conversations with builders working on robots, autonomy, cognition and operational systems.
          </p>
        </div>
      </section>

      <section className="border-b border-border">
        <div className="container mx-auto grid max-w-6xl gap-4 px-6 py-20 md:grid-cols-3">
          <article className="rounded-2xl border border-border bg-background p-6">
            <p className="mb-16 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">Format</p>
            <h2 className="text-2xl font-semibold leading-tight tracking-tight text-foreground">
              Interviews with builders, researchers and operators.
            </h2>
          </article>
          <article className="rounded-2xl border border-border bg-background p-6">
            <p className="mb-16 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">Theme</p>
            <h2 className="text-2xl font-semibold leading-tight tracking-tight text-foreground">
              How intelligence becomes action in real environments.
            </h2>
          </article>
          <article className="rounded-2xl border border-border bg-background p-6">
            <p className="mb-16 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">Status</p>
            <h2 className="text-2xl font-semibold leading-tight tracking-tight text-foreground">
              Coming soon.
            </h2>
          </article>
        </div>
      </section>

      <section>
        <div className="container mx-auto max-w-6xl px-6 py-20">
          <p className="mb-5 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
            First thread
          </p>
          <p className="max-w-3xl text-2xl font-semibold leading-tight tracking-tight text-foreground md:text-4xl">
            Physical AI is leaving the lab. The interesting question is no longer only what machines can do, but how teams understand, trust, correct and remember their actions.
          </p>
        </div>
      </section>
    </Layout>
  );
};

export default Conversations;
