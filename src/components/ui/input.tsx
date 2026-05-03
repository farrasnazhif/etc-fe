"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { LucideProps } from "lucide-react";

type LucideIconType = React.ComponentType<LucideProps>;

type InputProps = {
  label?: string;
  required?: boolean;
  error?: string;
  helperText?: string;
  leftIcon?: LucideIconType;
  rightIcon?: LucideIconType;
} & React.InputHTMLAttributes<HTMLInputElement>;

export default function Input({
  label,
  required,
  error,
  helperText,
  leftIcon: LeftIcon,
  rightIcon: RightIcon,
  className,
  ...props
}: InputProps) {
  return (
    <div className="form-control w-full">
      {/* label */}
      {label && (
        <label className="label">
          <span className="label-text flex items-center gap-1">
            {label}
            {required && <span className="text-error">*</span>}
          </span>
        </label>
      )}

      {/* input wrapper */}
      <div
        className={cn(
          "input input-bordered flex items-center gap-2",
          error && "input-error",
          className,
        )}
      >
        {LeftIcon && <LeftIcon className="size-4 opacity-60" />}

        <input
          className="grow bg-transparent outline-none"
          required={required}
          {...props}
        />

        {RightIcon && <RightIcon className="size-4 opacity-60" />}
      </div>

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
