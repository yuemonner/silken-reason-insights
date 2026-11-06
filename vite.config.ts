import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import fs from "fs";
import path from "path";

const SITE = "https://www.silkenreason.com";

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/* GitHub Pages serves a file for every path it knows and 404.html (with a 404 status) for the rest. The site is a
   single-page app, so without this every page but the home page answered 404 before the app redirected itself, and
   search engines saw neither the page nor its title. After the build, write <route>.html for each route: the same app,
   with that page's title, description and canonical URL, served with a 200 status. */
const staticRoutes = (): Plugin => ({
  name: "static-routes",
  apply: "build",
  closeBundle() {
    const dist = path.resolve(__dirname, "dist");
    const html = fs.readFileSync(path.join(dist, "index.html"), "utf8");
    const routes: { path: string; title: string; description?: string }[] = [
      { path: "/veyra", title: "Veyra | The AI field engineer for physical AI",
        description: "Veyra finds where a machine first left its expected behaviour, says what the data cannot show, and picks the cheapest check that settles the cause." },
      { path: "/veyra/evaluation", title: "Veyra evaluation and methodology | Silken Reason",
        description: "How Veyra is tested: sealed evaluations on real public failure logs and blind physics checks on simulated vehicles, with the misses and limits published." },
      { path: "/research", title: "Research | Silken Reason" },
      { path: "/conversations", title: "Conversations | Silken Reason" },
      { path: "/about", title: "About | Silken Reason" },
      { path: "/engineering", title: "Engineering | Silken Reason" },
      { path: "/contact", title: "Contact | Silken Reason" },
      { path: "/blog", title: "Blog | Silken Reason" },
    ];
    const src = fs.readFileSync(path.resolve(__dirname, "src/data/articles.ts"), "utf8");
    const sectionsBlock = src.slice(src.indexOf("blogSections"), src.indexOf("export const articles"));
    for (const m of sectionsBlock.matchAll(/"?([a-z-]+)"?:\s*\{\s*label:\s*"([^"]+)",\s*slogan:\s*"([^"]+)"/g)) {
      routes.push({ path: `/blog/${m[1]}`, title: `${m[2]} | Silken Reason blog`, description: m[3] });
    }
    for (const chunk of src.split(/\n\s*slug:\s*"/).slice(1)) {
      const slug = chunk.slice(0, chunk.indexOf('"'));
      const section = /section:\s*"([^"]+)"/.exec(chunk)?.[1];
      const title = /seoTitle:\s*"([^"]+)"/.exec(chunk)?.[1];
      const description = /seoDescription:\s*"([^"]+)"/.exec(chunk)?.[1];
      if (slug && section && title) routes.push({ path: `/blog/${section}/${slug}`, title, description });
    }
    for (const r of routes) {
      const url = SITE + r.path;
      let page = html
        .replace(/<title>[^<]*<\/title>/, `<title>${esc(r.title)}</title>`)
        .replace(/(<link rel="canonical" href=")[^"]*(")/, `$1${url}$2`)
        .replace(/(<meta property="og:url" content=")[^"]*(")/, `$1${url}$2`)
        .replace(/(<meta property="og:title" content=")[^"]*(")/, `$1${esc(r.title)}$2`)
        .replace(/(<meta name="twitter:title" content=")[^"]*(")/, `$1${esc(r.title)}$2`);
      if (r.description) {
        page = page
          .replace(/(<meta name="description" content=")[^"]*(")/, `$1${esc(r.description)}$2`)
          .replace(/(<meta property="og:description" content=")[^"]*(")/, `$1${esc(r.description)}$2`)
          .replace(/(<meta name="twitter:description" content=")[^"]*(")/, `$1${esc(r.description)}$2`);
      }
      const file = path.join(dist, `${r.path.slice(1)}.html`);
      fs.mkdirSync(path.dirname(file), { recursive: true });
      fs.writeFileSync(file, page);
    }
    console.log(`static-routes: wrote ${routes.length} pages`);
  },
});

// https://vitejs.dev/config/
export default defineConfig(() => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [react(), staticRoutes()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
