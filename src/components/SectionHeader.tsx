import { motion } from "framer-motion";
import { ReactNode } from "react";

interface SectionHeaderProps {
  title: string;
  slogan: string;
  children?: ReactNode;
}

const SectionHeader = ({ title, slogan, children }: SectionHeaderProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="mb-20"
    >
      <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-6">
        {slogan}
      </p>
      <h1 className="font-serif text-6xl md:text-8xl tracking-wide text-foreground leading-[0.9]">
        {title}
      </h1>
      <div className="divider w-16 mt-8" />
      {children}
    </motion.div>
  );
};

export default SectionHeader;
