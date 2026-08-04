import { useParams, Link } from "react-router-dom";
import { useEffect } from "react";
import Layout from "@/components/Layout";
import { articles, blogSections, getArticleBySlug } from "@/data/articles";
import ReactMarkdown from "react-markdown";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

const SITE_URL = "https://www.silkenreason.com";
const DEFAULT_IMAGE = `${SITE_URL}/og-image-v2.png?v=veyra`;

const upsertMeta = (selector: string, createAttributes: Record<string, string>, content: string) => {
  let element = document.head.querySelector(selector) as HTMLMetaElement | null;

  if (!element) {
    element = document.createElement("meta");
    Object.entries(createAttributes).forEach(([key, value]) => element?.setAttribute(key, value));
    document.head.appendChild(element);
  }

  element.setAttribute("content", content);
};

const upsertCanonical = (href: string) => {
  let canonical = document.head.querySelector("link[rel='canonical']") as HTMLLinkElement | null;

  if (!canonical) {
    canonical = document.createElement("link");
    canonical.setAttribute("rel", "canonical");
    document.head.appendChild(canonical);
  }

  canonical.setAttribute("href", href);
};

const ArticlePage = () => {
  const { section, slug } = useParams<{ section: string; slug: string }>();
  const article = section && slug ? getArticleBySlug(section, slug) : undefined;
  const canonicalUrl = article ? `${SITE_URL}/blog/${article.section}/${article.slug}` : SITE_URL;
  const relatedArticles = article
    ? articles
        .filter((candidate) => candidate.slug !== article.slug)
        .sort((a, b) => {
          const sharedTagsA = a.tags.filter((tag) => article.tags.includes(tag)).length;
          const sharedTagsB = b.tags.filter((tag) => article.tags.includes(tag)).length;
          const sameSectionA = a.section === article.section ? 1 : 0;
          const sameSectionB = b.section === article.section ? 1 : 0;
          return sharedTagsB + sameSectionB - (sharedTagsA + sameSectionA);
        })
        .slice(0, 3)
    : [];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [section, slug]);

  useEffect(() => {
    if (!article) return;

    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: article.title,
      description: article.seoDescription,
      image: DEFAULT_IMAGE,
      author: {
        "@type": "Person",
        name: "Yue He",
        url: "https://www.linkedin.com/in/silkenreason",
      },
      publisher: {
        "@type": "Organization",
        name: "Silken Reason",
        logo: {
          "@type": "ImageObject",
          url: DEFAULT_IMAGE,
        },
      },
      datePublished: article.date,
      dateModified: article.date,
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": canonicalUrl,
      },
      keywords: article.tags.join(", "),
    };

    document.title = article.seoTitle;
    upsertMeta("meta[name='description']", { name: "description" }, article.seoDescription);
    upsertMeta("meta[property='og:title']", { property: "og:title" }, article.seoTitle);
    upsertMeta("meta[property='og:description']", { property: "og:description" }, article.seoDescription);
    upsertMeta("meta[property='og:url']", { property: "og:url" }, canonicalUrl);
    upsertMeta("meta[property='og:type']", { property: "og:type" }, "article");
    upsertMeta("meta[property='og:image']", { property: "og:image" }, DEFAULT_IMAGE);
    upsertMeta("meta[name='twitter:title']", { name: "twitter:title" }, article.seoTitle);
    upsertMeta("meta[name='twitter:description']", { name: "twitter:description" }, article.seoDescription);
    upsertCanonical(canonicalUrl);

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.dataset.pageSchema = "article";
    script.textContent = JSON.stringify(structuredData);
    document.head.appendChild(script);

    return () => {
      script.remove();
    };
  }, [article, canonicalUrl]);

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
            to={`/blog/${section}`}
            className="inline-flex items-center gap-2 font-mono text-xs text-muted-foreground hover:text-primary transition-colors mb-8 tracking-wider uppercase"
          >
            <ArrowLeft size={14} />
            {blogSections[section!]?.label || "Back"}
          </Link>

          <div className="flex items-center gap-3 mb-6">
            {article.tags.map((tag) => (
              <span key={tag} className="font-mono text-[10px] tracking-wider uppercase text-primary/70 border border-primary/20 rounded px-2 py-0.5">
                {tag}
              </span>
            ))}
          </div>

          <h1 className="font-editorial text-4xl md:text-5xl text-foreground leading-tight mb-8">{article.title}</h1>

          {article.disclaimer && (
            <p className="font-serif text-sm text-muted-foreground italic leading-relaxed mb-8 border-l-2 border-primary/30 pl-4">
              {article.disclaimer}
            </p>
          )}

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

          {relatedArticles.length > 0 && (
            <nav className="mt-16 border-t border-border pt-10" aria-label="Related articles">
              <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-muted-foreground mb-6">
                Continue Reading
              </p>
              <div className="grid gap-4">
                {relatedArticles.map((related) => (
                  <Link
                    key={related.slug}
                    to={`/blog/${related.section}/${related.slug}`}
                    className="block rounded-xl border border-border p-5 hover:border-foreground/40 transition-colors"
                  >
                    <p className="font-mono text-[10px] tracking-[0.16em] uppercase text-muted-foreground mb-2">
                      {blogSections[related.section]?.label || related.section}
                    </p>
                    <h2 className="font-serif text-xl text-foreground mb-2">{related.title}</h2>
                    <p className="font-mono text-xs text-muted-foreground leading-relaxed">{related.excerpt}</p>
                  </Link>
                ))}
              </div>
            </nav>
          )}
        </motion.div>
      </article>
    </Layout>
  );
};

export default ArticlePage;
