import React, { useRef } from "react";
import { Form } from "@unform/web";
import * as yup from "yup";
import { useWizardFormData } from "@/context/wizard-form-context";
import { FormHandles } from "@unform/core";
import Input from "@/components/Input";
import { FormsProps } from "../types";
import { MyWizardFormData } from "@/wizard-form-data";

const schema = yup.object().shape({
  address: yup
    .string()
    .min(2, "Address is too short")
    .required("Address is required"),
});

const BillingInfo: React.FC<FormsProps> = ({ nextFormStep }: FormsProps) => {
  const { setFormValues, data } = useWizardFormData<MyWizardFormData>();
  const formRef = useRef<FormHandles>(null);

  async function handleSubmit(data: MyWizardFormData) {
    try {
      formRef?.current?.setErrors({});

      await schema.validate(data, {
        abortEarly: false,
      });
      // Validation passed - do something with data
      setFormValues(data);
      nextFormStep();
    } catch (err) {
      const errors: { [k: string]: string } = {};
      // Validation failed - do show error
      if (err instanceof yup.ValidationError) {
        const validationErrors = err as yup.ValidationError;
        console.log(validationErrors.inner);
        // Validation failed - do show error

        validationErrors.inner.forEach((error) => {
          if (error.path) {
            errors[error.path] = error.message;
          }
        });
        formRef?.current?.setErrors(errors);
      }
    }
  }

  return (
    <div>
      <h2>Billing Info</h2>
      <Form ref={formRef} onSubmit={handleSubmit} initialData={data}>
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
      </Form>
    </div>
  );
};

export default BillingInfo;
