import React from "react";

const MultiStepWizard = ({
  steps,
  currentStep,
  onStepChange,
  isStepValid,
  onNextStep,
  children,
}) => {
  return (
    <div>
      <div className="flex items-center mb-8 justify-center">
        {steps.map((step, idx) => (
          <button
            key={step.label}
            disabled={idx > currentStep + 1}
            className={`flex items-center px-4 py-2 rounded-full text-sm font-semibold mr-2 transition-colors duration-200
              ${
                idx === currentStep
                  ? "bg-blue-600 text-white shadow-lg"
                  : "bg-gray-200 text-gray-700"
              }
              ${
                idx > currentStep + 1
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-blue-100"
              }
              border-2 ${
                idx === currentStep ? "border-blue-700" : "border-transparent"
              }`}
            onClick={() => idx <= currentStep + 1 && onStepChange(idx)}
            aria-current={idx === currentStep ? "step" : undefined}
          >
            <span className="mr-2 w-6 h-6 flex items-center justify-center rounded-full border-2 border-blue-400 bg-white text-blue-700 font-bold">
              {idx + 1}
            </span>
            {step.label}
          </button>
        ))}
        <span className="ml-4 text-gray-500">
          Step {currentStep + 1} of {steps.length}
        </span>
      </div>
      <div>{children}</div>
      <div className="flex justify-end mt-8">
        {currentStep < steps.length - 1 && (
          <button
            type="button"
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 font-semibold"
            onClick={onNextStep}
            disabled={!isStepValid}
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default MultiStepWizard;
