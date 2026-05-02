"use client";

import { ChangeEvent, ReactNode, useState } from "react";
import {
  AlertCircle,
  Check,
  ChevronDown,
  Info,
  Upload,
  X,
} from "lucide-react";
import { RangeConfig } from "./historyTypes";

type BaseFieldProps = {
  label: string;
  name: string;
  error?: string;
  info?: string;
  helperText?: string;
};

type TextInputFieldProps = BaseFieldProps & {
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onBlur: () => void;
  placeholder?: string;
  type?: string;
};

type InputFieldProps = BaseFieldProps & {
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onBlur: () => void;
  range?: RangeConfig;
  step?: string;
};

type SelectFieldProps = BaseFieldProps & {
  value: string;
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  onBlur: () => void;
  options: Array<{ value: string; label: string }>;
};

type FileUploadFieldProps = BaseFieldProps & {
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  preview: string | null;
  onRemove: () => void;
};

export function TextInputField({
  label,
  name,
  value,
  onChange,
  onBlur,
  error,
  placeholder,
  type = "text",
  helperText,
}: TextInputFieldProps) {
  return (
    <div className="rounded-[1.35rem] border border-slate-200 bg-slate-50/75 p-4">
      <div className="mb-3 flex items-center justify-between gap-3">
        <label className="block text-sm font-semibold text-slate-700">
          {label}
        </label>
        {helperText ? (
          <span className="text-xs font-medium text-slate-400">
            {helperText}
          </span>
        ) : null}
      </div>
      <input
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        type={type}
        placeholder={placeholder}
        className={`h-12 w-full rounded-[1rem] border bg-white px-4 text-sm font-medium text-slate-900 placeholder:text-slate-400 transition-all focus:outline-none ${
          error
            ? "border-red-300 focus:border-red-500"
            : value
              ? "border-sky-300 focus:border-sky-500"
              : "border-slate-200 focus:border-sky-400"
        }`}
      />
      {error ? (
        <p className="mt-2 flex items-center gap-1 text-sm font-medium text-red-600">
          <AlertCircle className="h-4 w-4" />
          {error}
        </p>
      ) : null}
    </div>
  );
}

function Tooltip({
  text,
  children,
}: {
  text: string;
  children: ReactNode;
}) {
  const [show, setShow] = useState(false);

  return (
    <div className="relative inline-block">
      <div onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}>
        {children}
      </div>
      {show ? (
        <div className="absolute -top-2 right-6 z-10 w-64 rounded-lg bg-gray-900 p-2 text-xs text-white shadow-lg">
          {text}
          <div className="absolute top-2 -right-1 h-2 w-2 rotate-45 bg-gray-900" />
        </div>
      ) : null}
    </div>
  );
}

export function InputField({
  label,
  name,
  value,
  onChange,
  onBlur,
  error,
  info,
  range,
  step = "1",
  helperText,
}: InputFieldProps) {
  const numValue = parseFloat(value);
  const isOutOfNormal =
    range?.normal &&
    value &&
    !Number.isNaN(numValue) &&
    (numValue < parseFloat(range.normal.split("-")[0]) ||
      numValue > parseFloat(range.normal.split("-")[1]));

  return (
    <div className="rounded-[1.35rem] border border-slate-200 bg-slate-50/75 p-4">
      <div className="mb-3 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <label className="block text-sm font-semibold text-slate-700">
            {label}
          </label>
          {helperText ? (
            <span className="text-xs font-medium text-slate-400">
              {helperText}
            </span>
          ) : null}
        </div>
        {info ? (
          <Tooltip text={info}>
            <Info className="h-4 w-4 cursor-help text-slate-400 hover:text-slate-600" />
          </Tooltip>
        ) : null}
      </div>
      <input
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        type="number"
        step={step}
        className={`h-12 w-full rounded-[1rem] border bg-white px-4 text-sm font-medium text-slate-900 placeholder:text-slate-400 transition-all focus:outline-none ${
          error
            ? "border-red-300 focus:border-red-500"
            : value
              ? "border-sky-300 focus:border-sky-500"
              : "border-slate-200 focus:border-sky-400"
        }`}
      />
      {range ? (
        <p className="mt-2 text-xs font-medium text-slate-500">
          Range: {range.min}-{range.max} {range.unit}
          {range.normal ? ` (Normal: ${range.normal})` : ""}
        </p>
      ) : null}
      {isOutOfNormal ? (
        <p className="mt-2 flex items-center gap-1 text-xs font-medium text-orange-600">
          <AlertCircle className="h-3 w-3" />
          Value outside normal range
        </p>
      ) : null}
      {error ? (
        <p className="mt-2 flex items-center gap-1 text-sm font-medium text-red-600">
          <AlertCircle className="h-4 w-4" />
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function SelectField({
  label,
  name,
  value,
  onChange,
  onBlur,
  error,
  info,
  options,
  helperText,
}: SelectFieldProps) {
  return (
    <div className="rounded-[1.35rem] border border-slate-200 bg-slate-50/75 p-4">
      <div className="mb-3 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <label className="block text-sm font-semibold text-slate-700">
            {label}
          </label>
          {helperText ? (
            <span className="text-xs font-medium text-slate-400">
              {helperText}
            </span>
          ) : null}
        </div>
        {info ? (
          <Tooltip text={info}>
            <Info className="h-4 w-4 cursor-help text-slate-400 hover:text-slate-600" />
          </Tooltip>
        ) : null}
      </div>
      <div className="relative">
        <select
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          className={`h-12 w-full appearance-none rounded-[1rem] border bg-white px-4 pr-11 text-sm font-medium text-slate-900 transition-all focus:outline-none ${
            error
              ? "border-red-300 focus:border-red-500"
              : value
                ? "border-sky-300 focus:border-sky-500"
                : "border-slate-200 focus:border-sky-400"
          }`}
        >
          <option value="">Select an option</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-4 top-3.5 h-5 w-5 text-slate-400" />
      </div>
      {error ? (
        <p className="mt-2 flex items-center gap-1 text-sm font-medium text-red-600">
          <AlertCircle className="h-4 w-4" />
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function FileUploadField({
  label,
  name,
  onChange,
  preview,
  onRemove,
  error,
  info,
  helperText,
}: FileUploadFieldProps) {
  return (
    <div className="rounded-[1.45rem] border border-slate-200 bg-slate-50/75 p-4">
      <div className="mb-3 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <label className="block text-sm font-semibold text-slate-700">
            {label}
          </label>
          {helperText ? (
            <span className="text-xs font-medium text-slate-400">
              {helperText}
            </span>
          ) : null}
        </div>
        {info ? (
          <Tooltip text={info}>
            <Info className="h-4 w-4 cursor-help text-slate-400 hover:text-slate-600" />
          </Tooltip>
        ) : null}
      </div>

      {!preview ? (
        <label className="flex h-36 w-full cursor-pointer flex-col items-center justify-center rounded-[1.2rem] border border-dashed border-slate-300 bg-white transition-all hover:border-sky-300 hover:bg-sky-50/40">
          <div className="flex flex-col items-center justify-center px-4 pb-6 pt-5 text-center">
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-500">
              <Upload className="h-6 w-6" />
            </div>
            <p className="text-sm font-medium text-slate-600">
              <span className="font-semibold">Click to upload</span> or drag and
              drop
            </p>
            <p className="mt-1 text-xs font-medium text-slate-400">
              DICOM, PNG, JPG (MAX. 10MB)
            </p>
          </div>
          <input
            name={name}
            type="file"
            className="hidden"
            onChange={onChange}
            accept=".dcm,.png,.jpg,.jpeg"
          />
        </label>
      ) : (
        <div className="relative rounded-[1.2rem] border border-emerald-200 bg-emerald-50/80 p-4">
          <button
            onClick={onRemove}
            className="absolute right-3 top-3 rounded-full bg-red-500 p-1 text-white hover:bg-red-600"
            type="button"
          >
            <X className="h-4 w-4" />
          </button>
          <div className="flex items-center gap-3">
            <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-[1rem] bg-slate-200">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={preview} alt="Preview" className="h-full w-full object-cover" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-slate-900">
                File uploaded successfully
              </p>
              <p className="mt-1 text-xs font-medium text-slate-500">
                Click the X button to remove
              </p>
            </div>
            <Check className="h-6 w-6 text-green-600" />
          </div>
        </div>
      )}

      {error ? (
        <p className="mt-2 flex items-center gap-1 text-sm font-medium text-red-600">
          <AlertCircle className="h-4 w-4" />
          {error}
        </p>
      ) : null}
    </div>
  );
}
