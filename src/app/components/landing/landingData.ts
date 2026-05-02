import {
  Activity,
  BrainCircuit,
  Clock3,
  LockKeyhole,
  Microscope,
  ScanSearch,
  ShieldCheck,
} from "lucide-react";

export const navItems = [
  { label: "Home", href: "#home" },
  { label: "Platform", href: "#platform" },
  { label: "Workflow", href: "#workflow" },
  { label: "Trust", href: "#trust" },
  { label: "Contact", href: "#contact" },
];

export const heroMetrics = [
  {
    value: "3",
    label: "Core sections reorganized",
    detail: "Cleaner flow from intro to contact.",
  },
  {
    value: "1",
    label: "Unified visual system",
    detail: "Consistent spacing, cards, and hierarchy.",
  },
  {
    value: "24/7",
    label: "Clinical-ready presence",
    detail: "A homepage that stays clear and credible.",
  },
];

export const featureCards = [
  {
    icon: ScanSearch,
    title: "Imaging Review",
    description:
      "Surface liver lesion patterns from CT and MRI scans with a cleaner diagnostic review experience.",
  },
  {
    icon: BrainCircuit,
    title: "Multimodal Intelligence",
    description:
      "Combine imaging signals, AFP levels, and patient context into one staging-oriented assessment flow.",
  },
  {
    icon: Microscope,
    title: "Explainable Results",
    description:
      "Present predictions with confidence cues and interpretable rationale that clinicians can inspect quickly.",
  },
];

export const workflowSteps = [
  {
    step: "01",
    title: "Collect Inputs",
    description:
      "Upload scans and clinical information through a guided intake that keeps the dataset organized.",
  },
  {
    step: "02",
    title: "Review AI Findings",
    description:
      "The system processes imaging and patient indicators, then returns a structured staging summary.",
  },
  {
    step: "03",
    title: "Support Decisions",
    description:
      "Use the generated evidence and visual output to support documentation and clinical discussion.",
  },
];

export const trustPoints = [
  {
    icon: ShieldCheck,
    title: "Privacy-first presentation",
    description:
      "Healthcare trust cues are foregrounded so the page reads like a medical product instead of generic marketing.",
  },
  {
    icon: Clock3,
    title: "Faster interpretation flow",
    description:
      "The content structure emphasizes quick understanding of what the platform does and why it matters.",
  },
  {
    icon: Activity,
    title: "Decision support framing",
    description:
      "Messaging stays focused on staging support and diagnostic assistance, not replacing clinical judgment.",
  },
  {
    icon: LockKeyhole,
    title: "Clinical credibility",
    description:
      "The redesign reserves space for security, explainability, and implementation confidence throughout the page.",
  },
];
