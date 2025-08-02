import { CheckCircle, Circle, Info } from "lucide-react";
import { cn } from "../../utils";
import { Button } from "../button";
import { StepperProps } from "./stepper.type";
import { Tooltip } from "../tooltip";

export const Stepper = ({
  steps,
  activeStep,
  onStepClick,
  completed,
  onStepChange,
  onComplete,
  orientation = "horizontal",
  showControls = false,
}: StepperProps) => {
  const isHorizontal = orientation === "horizontal";
  const isLastStep = activeStep === steps.length - 1;

  const handleNext = () => {
    if (activeStep < steps.length - 1) {
      onStepChange?.(activeStep + 1);
    }
  };

  const handleBack = () => {
    if (activeStep > 0) {
      onStepChange?.(activeStep - 1);
    }
  };

  return (
    <div className="w-full">
      <div
        className={cn(
          isHorizontal
            ? "grid grid-cols-4 max-md:grid-cols-3 max-sm:grid-cols-2 place-items-center gap-6"
            : "flex flex-col space-y-4"
        )}
      >
        {steps.map((step, index) => {
          const isCompleted = index < activeStep;
          const isActive = index === activeStep;

          return (
            <div
              key={index}
              onClick={() => onStepClick?.(index)}
              className={cn(
                "flex items-start transition group cursor-pointer",
                isHorizontal
                  ? "flex-col items-center text-center w-24"
                  : "flex-row"
              )}
            >
              <div className={cn(isHorizontal && "w-full flex justify-center")}>
                <div
                  className={cn(
                    "relative flex items-center justify-center rounded-full border w-10 h-10 mb-1 shrink-0",
                    isCompleted || completed
                      ? "bg-primary-500 text-white border-primary-500"
                      : isActive
                      ? "bg-blue-500 text-white border-blue-500 animate-pulse"
                      : "bg-white text-gray-400 border-gray-300 group-hover:border-blue-400"
                  )}
                >
                  {isCompleted || completed ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : isActive ? (
                    <Info className="w-5 h-5" />
                  ) : (
                    <Circle className="w-5 h-5" />
                  )}
                </div>
              </div>
              <div className={cn(isHorizontal ? "mt-2 w-full" : "ml-3 flex-1")}>
                <div className="text-sm font-semibold text-gray-900 truncate">
                  {step.title}
                </div>
                {step.description && (
                  <Tooltip content={step.description}>
                    <div
                      className="text-xs text-gray-500 truncate max-w-[400px] max-sm:max-w-[250px]"
                      title={step.description}
                    >
                      {step.description}
                    </div>
                  </Tooltip>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {showControls && (
        <div className="mt-6 flex justify-between" hidden={completed}>
          <Button
            onClick={handleBack}
            disabled={activeStep === 0}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 text-sm disabled:opacity-50"
          >
            Back
          </Button>

          {isLastStep ? (
            <Button
              onClick={onComplete}
              className="px-4 py-2 bg-primary-600 text-white rounded hover:bg-primary-700 text-sm"
            >
              Complete
            </Button>
          ) : (
            <Button
              onClick={handleNext}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
            >
              Next
            </Button>
          )}
        </div>
      )}

      {isLastStep && !showControls ? (
        <div className="w-full mt-4 flex justify-end" hidden={completed}>
          <Button
            onClick={onComplete}
            className="px-4 py-2 bg-primary-600 text-white rounded hover:bg-primary-700 text-sm"
          >
            Complete
          </Button>
        </div>
      ) : undefined}
    </div>
  );
};
