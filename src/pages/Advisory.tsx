import Layout from "@/components/Layout";
import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import { useState } from "react";

const Advisory = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <Layout>
      <section className="container mx-auto px-6 py-20 min-h-[80vh] flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-xl"
        >
          <h1 className="font-serif text-5xl md:text-6xl tracking-wider gold-gradient mb-4">ADVISORY</h1>
          <p className="font-mono text-sm text-muted-foreground italic tracking-wide mb-12">
            Strategic insight, delivered with precision.
          </p>

          <div className="glass rounded-xl p-8 mb-8">
            <p className="font-mono text-sm text-muted-foreground leading-relaxed mb-6">
              Consulting, deep-dive reports, and technical advisory for organizations navigating the intersection of emerging technology, digital infrastructure, and strategic positioning.
            </p>

            <a
              href="mailto:hello@silkenreason.com"
              className="inline-flex items-center gap-2 font-mono text-sm text-primary hover:text-primary/80 transition-colors tracking-wider"
            >
              <Mail size={16} />
              GET IN TOUCH
            </a>
          </div>

          {/* Newsletter */}
          <div className="glass rounded-xl p-8">
            <h2 className="font-serif text-xl text-foreground mb-2">Newsletter</h2>
            <p className="font-mono text-xs text-muted-foreground mb-6">
              Occasional dispatches on technology, aesthetics, and capital flows.
            </p>

            {subscribed ? (
              <p className="font-mono text-sm text-primary">Thank you. You're in.</p>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-3 max-w-sm mx-auto">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="flex-1 bg-transparent border border-border rounded-md px-4 py-2 font-mono text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                />
                <button
                  type="submit"
                  className="bg-primary text-primary-foreground font-mono text-xs tracking-wider uppercase px-6 py-2 rounded-md hover:bg-primary/90 transition-colors"
                >
                  Subscribe
                </button>
              </form>
            )}
          </div>
        </motion.div>
      </section>
    </Layout>
  );
};

export default Advisory;
