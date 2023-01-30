import React from "react";

interface FormWizardProps {
  children: React.ReactNode;
  currentStep: number;
  stepsLength: number;
  prevFormStep: () => void;
}

const FormWizard: React.FC<FormWizardProps> = ({
  children,
  currentStep,
  stepsLength,
  prevFormStep,
}) => {
  return (
    <div>
      {currentStep < stepsLength && (
        <>
          {currentStep > 0 && (
            <button onClick={prevFormStep} type="button">
              back
            </button>
          )}

          <span>Step {currentStep + 1} of {stepsLength}</span>
        </>
      )}
      {children}
    </div>
  );
};

export default FormWizard;
