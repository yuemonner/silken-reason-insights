import { useParams } from "react-router-dom";
import Layout from "@/components/Layout";
import SectionHeader from "@/components/SectionHeader";
import ArticleCard from "@/components/ArticleCard";
import { blogSections, getArticlesBySection } from "@/data/articles";

const BlogSection = () => {
  const { section = "definitions" } = useParams<{ section: string }>();
  const sectionMeta = blogSections[section];
  const articles = getArticlesBySection(section);

  return (
    <Layout>
      <section className="container mx-auto px-6 py-24 max-w-4xl">
        <SectionHeader
          title={sectionMeta?.label || "Articles"}
          slogan={sectionMeta?.slogan || "Operational evidence notes from Silken Reason."}
        />
        <div>
          {articles.map((article, i) => (
            <ArticleCard
              key={article.slug}
              title={article.title}
              date={article.date}
              excerpt={article.excerpt}
              slug={article.slug}
              section={article.section}
              tags={article.tags}
              index={i}
            />
          ))}
        </div>
      </section>
    </Layout>
  );
};

export default BlogSection;
