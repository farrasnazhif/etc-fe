"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";

type SelectOption = {
  label: string;
  value: string;
};

type SelectProps = {
  label?: string;
  placeholder?: string;
  options: SelectOption[];
  error?: string;
  helperText?: string;
  className?: string;
} & React.SelectHTMLAttributes<HTMLSelectElement>;

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      label,
      placeholder = "Pilih opsi",
      options,
      error,
      helperText,
      className,
      required,
      ...props
    },
    ref,
  ) => {
    return (
      <div className="form-control w-full">
        {/* label */}
        {label && (
          <label className="label">
            <span className="label-text font-medium text-neutral-800">
              {label}
              {required && <span className="ml-1 text-error">*</span>}
            </span>
          </label>
        )}

        {/* select */}
        <select
          ref={ref}
          className={cn(
            "select select-bordered w-full bg-white transition",
            error
              ? "select-error border-red-400 focus:border-red-500"
              : "focus:border-blue-500",
            className,
          )}
          defaultValue=""
          {...props}
        >
          {/* placeholder */}
          <option value="" disabled>
            {placeholder}
          </option>

          {/* options */}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        {/* helper / error */}
        {(error || helperText) && (
          <label className="label">
            <span
              className={cn(
                "label-text-alt",
                error ? "text-error" : "text-neutral-500",
              )}
            >
              {error || helperText}
            </span>
          </label>
        )}
      </div>
    );
  },
);

Select.displayName = "Select";

export default Select;
