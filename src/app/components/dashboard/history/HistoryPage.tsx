"use client";

import { ChangeEvent, useState } from "react";
import axios, { AxiosError } from "axios";
import HistoryActions from "./HistoryActions";
import HistoryClinicalSection from "./HistoryClinicalSection";
import {
  historyRanges,
  initialHistoryFormData,
  requiredHistoryFields,
} from "./historyConfig";
import HistoryHeader from "./HistoryHeader";
import HistoryImagingSection from "./HistoryImagingSection";
import HistoryPatientInfoSection from "./HistoryPatientInfoSection";
import HistoryProgress from "./HistoryProgress";
import HistoryResults from "./HistoryResults";
import {
  calculateHistoryProgress,
  exportHistoryResults,
  validateHistoryField,
} from "./historyUtils";
import { HistoryFormData, PredictionResult } from "./historyTypes";

export default function HistoryPage() {
  const [data, setData] = useState<HistoryFormData>(initialHistoryFormData);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [ctPreview, setCtPreview] = useState<string | null>(null);
  const [mriPreview, setMriPreview] = useState<string | null>(null);

  const handleTextChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setData((prev) => ({ ...prev, [name]: value }));

    const error = validateHistoryField(name, value, historyRanges);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    setData((prev) => ({ ...prev, [name]: value }));

    const error = validateHistoryField(name, value, historyRanges);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleBlur = (name: string) => {
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  const handleFile = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || !event.target.files[0]) {
      return;
    }

    const file = event.target.files[0];
    const { name } = event.target;

    if (file.size > 10 * 1024 * 1024) {
      setErrors((prev) => ({
        ...prev,
        [name]: "File size must be less than 10MB",
      }));
      return;
    }

    setData((prev) => ({ ...prev, [name]: file }));
    setErrors((prev) => ({ ...prev, [name]: "" }));

    const reader = new FileReader();
    reader.onloadend = () => {
      if (name === "ct") {
        setCtPreview(reader.result as string);
      } else {
        setMriPreview(reader.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  const removeFile = (name: "ct" | "mri") => {
    setData((prev) => ({ ...prev, [name]: null }));
    if (name === "ct") {
      setCtPreview(null);
    } else {
      setMriPreview(null);
    }
  };

  const isFormValid = () => {
    const hasErrors = Object.values(errors).some((error) => error !== "");
    const allFilled = requiredHistoryFields.every(
      (field) => data[field] !== ""
    );

    return !hasErrors && allFilled;
  };

  const handlePredict = async () => {
    const allTouched = Object.keys(data).reduce<Record<string, boolean>>(
      (accumulator, key) => ({ ...accumulator, [key]: true }),
      {}
    );
    setTouched(allTouched);

    const newErrors: Record<string, string> = {};
    Object.keys(data).forEach((key) => {
      if (key !== "ct" && key !== "mri") {
        const error = validateHistoryField(
          key,
          data[key as keyof HistoryFormData] as string,
          historyRanges
        );
        if (error) {
          newErrors[key] = error;
        }
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    setShowResult(false);

    try {
      const clinicalData = {
        age_at_index: parseFloat(data.age_at_index),
        bmi: parseFloat(data.bmi),
        tumor_nodul: parseInt(data.tumor_nodul),
        hepatitis: parseInt(data.hepatitis),
        afp: parseFloat(data.afp),
        afp_group: parseInt(data.afp_group),
        alk: parseFloat(data.alk),
        days_to_last_follow_up: data.days_to_last_follow_up
          ? parseInt(data.days_to_last_follow_up)
          : 0,
        metastasis: parseInt(data.metastasis),
      };

      const response = await axios.post<PredictionResult>(
        "http://localhost:8000/predict",
        clinicalData
      );
      setResult(response.data);
      setShowResult(true);
    } catch (error) {
      const axiosError = error as AxiosError<{ detail?: string }>;
      const message =
        axiosError.response?.data?.detail || axiosError.message;
      alert(`Prediction failed: ${message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    if (confirm("Are you sure you want to clear all form data?")) {
      setData(initialHistoryFormData);
      setErrors({});
      setTouched({});
      setCtPreview(null);
      setMriPreview(null);
      setShowResult(false);
      setResult(null);
    }
  };

  const progress = calculateHistoryProgress(data);

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.12),_transparent_26%),linear-gradient(135deg,rgba(239,246,255,0.8),rgba(255,255,255,1),rgba(248,250,252,0.92))] p-3 md:p-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 grid gap-6 xl:grid-cols-[1.08fr_0.92fr] xl:items-start">
          <HistoryHeader />
          <div className="grid gap-4">
            <HistoryProgress progress={progress} />
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-[1.6rem] border border-slate-200/80 bg-white/90 p-5 shadow-[0_18px_45px_rgba(15,23,42,0.06)]">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                  Workflow
                </p>
                <p className="mt-3 text-lg font-bold text-slate-900">
                  Intake to prediction
                </p>
                <p className="mt-2 text-sm font-medium leading-6 text-slate-500">
                  Structure patient and biomarker input before generating a
                  stage estimate.
                </p>
              </div>

              <div className="rounded-[1.6rem] border border-slate-200/80 bg-white/90 p-5 shadow-[0_18px_45px_rgba(15,23,42,0.06)]">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                  Mode
                </p>
                <p className="mt-3 text-lg font-bold text-slate-900">
                  Design preview
                </p>
                <p className="mt-2 text-sm font-medium leading-6 text-slate-500">
                  UI-first workflow layout with the current prediction endpoint
                  kept intact.
                </p>
              </div>
            </div>
          </div>
        </div>

        <HistoryPatientInfoSection
          data={data}
          touched={touched}
          errors={errors}
          onTextChange={handleTextChange}
          onSelectChange={handleSelectChange}
          onBlur={handleBlur}
        />

        <div className="mb-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <HistoryClinicalSection
            data={data}
            touched={touched}
            errors={errors}
            ranges={historyRanges}
            onTextChange={handleTextChange}
            onSelectChange={handleSelectChange}
            onBlur={handleBlur}
          />

          <HistoryImagingSection
            ctPreview={ctPreview}
            mriPreview={mriPreview}
            errors={errors}
            onFileChange={handleFile}
            onRemoveFile={removeFile}
          />
        </div>

        <HistoryActions
          isFormValid={isFormValid()}
          isLoading={isLoading}
          onPredict={handlePredict}
          onReset={handleReset}
        />

        <HistoryResults
          result={result}
          showResult={showResult}
          onExport={() => exportHistoryResults(data, result)}
        />
      </div>
    </div>
  );
}
