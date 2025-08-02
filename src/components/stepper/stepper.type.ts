export interface Step {
  title: string;
  description?: string;
}

export interface StepperProps {
  steps: Step[];
  activeStep: number;
  onStepClick?: (index: number) => void;
  onStepChange?: (index: number) => void;
  onComplete?: () => void;
  completed: boolean;
  orientation?: "horizontal" | "vertical";
  showControls?: boolean;
}