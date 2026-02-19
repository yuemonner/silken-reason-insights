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
    slug: "sotogrande-sovereign-resident",
    title: "Sotogrande: The Sovereign Resident's Algorithm",
    date: "2026-02-15",
    section: "the-silk",
    tags: ["Travel", "Lifestyle"],
    excerpt: "The Digital Nomad is dead. In its place, a new archetype is emerging — one that trades frantic movement for sovereign stillness in southern Spain.",
    content: `The light on the fourth hole at Real Club Valderrama has a specific viscosity. It feels heavy and permanent like molten gold. I am walking the fairway with a Swiss industrialist who recently relocated his entire family here. He is not retired. He is in the middle of closing a cross-border merger. But he is here on a Tuesday morning breathing in the scent of pine and saltwater. He looks like a man who has solved a complex equation.

"It is a question of algorithms," he tells me while adjusting his grip on a 7-iron. "I spent two years modeling the optimal base. I looked at tax residency and climate stability. There are no monsoons here to wash away the fiber-optic cables. There is no political volatility. It is geologically boring. And in 2026 boredom is the ultimate luxury."

This conversation marks a significant shift in the mood of the mobile elite. Three years ago the narrative was dominated by the Digital Nomad. It was a frenetic existence characterized by laptop stands in Bali cafes and a constant anxiety about visa runs. That era was defined by exploration but also by a profound hollowness.

## The Nomad Is Dead

We all witnessed the scene in Southeast Asia. It was filled with talented young professionals vibrating with cheap adrenaline. They were busy rebranding their insolvency as spiritual recalibration. We meditated not to find enlightenment but to distract ourselves from a lack of foundation. It was a life of projects rather than businesses. It was unemployment with a better view.

But the pendulum has swung. The Nomad is dead and the Sovereign Resident has taken their place.

## The Sotogrande Equation

Sotogrande offers the antidote to that transient anxiety. It is not a place for those running away from reality but for those constructing a better one. The infrastructure here is robust enough to run a global family office yet the lifestyle remains aggressively analogue. My golf partner explains that his children are enrolled at the prestigious Sotogrande International School. They learn calculus in the morning and play polo in the afternoon.

The geographic arbitrage is undeniable. Within a forty-minute radius one finds a microcosm of the perfect life. To the west the wind-swept beaches of Tarifa offer world-class kitesurfing. To the northeast the peaks of Sierra Nevada allow for skiing in the morning before returning to the coast for a late lunch. It is a region that encourages a high-performance metabolism fed by local produce that actually tastes of the earth rather than industrial supply chains.

## Discretion Over Display

Crucially this enclave values discretion over display. Unlike the flashier parts of the Costa del Sol Sotogrande operates on a code of quiet privacy. The hedges are high and the security is invisible. It is a community of people who have already won the game and no longer feel the need to broadcast the score.

As we finish the round the industrialist looks out over the Mediterranean. "I loved my time traveling," he admits. "It taught me what I didn't need. But you cannot build a legacy out of a suitcase."

He is right. The era of frantic movement is over. We are no longer looking for the next Wi-Fi password. We are looking for a chair that doesn't wobble and the sovereign liberty to stay exactly where we are.`
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
