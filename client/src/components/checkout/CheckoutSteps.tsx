import { Check } from "lucide-react";

interface CheckoutStep {
  id: number;
  title: string;
  completed: boolean;
}

interface CheckoutStepsProps {
  steps: CheckoutStep[];
  currentStep: number;
}

export default function CheckoutSteps({ steps, currentStep }: CheckoutStepsProps) {
  return (
    <div className="mb-8">
      <div className="flex items-center ">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center">
            <div
              className={`px-6 py-3 rounded-full transition-all duration-300 font-medium text-sm ${
                step.completed
                  ? "bg-primary text-white"
                  : currentStep === step.id
                  ? "bg-primary text-white"
                  : "bg-whitetext-gray-500 border border-gray-200"
              }`}
            >
              {step.completed ? (
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4" />
                  <span>{step.title}</span>
                </div>
              ) : (
                <span>
                  {currentStep === step.id ? step.title : `0${step.id}`}
                </span>
              )}
            </div>
            {index < steps.length - 1 && (
              <div
                className={`w-16 h-0.5 mx-4 ${
                  step.completed ? "bg-primary" : "bg-gray-200"
                }`}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
