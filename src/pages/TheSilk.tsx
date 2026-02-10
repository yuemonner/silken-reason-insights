import Layout from "@/components/Layout";
import SectionHeader from "@/components/SectionHeader";
import ArticleCard from "@/components/ArticleCard";
import { getArticlesBySection } from "@/data/articles";

const TheSilk = () => {
  const articles = getArticlesBySection("the-silk");

  return (
    <Layout>
      <section className="container mx-auto px-6 py-24 max-w-4xl">
        <SectionHeader title="THE SILK" slogan="The texture of a life well-lived." />
        <div>
          {articles.map((article, i) => (
            <ArticleCard
              key={article.slug}
              title={article.title}
              date={article.date}
              excerpt={article.excerpt}
              slug={article.slug}
              section="the-silk"
              tags={article.tags}
              index={i}
            />
          ))}
        </div>
      </section>
    </Layout>
  );
};

export default TheSilk;
