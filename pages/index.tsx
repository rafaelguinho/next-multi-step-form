import BillingInfo from "@/components/Forms/BillingInfo";
import ConfirmPurchase from "@/components/Forms/ConfirmPurchase";
import PersonalInfo from "@/components/Forms/PersonalInfo";
import { FormsProps } from "@/components/Forms/types";
import FormWizard from "@/components/FormWizard";
import Head from "next/head";
import { useState } from "react";

const steps: Record<string, React.FC<FormsProps>> = {
  foo: PersonalInfo,
  bill: BillingInfo,
  final: ConfirmPurchase,
};

const stepKeys = Object.keys(steps);
const stepsLength = stepKeys.length;
const maxStepIndex = stepsLength - 1;

export default function Home() {
  const [formStep, setFormStep] = useState(0);

  const nextFormStep = () =>
    setFormStep((currentStep) =>
      currentStep < maxStepIndex ? currentStep + 1 : (currentStep = currentStep)
    );

  const prevFormStep = () =>
    setFormStep((currentStep) =>
      currentStep > 0 ? currentStep - 1 : (currentStep = currentStep)
    );

  const CurrentStepForm = steps[stepKeys[formStep]];

  return (
    <div>
      <Head>
        <title>Unform Multi Step Form</title>
      </Head>
      <h1>Unform Multi Step Form</h1>

      <FormWizard
        currentStep={formStep}
        stepsLength={stepsLength}
        prevFormStep={prevFormStep}
      >
        <CurrentStepForm formStep={formStep} nextFormStep={nextFormStep} />
      </FormWizard>
    </div>
  );
}
