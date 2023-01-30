import React, { useRef } from "react";
import { Form } from "@unform/web";
import * as yup from "yup";
import {
  useWizardFormData,
} from "@/context/wizard-form-context";
import { FormHandles } from "@unform/core";
import { FormsProps } from "../types";
import Checkbox from "@/components/CheckBox";
import { MyWizardFormData } from "@/wizard-form-data";

const schema = yup.object().shape({
  ready: yup.bool().oneOf([true], "Checkbox is required"),
});

const ConfirmPurchase: React.FC<FormsProps> = ({
  nextFormStep,
}: FormsProps) => {
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
      <h2>Confirm Purchase</h2>

      <Form ref={formRef} onSubmit={handleSubmit} initialData={data}>
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
      </Form>
    </div>
  );
};

export default ConfirmPurchase;
