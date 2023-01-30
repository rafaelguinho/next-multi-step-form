import { createContext, useContext, useState } from "react";

export interface WizardFormData {}

export interface WizardFormContextProps<
  TWizardFormData extends WizardFormData = WizardFormData
> {
  data?: TWizardFormData;
  setFormValues: (values: TWizardFormData) => void;
}

export const WizardFormContextProps = createContext<
  WizardFormContextProps<WizardFormData> | undefined
>(undefined);

export type WizardFormProviderProps = {
  children: React.ReactNode;
};

export default function WizardFormProvider<
  TWizardFormData extends WizardFormData = WizardFormData
>({ children }: WizardFormProviderProps) {
  const [data, setData] = useState({} as TWizardFormData);

  const setFormValues = (values: any) => {
    setData((prevValues) => ({
      ...prevValues,
      ...values,
    }));
  };

  return (
    <WizardFormContextProps.Provider value={{ data, setFormValues }}>
      {children}
    </WizardFormContextProps.Provider>
  );
}

export const useWizardFormData = <
  TWizardFormData extends WizardFormData = WizardFormData
>() => {
  const context = useContext(WizardFormContextProps);
  if (context === undefined) {
    throw new Error("useWizardFormData must be used within a provider");
  }
  return context as unknown as WizardFormContextProps<TWizardFormData>;
};
