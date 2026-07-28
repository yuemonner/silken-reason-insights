import Layout from "@/components/Layout";
import { Mail, Linkedin, ArrowRight } from "lucide-react";

const Contact = () => {
  return (
    <Layout>
      <section className="container mx-auto px-6 pt-32 pb-32 max-w-3xl">
        <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-muted-foreground mb-6">Contact</p>
        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-foreground leading-[1.05] mb-6">
          Talk to the team.
        </h1>
        <p className="text-lg text-muted-foreground leading-relaxed max-w-xl mb-14">
          Veyra is currently onboarding a small number of design partners across machine finance,
          industrial deployment and autonomous operations. If you operate high-value physical systems,
          we would like to hear from you.
        </p>

        <div className="grid sm:grid-cols-2 gap-4">
          <a
            href="mailto:hello@silkenreason.com"
            className="group flex items-start justify-between gap-4 rounded-2xl border border-border p-6 hover:border-foreground/40 transition-colors"
          >
            <div>
              <div className="flex items-center gap-2 text-[11px] font-mono tracking-[0.15em] uppercase text-muted-foreground mb-3">
                <Mail size={13} /> Email
              </div>
              <div className="text-[15px] text-foreground">hello@silkenreason.com</div>
            </div>
            <ArrowRight size={16} className="text-muted-foreground group-hover:text-foreground group-hover:translate-x-0.5 transition-all" />
          </a>

          <a
            href="https://www.linkedin.com/company/silken-reason"
            target="_blank"
            rel="noreferrer"
            className="group flex items-start justify-between gap-4 rounded-2xl border border-border p-6 hover:border-foreground/40 transition-colors"
          >
            <div>
              <div className="flex items-center gap-2 text-[11px] font-mono tracking-[0.15em] uppercase text-muted-foreground mb-3">
                <Linkedin size={13} /> LinkedIn
              </div>
              <div className="text-[15px] text-foreground">Silken Reason</div>
            </div>
            <ArrowRight size={16} className="text-muted-foreground group-hover:text-foreground group-hover:translate-x-0.5 transition-all" />
          </a>
        </div>

        <div className="mt-16 rounded-2xl bg-surface border border-border p-8">
          <p className="font-mono text-[11px] tracking-[0.15em] uppercase text-muted-foreground mb-3">Request Pilot</p>
          <p className="text-[15px] text-foreground leading-relaxed mb-4">
            Send a short note describing your operational systems, current data sources and the decision
            you struggle to justify today. We respond to every serious inquiry.
          </p>
          <a
            href="mailto:pilot@silkenreason.com?subject=Veyra%20Pilot%20Request"
            className="inline-flex items-center gap-1.5 rounded-full bg-foreground text-background px-5 py-2.5 text-[13px] font-medium hover:bg-foreground/90 transition-colors"
          >
            pilot@silkenreason.com <ArrowRight size={14} />
          </a>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;