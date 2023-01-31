import React from "react";
import * as yup from "yup";
import { useWizardFormData } from "@/context/wizard-form-context";
import { FormsProps } from "../types";
import Checkbox from "@/components/CheckBox";
import { MyWizardFormData } from "@/wizard-form-data";
import MyForm from "@/components/MyForm";

const schema = yup.object().shape({
  ready: yup.bool().oneOf([true], "Checkbox is required"),
});

const ConfirmPurchase: React.FC<FormsProps> = ({
  nextFormStep,
}: FormsProps) => {
  const { setFormValues, data } = useWizardFormData<MyWizardFormData>();

  return (
    <div>
      <h2>Confirm Purchase</h2>

      <MyForm nextFormStep={nextFormStep} initialData={data} schema={schema}>
        <Checkbox
          name="ready"
          label="Ready to go?"
          defaultChecked={data?.ready}
          onBlur={(e: React.FormEvent<HTMLInputElement>) => {
            const newData = {
              ready: (e.target as HTMLInputElement).checked,
            };
            setFormValues(newData);
          }}
        />

        <button type="submit">Confirm purchase</button>
      </MyForm>
    </div>
  );
};

export default ConfirmPurchase;
