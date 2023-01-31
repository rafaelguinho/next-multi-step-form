import React from "react";
import * as yup from "yup";
import { useWizardFormData } from "@/context/wizard-form-context";
import Input from "@/components/Input";
import { FormsProps } from "../types";
import { MyWizardFormData } from "@/wizard-form-data";
import MyForm from "@/components/MyForm";

const schema = yup.object().shape({
  email: yup.string().email().required("Email is required"),
});

const PersonalInfo: React.FC<FormsProps> = ({ nextFormStep }: FormsProps) => {
  const { setFormValues, data } = useWizardFormData<MyWizardFormData>();

  return (
    <div>
      <h2>Personal Info</h2>
      <MyForm nextFormStep={nextFormStep} initialData={data} schema={schema}>
        <div>
          <Input
            name="email"
            label="Email"
            type="email"
            onBlur={(e: React.FormEvent<HTMLInputElement>) => {
              const newData = {
                email: (e.target as HTMLInputElement).value,
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

export default PersonalInfo;
