// Silken Reason research program. Status lines must stay true: update them as the work moves.

export const researchQuestion =
  "How can an AI learn what to do next when it meets an unfamiliar physical system?";

export const researchQuestionPrecise =
  "Can an agent identify an unknown physical system or fault with fewer experiments than existing methods?";

export const mission =
  "We study how intelligent systems acquire useful knowledge about the physical world through deliberate experimentation, and carry that knowledge to unfamiliar machines and environments.";

export const programs = [
  {
    id: "001",
    name: "Active physical diagnosis",
    question: "How few experiments does it take to tell apart the possible causes of an unknown fault?",
    horizon: "Now",
    status: "Protocol in preparation",
    link: "Veyra's investigation product is its first application.",
  },
  {
    id: "002",
    name: "Active system identification",
    question: "How few experiments does it take to learn how an unfamiliar machine responds?",
    horizon: "Next",
    status: "Planned",
    link: "Connects to world models and robot control.",
  },
  {
    id: "003",
    name: "Cross-embodiment experiment transfer",
    question: "Can what one machine learned from its experiments reduce the experiments another machine needs?",
    horizon: "Long term",
    status: "Open question",
    link: "Where single-machine learning becomes physical intelligence.",
  },
];

export const hypothesis =
  "An agent that combines machine telemetry, causal hypotheses and cost-aware experiment selection can identify unknown physical faults with fewer experiments than general-purpose AI agents and classical diagnostic methods.";

export const hardParts = [
  {
    title: "Proposing hypotheses worth testing",
    body: "From incomplete telemetry, deciding which physical mechanisms deserve a place on the list at all.",
  },
  {
    title: "Predicting what an experiment will show",
    body: "If the agent's predictions of each outcome are unreliable, choosing experiments by expected information gain cannot help.",
  },
  {
    title: "Using the result",
    body: "Identifying a physical parameter and actually making a better next decision with it are different things.",
  },
];

export const method = [
  "Plant unknown control, sensor or actuator faults in simulation, with the true cause locked before any run.",
  "The agent reads the first observations and proposes hypotheses that can be told apart, with candidate tests.",
  "The next test is chosen by cost-aware information gain.",
  "The test runs, the observation goes back to the agent, and the loop repeats until the cause is established or shown to be unidentifiable.",
  "Compared fairly with fixed test sequences, classical active diagnosis, and a general AI agent with the same tools.",
];

export const measures = [
  { name: "Experiment cost", def: "Total cost of the tests run before the correct diagnosis" },
  { name: "Attribution accuracy", def: "How often the cause is identified correctly" },
  { name: "False certainty", def: "How often a cause is declared confirmed when it is wrong" },
  { name: "Transfer", def: "Performance on new faults and new machines" },
];

export const falsifiers = [
  "At equal accuracy, the agent's choice of experiments costs no less than classical active diagnosis.",
  "Its false-certainty rate is higher than the baselines'.",
  "The advantage disappears on faults or machines it has not seen.",
];
