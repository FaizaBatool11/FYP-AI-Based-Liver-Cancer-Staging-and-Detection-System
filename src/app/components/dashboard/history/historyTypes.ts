export type PredictionResult = {
  predicted_class: string;
  confidence: number;
  risk_level?: string;
};

export type HistoryFormData = {
  name: string;
  email: string;
  contact: string;
  gender: string;
  age_at_index: string;
  bmi: string;
  tumor_nodul: string;
  hepatitis: string;
  afp: string;
  afp_group: string;
  alk: string;
  days_to_last_follow_up: string;
  metastasis: string;
  ct: File | null;
  mri: File | null;
};

export type RangeConfig = {
  min: number;
  max: number;
  unit: string;
  normal?: string;
};

export type Ranges = Record<string, RangeConfig>;
