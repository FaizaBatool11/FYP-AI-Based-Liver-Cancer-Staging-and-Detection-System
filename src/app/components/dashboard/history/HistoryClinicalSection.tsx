import { ChangeEvent } from "react";
import { FileText } from "lucide-react";
import { InputField, SelectField } from "./HistoryFormFields";
import { Ranges } from "./historyTypes";

type HistoryClinicalSectionProps = {
  data: {
    age_at_index: string;
    bmi: string;
    tumor_nodul: string;
    hepatitis: string;
    afp: string;
    afp_group: string;
    alk: string;
    days_to_last_follow_up: string;
    metastasis: string;
  };
  touched: Record<string, boolean>;
  errors: Record<string, string>;
  ranges: Ranges;
  onTextChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onSelectChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  onBlur: (name: string) => void;
};

export default function HistoryClinicalSection({
  data,
  touched,
  errors,
  ranges,
  onTextChange,
  onSelectChange,
  onBlur,
}: HistoryClinicalSectionProps) {
  const completedCount = [
    data.age_at_index,
    data.bmi,
    data.tumor_nodul,
    data.hepatitis,
    data.afp,
    data.afp_group,
    data.alk,
    data.days_to_last_follow_up,
    data.metastasis,
  ].filter(Boolean).length;

  return (
    <section className="overflow-hidden rounded-[1.9rem] border border-slate-200/80 bg-white/90 shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur">
      <div className="border-b border-slate-200/80 px-6 py-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              <FileText className="h-3.5 w-3.5" />
              Clinical profile
            </div>

            <h2 className="mt-4 text-2xl font-bold tracking-tight text-slate-950">
              Clinical Parameters
            </h2>
            <p className="mt-2 max-w-2xl text-sm font-medium leading-7 text-slate-600">
              Enter the patient biomarkers and disease indicators used by the
              staging workflow so the prediction step receives a complete
              clinical snapshot.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 lg:max-w-[22rem] lg:justify-end">
            <div className="rounded-full border border-sky-200 bg-sky-50 px-3 py-1.5 text-xs font-semibold text-sky-700">
              Biomarkers
            </div>
            <div className="rounded-full border border-amber-200 bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-700">
              Risk flags
            </div>
            <div className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700">
              {completedCount}/9 complete
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 py-6">
        <div className="grid gap-5 lg:grid-cols-2">
          <InputField
            label="Age at Index"
            name="age_at_index"
            value={data.age_at_index}
            onChange={onTextChange}
            onBlur={() => onBlur("age_at_index")}
            error={touched.age_at_index ? errors.age_at_index : ""}
            info="Patient's age at diagnosis"
            range={ranges.age_at_index}
          />

          <InputField
            label="BMI (Body Mass Index)"
            name="bmi"
            value={data.bmi}
            onChange={onTextChange}
            onBlur={() => onBlur("bmi")}
            error={touched.bmi ? errors.bmi : ""}
            info="Body Mass Index - weight(kg) / height(m)²"
            range={ranges.bmi}
            step="0.1"
          />

          <InputField
            label="Tumor Nodules"
            name="tumor_nodul"
            value={data.tumor_nodul}
            onChange={onTextChange}
            onBlur={() => onBlur("tumor_nodul")}
            error={touched.tumor_nodul ? errors.tumor_nodul : ""}
            info="Number of tumor nodules detected"
            range={ranges.tumor_nodul}
          />

          <SelectField
            label="Hepatitis Status"
            name="hepatitis"
            value={data.hepatitis}
            onChange={onSelectChange}
            onBlur={() => onBlur("hepatitis")}
            error={touched.hepatitis ? errors.hepatitis : ""}
            info="Presence of hepatitis B or C infection"
            options={[
              { value: "1", label: "Yes - Positive" },
              { value: "0", label: "No - Negative" },
            ]}
          />

          <InputField
            label="AFP Level (Alpha-Fetoprotein)"
            name="afp"
            value={data.afp}
            onChange={onTextChange}
            onBlur={() => onBlur("afp")}
            error={touched.afp ? errors.afp : ""}
            info="Tumor marker for liver cancer"
            range={ranges.afp}
          />

          <SelectField
            label="AFP Group"
            name="afp_group"
            value={data.afp_group}
            onChange={onSelectChange}
            onBlur={() => onBlur("afp_group")}
            error={touched.afp_group ? errors.afp_group : ""}
            info="AFP level classification"
            options={[
              { value: "0", label: "Low (0-20 ng/mL)" },
              { value: "1", label: "Medium (20-200 ng/mL)" },
              { value: "2", label: "High (>200 ng/mL)" },
            ]}
          />

          <InputField
            label="Alkaline Phosphatase (ALK)"
            name="alk"
            value={data.alk}
            onChange={onTextChange}
            onBlur={() => onBlur("alk")}
            error={touched.alk ? errors.alk : ""}
            info="Liver enzyme level"
            range={ranges.alk}
          />

          <InputField
            label="Days to Last Follow-up"
            name="days_to_last_follow_up"
            value={data.days_to_last_follow_up}
            onChange={onTextChange}
            onBlur={() => onBlur("days_to_last_follow_up")}
            error={
              touched.days_to_last_follow_up ? errors.days_to_last_follow_up : ""
            }
            info="Days since last clinical follow-up (optional)"
            range={ranges.days_to_last_follow_up}
          />

          <div className="lg:col-span-2">
            <SelectField
              label="Metastasis Status"
              name="metastasis"
              value={data.metastasis}
              onChange={onSelectChange}
              onBlur={() => onBlur("metastasis")}
              error={touched.metastasis ? errors.metastasis : ""}
              info="Presence of cancer spread to other organs"
              options={[
                { value: "1", label: "Yes - Detected" },
                { value: "0", label: "No - Not Detected" },
              ]}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
