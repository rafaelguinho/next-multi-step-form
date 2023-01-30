import { WizardFormData } from "@/context/wizard-form-context";

export interface MyWizardFormData extends WizardFormData {
  address?: string;
  email?: string;
  ready?: boolean;
}
