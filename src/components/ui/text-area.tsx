"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { LucideProps } from "lucide-react";

type LucideIconType = React.ComponentType<LucideProps>;

type TextAreaProps = {
  label?: string;
  required?: boolean;
  error?: string;
  helperText?: string;
  leftIcon?: LucideIconType;
  rightIcon?: LucideIconType;
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export default function TextArea({
  label,
  required,
  error,
  helperText,
  leftIcon: LeftIcon,
  rightIcon: RightIcon,
  className,
  ...props
}: TextAreaProps) {
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

      {/* textarea wrapper */}
      <div
        className={cn(
          "textarea textarea-bordered flex gap-2 p-3",
          error && "textarea-error",
          className,
        )}
      >
        {LeftIcon && (
          <div className="pt-1">
            <LeftIcon className="size-4 opacity-60" />
          </div>
        )}

        <textarea
          className="grow resize-none bg-transparent outline-none"
          required={required}
          {...props}
        />

        {RightIcon && (
          <div className="pt-1">
            <RightIcon className="size-4 opacity-60" />
          </div>
        )}
      </div>

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
