"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { LucideProps } from "lucide-react";

type LucideIconType = React.ComponentType<LucideProps>;

type InputProps = {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: LucideIconType;
  rightIcon?: LucideIconType;
} & React.InputHTMLAttributes<HTMLInputElement>;

export default function Input({
  label,
  error,
  helperText,
  leftIcon: LeftIcon,
  rightIcon: RightIcon,
  className,
  ...props
}: InputProps) {
  return (
    <div className="form-control w-full max-w-md">
      {label && (
        <label className="label">
          <span className="label-text">{label}</span>
        </label>
      )}

      <div
        className={cn(
          "input input-bordered flex items-center gap-2",
          error && "input-error",
          className,
        )}
      >
        {LeftIcon && <LeftIcon className="size-4 opacity-60" />}

        <input className="grow bg-transparent outline-none" {...props} />

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
