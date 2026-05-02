import { HistoryFormData, PredictionResult, Ranges } from "./historyTypes";

export function validateHistoryField(
  name: string,
  value: string,
  ranges: Ranges
) {
  if (!value && name !== "ct" && name !== "mri" && name !== "days_to_last_follow_up") {
    return "This field is required";
  }

  if (name === "email" && value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      return "Please enter a valid email address";
    }
  }

  if (name === "contact" && value) {
    const contactRegex = /^[0-9+\-\s()]{10,}$/;
    if (!contactRegex.test(value)) {
      return "Please enter a valid contact number";
    }
  }

  const numValue = parseFloat(value);
  const range = ranges[name];
  if (range && !Number.isNaN(numValue)) {
    if (numValue < range.min || numValue > range.max) {
      return `Value must be between ${range.min} and ${range.max}`;
    }
  }

  return "";
}

export function calculateHistoryProgress(data: HistoryFormData) {
  const fields = Object.keys(data) as Array<keyof HistoryFormData>;
  const filled = fields.filter((key) => {
    const value = data[key];
    return value !== "" && value !== null;
  }).length;

  return Math.round((filled / fields.length) * 100);
}

export function exportHistoryResults(
  data: HistoryFormData,
  result: PredictionResult | null
) {
  const exportData = {
    patient_data: data,
    prediction_result: result,
    date: new Date().toISOString(),
  };

  const blob = new Blob([JSON.stringify(exportData, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = `liver-cancer-prediction-${Date.now()}.json`;
  anchor.click();
}
