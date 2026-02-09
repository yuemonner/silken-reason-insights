export interface Article {
  slug: string;
  title: string;
  date: string;
  section: string;
  tags: string[];
  excerpt: string;
  content: string;
}

export const articles: Article[] = [
  // THE LOGIC
  {
    slug: "depin-infrastructure-2026",
    title: "DePIN: The Infrastructure Layer No One Is Watching",
    date: "2026-02-05",
    section: "the-logic",
    tags: ["DePIN", "Web3"],
    excerpt: "While the market obsesses over token prices, a quiet revolution in decentralized physical infrastructure is reshaping how we think about connectivity.",
    content: `The convergence of IoT sensors, blockchain incentives, and edge computing is creating something unprecedented: infrastructure that builds itself.

## The Thesis

DePIN — Decentralized Physical Infrastructure Networks — represents the first credible bridge between crypto-economics and the physical world. Unlike DeFi protocols that exist entirely in software, DePIN projects require real hardware, real deployment, and real utility.

## Why Now?

Three forces are converging:

1. **Sensor costs have collapsed.** A LoRaWAN gateway that cost €500 in 2021 now costs under €80.
2. **Token incentive design has matured.** Projects like Helium's migration to Solana proved that incentive layers can be decoupled from infrastructure layers.
3. **Enterprise demand is real.** Logistics companies, smart cities, and agricultural firms need coverage that telcos refuse to build.

## The Opportunity

The global IoT connectivity market will exceed €200B by 2028. DePIN projects are positioned to capture the long tail — rural coverage, indoor logistics, environmental monitoring — where traditional infrastructure economics fail.

The algorithm of the future isn't just code. It's code married to copper, silicon, and geography.`
  },
  {
    slug: "web3-identity-european-lens",
    title: "Web3 Identity Through a European Lens",
    date: "2026-01-20",
    section: "the-logic",
    tags: ["Web3", "Identity"],
    excerpt: "European privacy frameworks are accidentally creating the perfect conditions for decentralized identity adoption.",
    content: `GDPR was designed to protect citizens from data exploitation. Its unintended consequence may be the acceleration of self-sovereign identity.

## The Regulatory Tailwind

The European Digital Identity Wallet regulation, set for full deployment by 2027, mandates that every EU citizen can access a digital identity wallet. This isn't blockchain-native, but the architecture is remarkably compatible.

## Where Decentralization Fits

The gap between government-issued credentials and the need for privacy-preserving verification creates a natural market for zero-knowledge proof systems. Projects building in this space — Polygon ID, Worldcoin's orb-free alternatives, and smaller European startups — are finding product-market fit not through speculation, but through compliance.

## The Investment Angle

Capital is flowing quietly. European VCs deployed over €800M into digital identity startups in 2025, with roughly 30% going to projects with blockchain components. The signal is clear: identity is infrastructure, and infrastructure attracts patient capital.`
  },
  {
    slug: "iot-edge-computing-convergence",
    title: "The Edge Computing Convergence No One Predicted",
    date: "2026-01-08",
    section: "the-logic",
    tags: ["IoT", "Edge"],
    excerpt: "Edge computing isn't replacing the cloud — it's creating an entirely new computational geography.",
    content: `The narrative has been binary for too long: cloud versus edge. The reality emerging in 2026 is far more nuanced and far more interesting.

## Beyond the Binary

Edge computing was supposed to be about latency. Process data closer to the source, reduce round-trip times, enable real-time applications. That narrative was correct but incomplete.

## The Real Revolution

What's actually happening is the emergence of computational geography — a world where data processing decisions are made based on regulatory jurisdiction, energy costs, and physical proximity simultaneously.

A sensor in a Munich factory might process safety-critical data locally, send aggregated analytics to a Frankfurt edge node for EU-compliant storage, and route anonymized patterns to a global model training pipeline.

## Implications

This isn't just a technical architecture shift. It's a business model revolution. Companies that understand computational geography will build defensible advantages that pure-cloud competitors cannot replicate.`
  },
  // THE SILK
  {
    slug: "zurich-hotel-review-baur-au-lac",
    title: "Baur au Lac: Where Old Money Meets New Silence",
    date: "2026-01-28",
    section: "the-silk",
    tags: ["Travel", "Luxury"],
    excerpt: "In a city that invented discretion, one hotel has perfected the art of invisible excellence.",
    content: `Zürich's Baur au Lac doesn't announce itself. There's no gilded signage visible from the street, no doorman in theatrical costume. You simply arrive, and the world reorganizes itself around your comfort.

## The Space

The hotel sits at the point where Bahnhofstrasse meets Lake Zürich — arguably the most valuable hundred meters of real estate in Europe. Yet the property feels removed from commerce, a private garden separating it from the city's financial pulse.

## The Details

What separates Baur au Lac from its competitors isn't what they add — it's what they've learned to subtract. No background music in the corridors. No branded amenities screaming for Instagram attention. The towels are simply the finest you've ever touched, without a monogram explaining why.

## The Verdict

This is hospitality for people who have stopped trying to prove anything. The room rate starts at CHF 850, and for that price, you buy something more valuable than luxury: you buy the absence of effort.`
  },
  {
    slug: "fragrance-niche-perfumery",
    title: "The Fragrance Spectrum: Beyond Commercial Perfumery",
    date: "2026-01-15",
    section: "the-silk",
    tags: ["Fragrance", "Aesthetics"],
    excerpt: "Niche perfumery isn't about smelling different. It's about understanding that scent is the most intimate form of architecture.",
    content: `Commercial perfumery is designed to be liked. Niche perfumery is designed to be understood. The distinction matters more than most people realize.

## The Architecture of Scent

A great fragrance operates like a building. The top notes are the facade — immediate, accessible, designed to create a first impression. The heart is the living space — where you spend your time, where character reveals itself. The base is the foundation — what remains when everything performative has evaporated.

## Three Worth Understanding

**Memo Paris — Italian Leather.** Not leather as a material, but leather as a memory. A Florentine workshop in September, sun-warmed hide and dust motes.

**Byredo — Bibliothèque.** The scent of a room, not a person. Old paper, violet, and the particular warmth of incandescent light on dark wood.

**Xerjoff — Naxos.** Sicilian honey, tobacco, and lavender. Excessive in theory, perfect in practice. The fragrance equivalent of a Caravaggio — technically masterful, emotionally overwhelming.

## The Investment

At €200-400 per bottle, niche fragrances seem expensive. But a 50ml bottle lasts 12-18 months of daily wear. The cost per day is less than a coffee. The return on confidence is incalculable.`
  },
  // THE ETHER
  {
    slug: "frequencies-and-focus",
    title: "Frequencies and Focus: A Personal Sound Architecture",
    date: "2026-02-01",
    section: "the-ether",
    tags: ["Music", "Meditation"],
    excerpt: "The sounds we choose to surround ourselves with are as deliberate as the spaces we inhabit.",
    content: `I've spent the last three years building a personal sound architecture — a deliberate curation of frequencies that support different modes of thinking and being.

## The Framework

Sound isn't ambient. It's structural. The right frequency at the right moment doesn't just accompany focus — it creates the conditions for it.

**432 Hz tuning** for creative work. The slightly flattened pitch creates a warmth that standard 440 Hz tuning lacks. Whether the claimed metaphysical benefits are real is irrelevant — the psychological effect is measurable.

**Binaural beats at 40 Hz** for analytical work. Gamma wave entrainment isn't pseudoscience — the research from MIT's Tsai Lab on gamma oscillations and cognitive function is peer-reviewed and compelling.

**Silence** for decision-making. The most underrated frequency is none at all.

## The Practice

Every morning begins with 20 minutes of 528 Hz sine waves. Not because of any claimed "DNA repair" properties, but because the consistency creates a Pavlovian trigger for entering a meditative state.

## The Paradox

The deeper you go into sound design, the more you appreciate silence. They're not opposites — they're complements. Like the space between notes that makes music possible.`
  },
  {
    slug: "code-and-contemplation",
    title: "Code and Contemplation: Finding Stillness in Systems",
    date: "2026-01-10",
    section: "the-ether",
    tags: ["Philosophy", "Code"],
    excerpt: "The meditative quality of programming isn't a bug — it's a feature of sustained, focused creation.",
    content: `There's a state that programmers know but rarely name. It arrives after roughly forty minutes of sustained focus — when the boundary between the thinker and the system dissolves, and code writes itself through you rather than by you.

## The Flow State as Practice

Csikszentmihalyi described flow as the optimal experience. For engineers, it's a daily practice — or at least, it can be. The conditions are remarkably similar to those described in contemplative traditions:

1. **Clear intention.** You know what you're building.
2. **Immediate feedback.** The compiler tells you truth.
3. **Challenge-skill balance.** The problem is hard enough to engage, not hard enough to overwhelm.

## The Monastery of the Terminal

A terminal window is a meditation cell. Black background, blinking cursor, infinite possibility constrained by syntax. There's something profoundly contemplative about reducing all of human expression to text on a screen.

## Integration

The engineers I admire most share a quality: they've integrated their technical practice with something deeper. Whether it's formal meditation, music, martial arts, or simply the discipline of daily walks — they've found the stillness that makes clarity possible.

This isn't productivity advice. It's an observation about the nature of sustained creative work: the best code comes from the quietest minds.`
  },
];

export const getArticlesBySection = (section: string): Article[] => {
  return articles.filter((a) => a.section === section);
};

export const getArticleBySlug = (section: string, slug: string): Article | undefined => {
  return articles.find((a) => a.section === section && a.slug === slug);
};
