import React from "react";
import * as yup from "yup";
import { useWizardFormData } from "@/context/wizard-form-context";
import Input from "@/components/Input";
import { FormsProps } from "../types";
import { MyWizardFormData } from "@/wizard-form-data";
import MyForm from "@/components/MyForm";

const schema = yup.object().shape({
  address: yup
    .string()
    .min(2, "Address is too short")
    .required("Address is required"),
});

const BillingInfo: React.FC<FormsProps> = ({ nextFormStep }: FormsProps) => {
  const { setFormValues, data } = useWizardFormData<MyWizardFormData>();

  return (
    <div>
      <h2>Billing Info</h2>
      <MyForm nextFormStep={nextFormStep} initialData={data} schema={schema}>
        <div>
          <Input
            name="address"
            label="Address"
            type="address"
            onBlur={(e: React.FormEvent<HTMLInputElement>) => {
              const newData = {
                address: (e.target as HTMLInputElement).value,
              };
              setFormValues(newData);
            }}
          />
        </div>
        <button type="submit">Next</button>
      </MyForm>
    </div>
  );
};

export default BillingInfo;
