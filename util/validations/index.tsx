import { WizardFormData } from "@/context/wizard-form-context";
import * as yup from "yup";

export const validateOneField = (
  schema: yup.ObjectSchema<any>,
  path: string,
  data: WizardFormData
): boolean => {
  try {
    schema.validateSyncAt(path, data, {
      abortEarly: true,
      context: data,
    });
  } catch (err) {
    if (err instanceof yup.ValidationError) {
      return false;
    }
  }

  return true;
};
