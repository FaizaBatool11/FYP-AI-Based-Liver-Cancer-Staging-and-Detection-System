import { ChangeEvent } from "react";
import { Info, Upload } from "lucide-react";
import { FileUploadField } from "./HistoryFormFields";

type HistoryImagingSectionProps = {
  ctPreview: string | null;
  mriPreview: string | null;
  errors: Record<string, string>;
  onFileChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onRemoveFile: (name: "ct" | "mri") => void;
};

export default function HistoryImagingSection({
  ctPreview,
  mriPreview,
  errors,
  onFileChange,
  onRemoveFile,
}: HistoryImagingSectionProps) {
  const uploadedCount = [ctPreview, mriPreview].filter(Boolean).length;

  return (
    <section className="overflow-hidden rounded-[1.9rem] border border-slate-200/80 bg-white/90 shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur">
      <div className="border-b border-slate-200/80 px-6 py-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              <Upload className="h-3.5 w-3.5" />
              Imaging review
            </div>

            <h2 className="mt-4 text-2xl font-bold tracking-tight text-slate-950">
              Medical Imaging
            </h2>
            <p className="mt-2 max-w-2xl text-sm font-medium leading-7 text-slate-600">
              Attach CT and MRI files to complete the case context and support
              downstream review during the staging workflow.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 lg:max-w-[22rem] lg:justify-end">
            <div className="rounded-full border border-sky-200 bg-sky-50 px-3 py-1.5 text-xs font-semibold text-sky-700">
              CT and MRI
            </div>
            <div className="rounded-full border border-violet-200 bg-violet-50 px-3 py-1.5 text-xs font-semibold text-violet-700">
              10MB per file
            </div>
            <div className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700">
              {uploadedCount}/2 uploaded
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 py-6">
        <div className="grid gap-5">
          <FileUploadField
            label="CT Scan"
            name="ct"
            onChange={onFileChange}
            preview={ctPreview}
            onRemove={() => onRemoveFile("ct")}
            error={errors.ct}
            info="Upload CT scan images (DICOM, PNG, or JPG)"
          />

          <FileUploadField
            label="MRI Scan"
            name="mri"
            onChange={onFileChange}
            preview={mriPreview}
            onRemove={() => onRemoveFile("mri")}
            error={errors.mri}
            info="Upload MRI scan images (DICOM, PNG, or JPG)"
          />

          <div className="rounded-[1.5rem] border border-blue-200 bg-blue-50/80 p-5">
            <div className="flex gap-3">
              <Info className="mt-0.5 h-5 w-5 flex-shrink-0 text-blue-600" />
              <div className="text-sm text-blue-900">
                <p className="mb-2 font-semibold">Image Requirements</p>
                <ul className="list-inside list-disc space-y-1.5 text-blue-800">
                  <li>Maximum file size: 10MB</li>
                  <li>Accepted formats: DICOM, PNG, JPG</li>
                  <li>Images should be clear and properly oriented</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
