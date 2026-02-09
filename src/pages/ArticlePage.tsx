import { useParams, Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { getArticleBySlug } from "@/data/articles";
import ReactMarkdown from "react-markdown";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

const sectionNames: Record<string, string> = {
  "the-logic": "THE LOGIC",
  "the-silk": "THE SILK",
  "the-ether": "THE ETHER",
};

const ArticlePage = () => {
  const { section, slug } = useParams<{ section: string; slug: string }>();
  const article = section && slug ? getArticleBySlug(section, slug) : undefined;

  if (!article) {
    return (
      <Layout>
        <div className="container mx-auto px-6 py-20 text-center">
          <h1 className="font-serif text-4xl text-foreground mb-4">Article Not Found</h1>
          <Link to="/" className="font-mono text-sm text-primary">← Back home</Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <article className="container mx-auto px-6 py-20 max-w-3xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Link
            to={`/${section}`}
            className="inline-flex items-center gap-2 font-mono text-xs text-muted-foreground hover:text-primary transition-colors mb-8 tracking-wider uppercase"
          >
            <ArrowLeft size={14} />
            {sectionNames[section!] || "Back"}
          </Link>

          <div className="flex items-center gap-3 mb-6">
            <span className="font-mono text-xs text-muted-foreground">{article.date}</span>
            {article.tags.map((tag) => (
              <span key={tag} className="font-mono text-[10px] tracking-wider uppercase text-primary/70 border border-primary/20 rounded px-2 py-0.5">
                {tag}
              </span>
            ))}
          </div>

          <h1 className="font-serif text-4xl md:text-5xl text-foreground leading-tight mb-8">{article.title}</h1>

          <div className="prose-custom font-mono text-sm text-muted-foreground leading-relaxed space-y-4">
            <ReactMarkdown
              components={{
                h2: ({ children }) => (
                  <h2 className="font-serif text-2xl text-foreground mt-10 mb-4">{children}</h2>
                ),
                h3: ({ children }) => (
                  <h3 className="font-serif text-xl text-foreground mt-8 mb-3">{children}</h3>
                ),
                p: ({ children }) => (
                  <p className="font-mono text-sm text-muted-foreground leading-relaxed mb-4">{children}</p>
                ),
                strong: ({ children }) => (
                  <strong className="text-foreground font-medium">{children}</strong>
                ),
                ol: ({ children }) => (
                  <ol className="list-decimal list-inside space-y-2 ml-4">{children}</ol>
                ),
                ul: ({ children }) => (
                  <ul className="list-disc list-inside space-y-2 ml-4">{children}</ul>
                ),
                li: ({ children }) => (
                  <li className="font-mono text-sm text-muted-foreground">{children}</li>
                ),
              }}
            >
              {article.content}
            </ReactMarkdown>
          </div>
        </motion.div>
      </article>
    </Layout>
  );
};

export default ArticlePage;
