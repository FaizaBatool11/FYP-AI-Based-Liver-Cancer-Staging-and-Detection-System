export const dashboardStats = [
  {
    label: "Visits Today",
    value: "104",
    change: "+12%",
    trendLabel: "vs yesterday",
    accentClass: "text-blue-800",
    iconWrapClass: "bg-indigo-100",
    iconClass: "text-indigo-600",
    iconPath:
      "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
  },
  {
    label: "Processed Scans",
    value: "12",
    change: "+4",
    trendLabel: "completed this shift",
    accentClass: "text-purple-600",
    iconWrapClass: "bg-purple-100",
    iconClass: "text-purple-600",
    iconPath:
      "M15 10l4.553 2.276a1 1 0 010 1.448L15 16m0-6V8a4 4 0 10-8 0v2m8 0H7m0 0v4m0 0h8",
  },
  {
    label: "Pending Explanations",
    value: "3",
    change: "-2",
    trendLabel: "cleared from queue",
    accentClass: "text-blue-600",
    iconWrapClass: "bg-blue-100",
    iconClass: "text-blue-600",
    iconPath:
      "M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 100 20 10 10 0 000-20z",
  },
];

export const explainabilityFeatures = [
  {
    name: "AFP Level",
    value: 82,
    note: "Strongest biochemical influence in the current review set.",
  },
  {
    name: "Tumor Size",
    value: 67,
    note: "Consistently contributes to stage escalation decisions.",
  },
  {
    name: "ALT",
    value: 44,
    note: "Moderate clinical contribution across recent cases.",
  },
  {
    name: "Age",
    value: 32,
    note: "Secondary contextual signal in model interpretation.",
  },
];
