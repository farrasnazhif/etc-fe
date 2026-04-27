import { cn } from "@/lib/utils";
import { motion } from "motion/react";

export default function StepIndicator({ activeStep }: { activeStep: number }) {
  return (
    <div className="flex flex-col">
      <StepRow
        number={1}
        active={activeStep === 1}
        completed={activeStep > 1}
        headline="Introduce yourself"
        subHeadline="What should we call you?"
      />

      <StepRow
        number={2}
        active={activeStep === 2}
        completed={activeStep > 2}
        headline="Choose your level"
        subHeadline="Tell us your grade or year."
      />

      <StepRow
        number={3}
        active={activeStep === 3}
        completed={activeStep > 3}
        headline="Choose your area of focus"
        subHeadline="What do you want to focus on?"
      />

      <StepRow
        number={4}
        active={activeStep === 4}
        completed={false}
        headline="Set your goal"
        subHeadline="What’s your goal right now?"
        hideLine
      />
    </div>
  );
}

function StepRow({
  number,
  active,
  completed,
  headline,
  subHeadline,
  hideLine = false,
}: {
  number: number;
  active: boolean;
  completed: boolean;
  headline: string;
  subHeadline: string;
  hideLine?: boolean;
}) {
  return (
    <div className="flex gap-4 relative">
      {/* left column */}
      <div className="flex flex-col items-center">
        {/* step circle */}
        <motion.div
          layout
          initial={false}
          animate={{
            scale: active ? 1.15 : 1,
            backgroundColor: completed
              ? "#2563eb" // blue-600
              : active
                ? "transparent"
                : "transparent",
            borderColor: completed || active ? "#2563eb" : "#d1d5db",
            color: completed ? "#ffffff" : active ? "#2563eb" : "#9ca3af",
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 20,
          }}
          className={cn(
            "w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium z-10 border",
            "bg-white dark:bg-neutral-900",
            "dark:border-neutral-700",
            !active && !completed && "dark:text-neutral-500",
          )}
        >
          {number}
        </motion.div>

        {/* line */}
        {!hideLine && (
          <motion.div
            layout
            initial={false}
            animate={{
              backgroundColor: completed ? "#2563eb" : "#93c5fd",
            }}
            transition={{ duration: 0.3 }}
            className="w-[1px] h-[50px] my-1 bg-blue-300 dark:bg-blue-800/50"
          />
        )}
      </div>

      {/* text */}
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{
          opacity: active || completed ? 1 : 0.6,
          y: 0,
        }}
        transition={{ duration: 0.3 }}
        className="pb-2"
      >
        <p
          className={cn(
            "font-medium",
            active || completed
              ? "text-neutral-900 dark:text-neutral-100"
              : "text-neutral-500 dark:text-neutral-400",
          )}
        >
          {headline}
        </p>
        <p
          className={cn(
            "text-sm",
            active || completed
              ? "text-neutral-700 dark:text-neutral-300"
              : "text-neutral-400 dark:text-neutral-500",
          )}
        >
          {subHeadline}
        </p>
      </motion.div>
    </div>
  );
}
