// src/shared/components/forms/form-stepper.tsx

"use client";

import { Check } from "lucide-react";
import { cn } from "@/shared/lib/utils/cn";

export interface Step {
  id: string;
  title: string;
  description?: string;
}

interface FormStepperProps {
  steps: Step[];
  currentStep: number;
  onStepClick?: (stepIndex: number) => void;
}

export function FormStepper({ steps, currentStep, onStepClick }: FormStepperProps) {
  return (
    <div className="relative">
      {/* Progress line */}
      <div className="absolute top-5 left-0 right-0 h-0.5 bg-muted">
        <div
          className="h-full bg-gradient-to-r from-primary to-primary/60 transition-all duration-500"
          style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
        />
      </div>

      {/* Steps */}
      <div className="relative flex justify-between">
        {steps.map((step, index) => {
          const isCompleted = index < currentStep;
          const isCurrent = index === currentStep;
          const isClickable = onStepClick && index <= currentStep;

          return (
            <div
              key={step.id}
              className={cn(
                "flex flex-col items-center flex-1",
                isClickable && "cursor-pointer"
              )}
              onClick={() => isClickable && onStepClick(index)}
            >
              {/* Step indicator */}
              <div className="relative z-10 mb-3">
                <div
                  className={cn(
                    "h-10 w-10 rounded-full border-2 flex items-center justify-center transition-all duration-300",
                    isCompleted &&
                      "bg-primary border-primary shadow-lg shadow-primary/50",
                    isCurrent &&
                      "border-primary bg-primary/10 ring-4 ring-primary/20 animate-pulse",
                    !isCompleted &&
                      !isCurrent &&
                      "border-muted-foreground/30 bg-background"
                  )}
                >
                  {isCompleted ? (
                    <Check className="h-5 w-5 text-primary-foreground" />
                  ) : (
                    <span
                      className={cn(
                        "text-sm font-bold",
                        isCurrent && "text-primary",
                        !isCurrent && "text-muted-foreground"
                      )}
                    >
                      {index + 1}
                    </span>
                  )}
                </div>

                {/* Glow effect for current step */}
                {isCurrent && (
                  <div className="absolute inset-0 rounded-full bg-primary/20 blur-xl animate-pulse" />
                )}
              </div>

              {/* Step info */}
              <div className="text-center max-w-[120px]">
                <p
                  className={cn(
                    "text-sm font-semibold transition-colors",
                    isCurrent && "text-primary",
                    isCompleted && "text-foreground",
                    !isCompleted && !isCurrent && "text-muted-foreground"
                  )}
                >
                  {step.title}
                </p>
                {step.description && (
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                    {step.description}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}