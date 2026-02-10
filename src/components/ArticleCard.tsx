import { Link } from "react-router-dom";
import { motion } from "framer-motion";

interface ArticleCardProps {
  title: string;
  date: string;
  excerpt: string;
  slug: string;
  section: string;
  tags?: string[];
  index?: number;
}

const ArticleCard = ({ title, date, excerpt, slug, section, tags, index = 0 }: ArticleCardProps) => {
  return (
    <Link to={`/${section}/${slug}`} className="block group">
      <motion.article
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.08, duration: 0.5 }}
        className="py-8 border-b border-border hover:border-primary/40 transition-colors duration-500"
      >
        <div className="flex items-baseline gap-4 mb-3">
          <span className="font-mono text-[10px] text-muted-foreground tabular-nums">{date}</span>
          {tags?.map((tag) => (
            <span key={tag} className="font-mono text-[9px] tracking-[0.2em] uppercase text-primary/60">
              {tag}
            </span>
          ))}
        </div>
        <h3 className="font-serif text-2xl md:text-3xl text-foreground group-hover:text-primary transition-colors duration-500 mb-3 leading-snug">
          {title}
        </h3>
        <p className="font-mono text-xs text-muted-foreground leading-relaxed max-w-2xl">
          {excerpt}
        </p>
      </motion.article>
    </Link>
  );
};

export default ArticleCard;
