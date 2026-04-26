"use client";

import * as React from "react";
import { UploadCloud, FileText } from "lucide-react";
import { cn } from "@/lib/utils";

type DropzoneInputProps = {
  label?: string;
  required?: boolean;
  error?: string;
  helperText?: string;
  onFileChange?: (file: File | null) => void;
} & React.InputHTMLAttributes<HTMLInputElement>;

export default function DropzoneInput({
  label,
  required,
  error,
  helperText,
  className,
  onFileChange,
  ...props
}: DropzoneInputProps) {
  const [dragActive, setDragActive] = React.useState(false);
  const [file, setFile] = React.useState<File | null>(null);

  function handleFile(file: File | null) {
    setFile(file);
    onFileChange?.(file);
  }

  return (
    <div className="form-control w-full max-w-md">
      {/* label */}
      {label && (
        <label className="label">
          <span className="label-text flex items-center gap-1">
            {label}
            {required && <span className="text-error">*</span>}
          </span>
        </label>
      )}

      {/* dropzone */}
      <label
        className={cn(
          "flex flex-col items-center justify-center gap-2 p-6 border-2 border-dashed rounded-xl cursor-pointer transition",
          "bg-base-100 hover:bg-base-200",
          dragActive && "border-primary bg-base-200",
          error && "border-error",
          className,
        )}
        onDragEnter={() => setDragActive(true)}
        onDragLeave={() => setDragActive(false)}
        onDragOver={(e) => {
          e.preventDefault();
          setDragActive(true);
        }}
        onDrop={(e) => {
          e.preventDefault();
          setDragActive(false);
          const droppedFile = e.dataTransfer.files?.[0];
          if (droppedFile) handleFile(droppedFile);
        }}
      >
        {/* hidden input */}
        <input
          type="file"
          className="hidden"
          onChange={(e) => handleFile(e.target.files?.[0] || null)}
          {...props}
        />

        {file ? (
          <>
            <FileText className="size-6 text-primary" />
            <p className="text-sm font-medium text-base-content">{file.name}</p>
            <p className="text-xs text-base-content/60">
              Klik untuk mengganti file
            </p>
          </>
        ) : (
          <>
            <UploadCloud className="size-6 text-base-content/60" />
            <p className="text-sm font-medium text-base-content">
              Drag & drop file di sini
            </p>
            <p className="text-xs text-base-content/60">
              atau klik untuk upload
            </p>
          </>
        )}
      </label>

      {(helperText || error) && (
        <label className="label">
          <span
            className={cn(
              "label-text-alt",
              error ? "text-error" : "text-base-content/60",
            )}
          >
            {error || helperText}
          </span>
        </label>
      )}
    </div>
  );
}
