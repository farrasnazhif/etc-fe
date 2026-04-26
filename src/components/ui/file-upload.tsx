"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

type FileUploadProps = {
  label?: string;
  required?: boolean;
  error?: string;
  helperText?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export default function FileUpload({
  label,
  required,
  error,
  helperText,
  className,
  ...props
}: FileUploadProps) {
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

      {/* input */}
      <input
        type="file"
        className={cn(
          "file-input file-input-bordered w-full",
          error && "file-input-error",
          className,
        )}
        {...props}
      />

      {/* helper / error */}
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
