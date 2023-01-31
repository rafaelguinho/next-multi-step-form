import React, { useRef } from "react";
import { Form } from "@unform/web";
import { useWizardFormData } from "@/context/wizard-form-context";
import { FormHandles } from "@unform/core";
import { MyWizardFormData } from "@/wizard-form-data";
import { MyFormsProps } from "../Forms/types";
import { handleSubmit } from "./actions";

const MyForm: React.FC<MyFormsProps> = ({
  nextFormStep,
  children,
  initialData,
  schema,
}: MyFormsProps) => {
  const { setFormValues } = useWizardFormData<MyWizardFormData>();
  const formRef = useRef<FormHandles>(null);

  return (
    <Form
      ref={formRef}
      onSubmit={(data) =>
        handleSubmit(data, formRef, schema, setFormValues, nextFormStep)
      }
      initialData={initialData}
    >
      {children}
    </Form>
  );
};

export default MyForm;
