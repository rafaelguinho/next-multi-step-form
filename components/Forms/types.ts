import { ObjectSchema } from "yup";
import { Assign, ObjectShape } from "yup/lib/object";

export interface WizardFormBaseProps {
  nextFormStep: () => void;
}

export interface FormsProps extends WizardFormBaseProps {
  formStep: number;
}

export interface MyFormsProps extends WizardFormBaseProps {
  children: React.ReactNode;
  initialData?: Record<string, any>;
  schema: ObjectSchema<Assign<ObjectShape, any>>;
}
