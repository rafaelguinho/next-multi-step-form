import { MyWizardFormData } from "@/wizard-form-data";
import { FormHandles } from "@unform/core";
import { ObjectSchema, ValidationError } from "yup";
import { Assign, ObjectShape } from "yup/lib/object";

export async function handleSubmit(
  data: MyWizardFormData,
  formRef: React.RefObject<FormHandles>,
  schema: ObjectSchema<Assign<ObjectShape, any>>,
  setFormValues: (values: MyWizardFormData) => void,
  nextFormStep: () => void
) {
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
    if (err instanceof ValidationError) {
      const validationErrors = err as ValidationError;

      validationErrors.inner.forEach((error) => {
        if (error.path) {
          errors[error.path] = error.message;
        }
      });
      formRef?.current?.setErrors(errors);
    }
  }
}
