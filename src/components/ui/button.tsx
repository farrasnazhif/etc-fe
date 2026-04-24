"use client";

import { LoaderCircle, LucideProps } from "lucide-react";
import * as React from "react";
import { cn } from "@/lib/utils";

type ButtonVariant =
  | "primary"
  | "secondary"
  | "accent"
  | "neutral"
  | "ghost"
  | "outline"
  | "error"
  | "success"
  | "warning";

type ButtonSize = "lg" | "md" | "sm" | "xs";

type LucideIconType = React.ComponentType<LucideProps>;

type ButtonProps = {
  isLoading?: boolean;
  variant?: ButtonVariant;
  size?: ButtonSize;
  leftIcon?: LucideIconType;
  rightIcon?: LucideIconType;
  leftIconClassName?: string;
  rightIconClassName?: string;
} & React.ComponentPropsWithRef<"button">;

const variantClassMap: Record<ButtonVariant, string> = {
  primary: "btn-primary",
  secondary: "btn-secondary",
  accent: "btn-accent",
  neutral: "btn-neutral",
  ghost: "btn-ghost",
  outline: "btn-outline",
  error: "btn-error",
  success: "btn-success",
  warning: "btn-warning",
};

const sizeClassMap: Record<ButtonSize, string> = {
  lg: "btn-lg",
  md: "btn-md",
  sm: "btn-sm",
  xs: "btn-xs",
};

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className,
      disabled: buttonDisabled,
      isLoading,
      variant = "primary",
      size = "md",
      leftIcon: LeftIcon,
      rightIcon: RightIcon,
      leftIconClassName,
      rightIconClassName,
      ...rest
    },
    ref,
  ) => {
    const disabled = isLoading || buttonDisabled;

    return (
      <button
        ref={ref}
        disabled={disabled}
        className={cn(
          "btn gap-2",
          variantClassMap[variant],
          sizeClassMap[size],
          isLoading && "btn-disabled",
          className,
        )}
        {...rest}
      >
        {/* loading */}
        {isLoading && <LoaderCircle className="h-4 w-4 animate-spin" />}

        {/* left icon */}
        {LeftIcon && !isLoading && (
          <LeftIcon className={cn("h-4 w-4", leftIconClassName)} />
        )}

        <span>{children}</span>

        {/* right icon */}
        {RightIcon && !isLoading && (
          <RightIcon className={cn("h-4 w-4", rightIconClassName)} />
        )}
      </button>
    );
  },
);

Button.displayName = "Button";
export default Button;
