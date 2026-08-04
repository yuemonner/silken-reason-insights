export interface Article {
  slug: string;
  title: string;
  date: string;
  section: string;
  tags: string[];
  excerpt: string;
  seoTitle: string;
  seoDescription: string;
  content: string;
  disclaimer?: string;
}

export const blogSections: Record<string, { label: string; slogan: string }> = {
  definitions: {
    label: "Definitions",
    slogan: "Clear language for Physical AI operations.",
  },
  operations: {
    label: "Operations",
    slogan: "How teams review incidents, changes and readiness.",
  },
  "physical-ai": {
    label: "Physical AI",
    slogan: "Why autonomous systems need operational evidence.",
  },
};

export const articles: Article[] = [
  {
    slug: "what-is-operational-readiness",
    title: "What Is Operational Readiness?",
    date: "2026-08-04",
    section: "definitions",
    tags: ["Operational Readiness", "Physical AI"],
    excerpt:
      "Operational readiness is the ability to decide whether a physical system is safe, reliable and prepared for its next real-world action.",
    seoTitle: "What Is Operational Readiness in Physical AI? | Veyra",
    seoDescription:
      "A practical definition of operational readiness for Physical AI, robotics and industrial systems, including evidence, workflows and readiness decisions.",
    content: `Operational readiness is the state in which a physical system is prepared to perform a defined action in a real operating environment.

For Physical AI, robotics, industrial IoT and connected equipment, operational readiness is not a static checklist. It is a decision made from machine history, telemetry, maintenance records, deployment changes, incident context, operator notes and environmental conditions.

A system can be technically online and still not be operationally ready.

A robot may have passed a lab test but still be unready for a warehouse shift. A crane monitoring service may show a green heartbeat while the deployment history contains an unresolved rollback. A solar asset may be producing energy while the payment record or maintenance trail is too thin for financing. In each case, the question is not only "is it running?" The question is "is it ready for what comes next?"

## Why Operational Readiness Matters

Operational decisions in the physical world carry cost.

When a software service fails, the rollback may be expensive but usually stays inside the cloud. When a physical system fails, the consequences can include downtime, field dispatch, safety review, damaged equipment, contract delays, warranty disputes or loss of customer trust.

That is why readiness is different from observability. Observability tells teams what a system is doing. Readiness tells teams whether the available evidence is strong enough to act.

Typical readiness decisions include:

- deploy a new model or software revision
- return a machine to service after an anomaly
- escalate an alarm to a human engineer
- dispatch a technician
- expand a pilot into production
- route more work to a robot fleet, compute node or machine supplier
- approve a limited financing, contract or operational allocation

These decisions are rarely made from one system. They require a reconstruction of what happened across multiple operational records.

## Operational Readiness vs System Health

System health asks whether a machine appears to be functioning.

Operational readiness asks whether the evidence supports a specific next action.

That distinction is important. A machine can be healthy but not ready for a wider deployment. A robot can complete a task but still need review because the environment changed. A fleet can have high uptime but still show unresolved incidents in one location, one model version or one subsystem.

Operational readiness is therefore contextual. It depends on the intended action, the environment, the recent changes and the tolerance for risk.

## What Evidence Supports Readiness?

A useful readiness review usually combines several kinds of evidence:

- runtime telemetry and logs
- deployment history
- software and model versions
- configuration changes
- maintenance records
- incident history
- operator interventions
- test results
- mission outcomes
- asset identity and provenance
- missing or unknown evidence

The missing evidence matters as much as the verified evidence. In high-cost operations, teams do not only need to know what is true. They need to know what is not yet known.

## The Operational Readiness Gap

Most teams already have the raw data. They have logs, dashboards, tickets, ROS bags, telemetry streams, deployment records, spreadsheets, maintenance notes and conversations.

The problem is that these records are fragmented. They live in different tools and are interpreted by different people. When a decision has to be made, the team rebuilds context manually.

This creates a readiness gap:

- the data exists
- the decision is urgent
- the evidence is scattered
- the historical context is hard to reconstruct
- the team relies on memory and senior judgment

That is the gap Veyra is built around.

## A Practical Definition

Operational readiness means:

The evidence available about a physical system is complete enough, recent enough and relevant enough to support the next operational decision.

This definition keeps the focus on action. Readiness is not a score for its own sake. It is not another dashboard. It is a structured answer to a concrete question:

What should we do next, and what evidence supports that choice?`,
  },
  {
    slug: "what-is-mission-readiness",
    title: "What Is Mission Readiness?",
    date: "2026-08-04",
    section: "definitions",
    tags: ["Mission Readiness", "Autonomous Systems"],
    excerpt:
      "Mission readiness is the ability to decide whether an autonomous system is prepared for a specific task, environment and level of responsibility.",
    seoTitle: "What Is Mission Readiness for Autonomous Systems? | Veyra",
    seoDescription:
      "Mission readiness explained for Physical AI, autonomous robotics, field operations and high-consequence deployment decisions.",
    content: `Mission readiness is the ability to determine whether a system is prepared to perform a specific mission under real operating conditions.

In Physical AI, autonomous robotics, defense technology, industrial automation and field operations, a mission is not just a task. It is a bounded operational commitment. A machine is being asked to act in a place, under constraints, with consequences.

Mission readiness asks a direct question:

Is this system ready for this mission, in this environment, with this level of responsibility?

## Mission Readiness Is Not Generic Reliability

Generic reliability describes how often a system works. Mission readiness describes whether the system is prepared for a particular operational context.

A robot may be reliable in a clean lab and unready for a warehouse aisle with reflective packaging, unusual pallet layouts and human traffic. A drone may pass a hardware check and still be unready for a mission if the weather, battery history, sensor calibration or operator handoff records are incomplete.

Mission readiness is situational. It depends on:

- the objective
- the environment
- the asset history
- the operator or autonomy mode
- the recent software changes
- the known failure patterns
- the evidence available before deployment

That is why mission readiness cannot be reduced to uptime.

## Why The Term Matters Now

Autonomous systems are moving from demonstrations into real operations. As this happens, the bottleneck shifts from showing that a system can perform once to proving that it is ready to perform repeatedly.

Physical AI companies face this problem during pilots, fleet expansion, customer deployments, robot return-to-service workflows and high-consequence field operations.

The important decision is often not "can the model do the task?" It is:

- should we deploy this version?
- should this unit return to service?
- should this fleet receive more work?
- should this robot operate without human supervision?
- should we expand the pilot?
- should we pause and inspect?

Each question is a readiness decision.

## Mission Readiness Requires Operational History

A readiness decision needs history. It needs to know not only the current state of the machine, but what changed before that state appeared.

Useful mission readiness evidence may include:

- previous mission outcomes
- anomalies and near misses
- operator interventions
- sensor quality
- maintenance actions
- deployment revisions
- environmental context
- model or configuration changes
- test coverage
- incident reviews
- unresolved unknowns

Without this history, teams rely on manual memory. That can work when a fleet is small. It breaks as fleets, teams and environments grow.

## Mission Readiness vs After-Action Review

After-action review explains what happened after a mission.

Mission readiness uses the learning from prior missions to decide what should happen before the next one.

The two are linked. A good after-action review should improve future readiness. If incident findings, operator notes, deployment changes and outcomes are not connected back into the readiness process, the same failures are likely to repeat.

## Mission Readiness In Physical AI

Physical AI adds a difficult layer: real-world variation.

Robots and intelligent machines interact with spaces, surfaces, weather, lighting, force, humans, supply chains and physical wear. Logs alone rarely explain whether the system is ready. The evidence has to include operational meaning.

For example:

- Was the anomaly caused by the environment, the operator, the model, the hardware or a recent deployment?
- Has this pattern happened before?
- Did a previous fix work?
- Are we missing inspection evidence?
- Is the next mission similar to prior successful missions or outside the known operating envelope?

These are not pure observability questions. They are readiness questions.

## A Practical Definition

Mission readiness means:

The operational evidence is strong enough to support sending a system into a defined mission with an acceptable level of risk.

For Veyra, mission readiness is one instance of a broader pattern: teams need decision-ready evidence before granting physical systems more responsibility.`,
  },
  {
    slug: "operational-history-vs-telemetry",
    title: "Operational History vs Telemetry",
    date: "2026-08-04",
    section: "operations",
    tags: ["Telemetry", "Operational History"],
    excerpt:
      "Telemetry shows signals. Operational history connects signals to deployments, maintenance, interventions, decisions and outcomes.",
    seoTitle: "Operational History vs Telemetry | Veyra",
    seoDescription:
      "Understand the difference between telemetry and operational history, and why Physical AI teams need both for readiness review and incident decisions.",
    content: `Telemetry and operational history are often treated as the same thing. They are not.

Telemetry is machine signal. Operational history is interpreted operational context.

Telemetry may tell a team that torque increased, latency spiked, a sensor dropped frames, a battery degraded, or a robot entered an unexpected state. Operational history explains what happened around that signal: what changed, who intervened, which deployment was active, what maintenance was performed, what decision was made and what happened afterward.

For Physical AI and industrial systems, this difference is important because decisions do not happen from signals alone.

## What Telemetry Does Well

Telemetry is essential. It gives teams visibility into the current and historical behavior of a system.

Typical telemetry includes:

- metrics
- logs
- traces
- sensor readings
- error events
- uptime
- latency
- battery state
- vibration
- temperature
- torque
- network connectivity

Telemetry helps answer questions like:

- is the system online?
- what signal changed?
- when did the anomaly start?
- which component reported an error?
- how often does this failure occur?

For cloud software, telemetry often gives enough context to debug a service. For physical systems, it is necessary but incomplete.

## What Operational History Adds

Operational history links telemetry to the surrounding reality.

It includes:

- deployment records
- software and model versions
- configuration changes
- operator handoffs
- maintenance actions
- field inspections
- mission outcomes
- incident reviews
- customer reports
- work orders
- payment or utilization records
- decisions and approvals

Operational history answers a different class of question:

- what changed before the anomaly?
- was this machine recently serviced?
- did the same pattern happen before?
- did the previous intervention work?
- is the machine ready to return to service?
- is the missing evidence important enough to block deployment?

This is the context teams need when the decision is expensive.

## Why Telemetry Alone Breaks Down

Telemetry is often stored in systems optimized for monitoring. Those systems are good at signal collection, visualization, alerting and debugging.

But operational decisions require a broader reconstruction.

An engineer may need to connect a telemetry spike to a code commit, a firmware change, a work order, a field technician note and a previous rollback. A fleet operations lead may need to decide whether a robot can return to service after an anomaly. A buyer may need to decide whether a supplier is worth deeper validation. A lender may need to understand whether a machine's revenue and operating history support limited financing.

In each case, telemetry is only one evidence source.

## The Problem Of Lost Context

Most organizations do not lose data. They lose context.

The logs still exist. The tickets still exist. The deployment records still exist. The maintenance notes still exist. But the relationships between them are often stored in people's heads.

This becomes costly when:

- the original engineer is unavailable
- the incident happened months ago
- the asset has changed configuration
- the same symptom has multiple causes
- the team has to justify a high-cost decision
- a customer or insurer asks what happened

Operational history is the discipline of preserving these relationships.

## How Veyra Uses Both

Veyra does not replace telemetry systems. It connects to them.

The goal is to turn fragmented records into decision-ready evidence. Telemetry provides signal. Operational history provides sequence, context, intervention and outcome.

Together they support readiness decisions such as:

- ready for deployment
- ready for limited test
- not ready
- missing evidence
- requires inspection
- escalate to human review

## Practical Definition

Telemetry is what the system emitted.

Operational history is what the organization can reconstruct and use.

Physical AI needs both, but the commercial value often appears when telemetry becomes evidence for a decision.`,
  },
  {
    slug: "why-observability-isnt-enough-for-physical-ai",
    title: "Why Observability Is Not Enough For Physical AI",
    date: "2026-08-04",
    section: "physical-ai",
    tags: ["Observability", "Physical AI"],
    excerpt:
      "Observability helps teams see what happened. Physical AI teams also need to decide what should happen next.",
    seoTitle: "Why Observability Is Not Enough for Physical AI | Veyra",
    seoDescription:
      "Why logs, metrics and traces are necessary but insufficient for Physical AI operations, robot incident review and deployment readiness.",
    content: `Observability is one of the most important disciplines in modern software. It gives teams logs, metrics, traces and visibility into running systems.

For Physical AI, observability remains necessary. But it is not enough.

The reason is simple: physical systems do not only fail in code. They fail across software, hardware, environment, human intervention, deployment history and operational process.

When a robot anomaly occurs, the team does not only need to inspect logs. It needs to decide what should happen next.

## The Difference Between Seeing And Deciding

Observability helps answer:

- what happened?
- when did it happen?
- which signal changed?
- which service or subsystem was involved?

Physical AI operations also need to answer:

- should the robot continue?
- should the fleet pause?
- should a technician be dispatched?
- should this model version be rolled back?
- should the system return to service?
- should the pilot expand?

These are operational decisions, not monitoring questions.

## Physical AI Has More Context Than Software

Cloud observability works inside a mostly digital environment. Physical AI operates in a mixed environment.

A warehouse robot may be affected by lighting, pallet shape, aisle congestion, floor condition, human behavior, camera calibration, battery state and recent software changes. A crane monitoring system may involve edge devices, cloud modules, network instability, maintenance history and site-specific operating patterns.

The question is rarely one signal in isolation. It is the relationship between signals, changes, interventions and outcomes.

## Why Logs Do Not Become Evidence Automatically

A log is a record. Evidence is a record connected to a decision.

A deployment log only becomes evidence when it is linked to the anomaly timeline. A maintenance record only becomes evidence when it explains what changed before or after the event. A test result only becomes evidence when it is relevant to the operating condition being reviewed.

Physical AI teams often have enough records. What they lack is a semantic execution layer that connects those records into a decision-ready form.

## The Missing Layer

A Physical AI team may already use:

- robot data tools
- telemetry systems
- cloud logs
- incident trackers
- deployment pipelines
- maintenance systems
- ERP or asset systems
- spreadsheets and field notes

Each tool is useful. None of them automatically reconstruct the operational story.

That story is what teams need when they ask:

- what changed?
- what evidence supports action?
- what evidence argues against action?
- what is missing?
- what similar events happened before?
- what is the next safe step?

## Why This Matters Commercially

Physical AI will not scale only because models improve. It will scale when organizations can trust the operational process around those models.

Enterprises need repeatable ways to review anomalies, approve changes, return systems to service and expand deployments. Those workflows require evidence that is structured, traceable and understandable across engineering, operations and management.

Observability shows the machine. Operational evidence supports the decision.

## Veyra's Position

Veyra is not trying to replace observability, fleet management or robotics data infrastructure.

It runs alongside existing systems as a read-only evidence layer. The purpose is to reconstruct operational history and create decision-ready evidence packs for high-cost workflows.

In practical terms, that means:

- connect existing records
- preserve operational context
- mark what is verified, missing or uncertain
- show relevant historical patterns
- support readiness review

The output is not another chart. The output is a better decision process.

## Practical Definition

Observability helps teams understand system behavior.

Operational evidence helps teams decide what to do with that understanding.

Physical AI needs both.`,
  },
  {
    slug: "robot-incident-review",
    title: "Robot Incident Review",
    date: "2026-08-04",
    section: "operations",
    tags: ["Incident Review", "Robotics"],
    excerpt:
      "A robot incident review connects anomaly data, interventions, environment, deployment history and outcomes into a repeatable learning process.",
    seoTitle: "Robot Incident Review: Workflow, Evidence and Checklist | Veyra",
    seoDescription:
      "A practical guide to robot incident review for anomaly timelines, operator interventions, return-to-service decisions and operational evidence.",
    content: `A robot incident review is the structured process of understanding what happened during a robot anomaly, what evidence supports that understanding and what should change before the robot or fleet returns to service.

It is similar to a software postmortem, but the physical world makes it more complex.

A robot incident can involve code, model behavior, hardware state, sensor quality, operator action, environment, maintenance history and customer workflow. If the review only looks at logs, it may miss the operational cause.

## What Counts As A Robot Incident?

A robot incident does not always mean a catastrophic failure.

It may include:

- unexpected stop
- failed mission
- safety intervention
- operator takeover
- collision or near miss
- navigation failure
- perception anomaly
- manipulation failure
- repeated task rejection
- degraded performance after deployment
- customer escalation

The important point is not severity alone. The important point is whether the incident changes the next decision.

Should the robot continue? Should it pause? Should it return to service? Should a deployment be rolled back? Should a technician inspect the unit? Should the same mission be attempted again?

## Why Robot Incident Review Is Hard

In software, many incidents can be reconstructed from logs, traces and deployment records.

In robotics and Physical AI, the incident may depend on context that is not stored in one place.

Teams may need:

- robot telemetry
- ROS bags or session data
- video or sensor data
- operator notes
- field technician comments
- maintenance records
- environment description
- model or firmware version
- deployment history
- customer workflow details

The raw records may exist, but the relationships between them are often missing.

## The Review Should Preserve Unknowns

A weak incident review tries to force a clean answer too early.

A strong review separates:

- verified evidence
- likely relationships
- missing evidence
- unknowns
- decisions made
- outcomes observed later

This matters because physical systems are messy. A team may know that a torque anomaly appeared after a deployment, but not yet know whether the deployment caused it. The review should correlate the events without pretending certainty.

## What A Good Robot Incident Review Includes

A practical robot incident review should capture:

- the decision under review
- the asset or fleet involved
- the mission or operational context
- the timeline of events
- the last validated state
- what changed before the incident
- interventions and handoffs
- evidence for continuing
- evidence against continuing
- missing evidence
- similar historical incidents
- next action
- outcome after action

This turns the review into operational memory. The value is not only in understanding one event. The value is in improving future readiness decisions.

## Incident Review And Return To Service

Many robot incidents end with a return-to-service decision.

That decision is high leverage. Returning too early can create repeated failures or safety risk. Waiting too long can create unnecessary downtime and customer frustration.

The review should therefore support a readiness classification:

- ready
- ready for limited test
- not ready
- requires inspection
- missing evidence

This is not about automating responsibility away from humans. It is about giving the responsible team better evidence.

## Why Veyra Cares About Incident Review

Veyra treats robot incident review as one of the first practical workflows for operational evidence.

The product does not need to control the robot. It can start read-only, connecting existing systems and reconstructing the evidence behind one decision.

That is powerful because many teams already have the data but still rely on manual reconstruction during review. The faster and more accurately a team can understand the operational story, the faster it can make a safe decision.

## Practical Definition

Robot incident review is the process of turning fragmented operational records into a reliable explanation of what happened and a clear readiness decision for what should happen next.`,
  },
  {
    slug: "what-happens-after-a-robot-anomaly",
    title: "What Happens After A Robot Anomaly?",
    date: "2026-08-04",
    section: "operations",
    tags: ["Robot Anomaly", "Readiness Review"],
    excerpt:
      "After a robot anomaly, the hard work is not only detecting the event. It is reconstructing context and deciding the next safe action.",
    seoTitle: "What Happens After a Robot Anomaly? | Veyra",
    seoDescription:
      "A step-by-step explanation of what teams need after a robot anomaly: timeline reconstruction, evidence review and readiness decisions.",
    content: `A robot anomaly is only the beginning of the operational workflow.

The visible event may be simple: a robot stops, a sensor drifts, a mission fails, a manipulation attempt misses, a navigation path becomes unsafe or a human operator takes over.

The hard question comes next:

What should the team do now?

## Step One: Detect The Anomaly

Most robotics teams already have some form of anomaly detection. The system may emit logs, warnings, metrics, alerts, ROS topics, camera events or fleet management signals.

Detection answers that something changed.

It does not explain whether the robot should continue, pause, roll back, dispatch a technician or return to service.

## Step Two: Reconstruct The Timeline

After an anomaly, teams usually need to reconstruct the sequence of events.

They may ask:

- when did the anomaly begin?
- what was the robot doing?
- which mission was active?
- what model or software version was running?
- what configuration changed recently?
- was there an operator intervention?
- did the environment change?
- were there similar prior events?

This timeline is often spread across multiple systems.

## Step Three: Connect Machine Signal To Operational Context

The signal alone is rarely enough.

A torque spike may mean mechanical wear, payload variation, poor calibration, a bad deployment or a normal environmental edge case. A navigation failure may reflect perception limits, map mismatch, lighting conditions, human traffic or a task that was never well defined.

The team needs context:

- asset history
- maintenance actions
- deployment records
- operator notes
- environmental conditions
- previous incidents
- known open issues

This is where operational history becomes more valuable than raw telemetry.

## Step Four: Separate Evidence From Assumption

A good anomaly review does not jump directly to cause.

It separates:

- what is verified
- what is correlated
- what is missing
- what is unknown
- what still requires inspection

This makes the decision process more trustworthy. Teams can act with appropriate caution instead of pretending they know more than they do.

## Step Five: Decide The Next Action

The most important output is an operational decision.

Possible next actions include:

- continue the mission
- pause the robot
- return to service
- run a limited test
- roll back a deployment
- inspect hardware
- dispatch field support
- escalate to engineering
- update a protocol
- collect more evidence

The correct decision depends on the evidence and the cost of being wrong.

## Step Six: Preserve The Outcome

Many teams perform a review, make a decision and then lose the context.

This is costly. The next time a similar anomaly occurs, the organization repeats the same reconstruction process.

The outcome should become part of operational memory:

- what action was taken?
- did it work?
- did the anomaly repeat?
- did the fix create a new issue?
- should the readiness rule change?

This is how teams improve over time.

## Why This Workflow Matters

The anomaly itself is not the whole problem. The expensive part is the decision chain after the anomaly.

If the evidence is scattered, teams spend time asking the same questions:

- who knows what changed?
- where is the relevant log?
- which ticket explains the deployment?
- did maintenance touch this component?
- what happened last time?

This creates operational latency. It slows return-to-service, creates unnecessary escalations and makes teams dependent on institutional memory.

## Veyra's View

Veyra is built around the post-anomaly decision workflow.

The first goal is not to replace robot monitoring or anomaly detection. The first goal is to reconstruct the evidence behind the next action.

In a practical workflow, Veyra creates a Decision Evidence Pack:

- decision under review
- last validated state
- what changed
- evidence for action
- evidence against action
- missing evidence
- similar history
- recommended readiness status

The human team still owns the decision. Veyra makes the evidence usable.

## Practical Definition

After a robot anomaly, the critical workflow is not only detection. It is evidence reconstruction, readiness review and decision support for the next operational action.`,
  },
  {
    slug: "runtime-history-explained",
    title: "Runtime History Explained",
    date: "2026-08-04",
    section: "definitions",
    tags: ["Runtime History", "Operational Evidence"],
    excerpt:
      "Runtime history is the record of what a system actually did while operating, connected to context, interventions and outcomes.",
    seoTitle: "Runtime History Explained for Autonomous Systems | Veyra",
    seoDescription:
      "Runtime history explained as the operational record of system behavior, context, interventions and outcomes for Physical AI and autonomous systems.",
    content: `Runtime history is the record of what a system actually did while it was running.

For software, runtime history may include logs, traces, errors, deployments and performance metrics. For Physical AI and intelligent industrial systems, runtime history also includes sensor behavior, mission outcomes, interventions, maintenance actions, environmental context and return-to-service decisions.

Runtime history is important because autonomous systems cannot be trusted only by identity, certification or design intent. Teams need to understand behavior over time.

## Runtime History Is Behavior, Not Promise

A machine identity tells you what a system claims to be.

Runtime history tells you what it has done.

That distinction matters when a system is receiving work, permission, budget or operational responsibility. A robot, compute node, industrial asset or autonomous agent becomes more useful when its past behavior can support future decisions.

## What Runtime History Includes

Runtime history can include:

- logs
- metrics
- traces
- telemetry
- mission records
- task outcomes
- failed attempts
- operator interventions
- software versions
- model versions
- configuration changes
- maintenance events
- environmental conditions
- incident outcomes
- payment or utilization records

The value comes from connecting these records rather than storing them separately.

## Runtime History vs Audit Trail

An audit trail records events for accountability.

Runtime history supports decisions.

The two overlap, but they are not identical. An audit trail may prove that an event occurred. Runtime history helps explain whether that event matters for readiness, reliability, routing, financing, permissioning or operational review.

For example, a deployment record is useful as an audit event. It becomes runtime history when it is connected to the machine behavior after deployment and the decision made by the team.

## Why Runtime History Matters For Physical AI

Physical AI systems operate in environments that change constantly.

A system's design may be strong, but deployment success depends on real operating history:

- did it complete real tasks?
- did it require frequent human takeover?
- did anomalies repeat?
- did maintenance resolve the issue?
- did the system generalize across environments?
- did the team approve wider deployment?

This is why runtime history becomes a foundation for operational readiness.

## Why Raw Logs Are Not Enough

Raw logs are not self-explaining.

A log may say that an error occurred. It may not say why the error mattered, whether it blocked a mission, whether a human intervened, whether the same issue happened before or whether the next deployment should be paused.

Runtime history becomes valuable when it is structured around decisions.

## Veyra's Interpretation

Veyra treats runtime history as the raw material for operational evidence.

The product connects fragmented records into an evidence layer that supports high-cost decisions. The goal is to answer:

- what happened?
- what changed?
- what evidence is verified?
- what evidence is missing?
- what similar events exist?
- what decision is under review?

This turns runtime history into decision-ready evidence.

## Practical Definition

Runtime history is the accumulated record of system behavior, context, interventions and outcomes during operation.

For autonomous systems, it is the memory that helps teams decide what level of responsibility the system is ready to receive next.`,
  },
];

export const getArticlesBySection = (section: string): Article[] => {
  return articles
    .filter((a) => a.section === section)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

export const getArticleBySlug = (section: string, slug: string): Article | undefined => {
  return articles.find((a) => a.section === section && a.slug === slug);
};
