import { ChangeEvent } from "react";
import { Mail, Phone, User, UserRound } from "lucide-react";
import {
  SelectField,
  TextInputField,
} from "./HistoryFormFields";

type HistoryPatientInfoSectionProps = {
  data: {
    name: string;
    email: string;
    contact: string;
    gender: string;
  };
  touched: Record<string, boolean>;
  errors: Record<string, string>;
  onTextChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onSelectChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  onBlur: (name: string) => void;
};

export default function HistoryPatientInfoSection({
  data,
  touched,
  errors,
  onTextChange,
  onSelectChange,
  onBlur,
}: HistoryPatientInfoSectionProps) {
  const completionCount = [
    data.name,
    data.email,
    data.contact,
    data.gender,
  ].filter(Boolean).length;

  return (
    <section className="mb-6 overflow-hidden rounded-[1.9rem] border border-slate-200/80 bg-white/90 shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur">
      <div className="border-b border-slate-200/80 px-6 py-5">
        <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              <UserRound className="h-3.5 w-3.5" />
              Patient identity
            </div>

            <h2 className="mt-4 text-2xl font-bold tracking-tight text-slate-950">
              Patient Basic Information
            </h2>
            <p className="mt-2 max-w-2xl text-sm font-medium leading-7 text-slate-600">
              Capture the core identity and contact fields first so the case can
              be reviewed, tracked, and tied back to a patient record cleanly.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-[1.35rem] border border-slate-200 bg-slate-50/80 p-4">
              <Mail className="h-4 w-4 text-sky-600" />
              <p className="mt-3 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                Contact
              </p>
              <p className="mt-2 text-sm font-semibold text-slate-800">
                Email and phone
              </p>
            </div>

            <div className="rounded-[1.35rem] border border-slate-200 bg-slate-50/80 p-4">
              <User className="h-4 w-4 text-emerald-600" />
              <p className="mt-3 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                Profile
              </p>
              <p className="mt-2 text-sm font-semibold text-slate-800">
                Gender reference
              </p>
            </div>

            <div className="rounded-[1.35rem] border border-slate-200 bg-white p-4">
              <Phone className="h-4 w-4 text-violet-600" />
              <p className="mt-3 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                Progress
              </p>
              <p className="mt-2 text-2xl font-bold text-slate-950">
                {completionCount}/4
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 py-6">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <TextInputField
            label="Full Name"
            name="name"
            value={data.name}
            onChange={onTextChange}
            onBlur={() => onBlur("name")}
            error={touched.name ? errors.name : ""}
            placeholder="Enter patient's full name"
          />

          <TextInputField
            label="Email Address"
            name="email"
            type="email"
            value={data.email}
            onChange={onTextChange}
            onBlur={() => onBlur("email")}
            error={touched.email ? errors.email : ""}
            placeholder="patient@example.com"
          />

          <TextInputField
            label="Contact Number"
            name="contact"
            value={data.contact}
            onChange={onTextChange}
            onBlur={() => onBlur("contact")}
            error={touched.contact ? errors.contact : ""}
            placeholder="+1 234 567 8900"
          />

          <SelectField
            label="Gender"
            name="gender"
            value={data.gender}
            onChange={onSelectChange}
            onBlur={() => onBlur("gender")}
            error={touched.gender ? errors.gender : ""}
            options={[
              { value: "male", label: "Male" },
              { value: "female", label: "Female" },
              { value: "other", label: "Other" },
            ]}
          />
        </div>
      </div>
    </section>
  );
}
