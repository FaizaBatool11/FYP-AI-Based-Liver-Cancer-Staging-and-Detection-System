import { HistoryFormData, Ranges } from "./historyTypes";

export const initialHistoryFormData: HistoryFormData = {
  name: "",
  email: "",
  contact: "",
  gender: "",
  age_at_index: "",
  bmi: "",
  tumor_nodul: "",
  hepatitis: "",
  afp: "",
  afp_group: "",
  alk: "",
  days_to_last_follow_up: "",
  metastasis: "",
  ct: null,
  mri: null,
};

export const historyRanges: Ranges = {
  age_at_index: { min: 18, max: 120, unit: "years" },
  bmi: { min: 10, max: 50, unit: "kg/m²", normal: "18.5-24.9" },
  tumor_nodul: { min: 0, max: 20, unit: "count" },
  afp: { min: 0, max: 100000, unit: "ng/mL", normal: "0-20" },
  alk: { min: 0, max: 1000, unit: "U/L", normal: "30-120" },
  days_to_last_follow_up: { min: 0, max: 10000, unit: "days" },
};

export const requiredHistoryFields = [
  "name",
  "email",
  "contact",
  "gender",
  "age_at_index",
  "bmi",
  "tumor_nodul",
  "hepatitis",
  "afp",
  "afp_group",
  "alk",
  "metastasis",
] as const;
