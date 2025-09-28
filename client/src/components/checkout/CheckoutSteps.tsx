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
    <div className="mb-6 lg:mb-8">
      <div className="flex items-center justify-center md:justify-start overflow-x-auto scrollbar-hide lg:overflow-visible">
        <div className="flex items-center min-w-max lg:min-w-0">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center flex-shrink-0">
              <div
                className={`px-3 lg:px-6 py-2 lg:py-3 rounded-full transition-all duration-300 font-medium text-xs lg:text-sm whitespace-nowrap ${
                  step.completed
                    ? "bg-primary text-white"
                    : currentStep === step.id
                    ? "bg-primary text-white"
                    : "bg-white text-gray-500 border border-gray-200"
                }`}
              >
                {step.completed ? (
                  <div className="flex items-center gap-1 lg:gap-2">
                    <Check className="w-3 h-3 lg:w-4 lg:h-4 flex-shrink-0" />
                    <span className="hidden sm:inline">{step.title}</span>
                    <span className="sm:hidden">{step.id}</span>
                  </div>
                ) : (
                  <span>
                    {currentStep === step.id ? (
                      <span className="hidden sm:inline">{step.title}</span>
                    ) : (
                      `0${step.id}`
                    )}
                    {currentStep === step.id && <span className="sm:hidden ml-1">{step.id}</span>}
                  </span>
                )}
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`w-8 lg:w-16 h-0.5 mx-2 lg:mx-4 flex-shrink-0 ${
                    step.completed ? "bg-primary" : "bg-gray-200"
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="lg:hidden mt-3 text-center">
        <p className="text-xs text-gray-500">
          Passo {currentStep} de {steps.length}: {steps.find(s => s.id === currentStep)?.title}
        </p>
      </div>
    </div>
  );
}
