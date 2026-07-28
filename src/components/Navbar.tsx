import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Menu, X, ArrowRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const navLinks = [
  { href: "/#platform", label: "Platform" },
  { href: "/#solutions", label: "Solutions" },
  { href: "/#why", label: "Why Veyra" },
  { href: "/#about", label: "About" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const renderLink = (href: string, label: string, onClick?: () => void) => {
    const isHash = href.includes("#");
    if (isHash) {
      return (
        <a
          key={href}
          href={href}
          onClick={onClick}
          className="text-[13px] text-muted-foreground hover:text-foreground transition-colors"
        >
          {label}
        </a>
      );
    }
    const active = location.pathname === href || (href !== "/" && location.pathname.startsWith(href));
    return (
      <Link
        key={href}
        to={href}
        onClick={onClick}
        className={`text-[13px] transition-colors ${active ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}
      >
        {label}
      </Link>
    );
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/60 bg-background/85 backdrop-blur-md">
      <div className="container mx-auto flex items-center justify-between h-16 px-6">
        <Link to="/" className="flex items-center gap-2 group">
          <span className="inline-block h-2.5 w-2.5 rounded-sm bg-foreground group-hover:bg-primary transition-colors" />
          <span className="text-[15px] font-semibold tracking-tight text-foreground">Veyra</span>
          <span className="ml-2 text-[11px] text-muted-foreground hidden sm:inline">by Silken Reason</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((l) => renderLink(l.href, l.label))}
        </div>

        <div className="hidden md:flex items-center">
          <Link
            to="/contact"
            className="inline-flex items-center gap-1.5 rounded-full bg-foreground text-background px-4 py-2 text-[12px] font-medium hover:bg-foreground/90 transition-colors"
          >
            Request Pilot
            <ArrowRight size={13} />
          </Link>
        </div>

        <button className="md:hidden text-foreground" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-border bg-background"
          >
            <div className="flex flex-col items-start gap-5 py-6 px-6">
              {navLinks.map((l) => renderLink(l.href, l.label, () => setOpen(false)))}
              <Link
                to="/contact"
                onClick={() => setOpen(false)}
                className="inline-flex items-center gap-1.5 rounded-full bg-foreground text-background px-4 py-2 text-[12px] font-medium"
              >
                Request Pilot <ArrowRight size={13} />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
