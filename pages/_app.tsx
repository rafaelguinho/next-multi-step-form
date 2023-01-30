import WizardFormProvider from "@/context/wizard-form-context";
import "@/styles/globals.css";
//import WizardFormProvider from "@/wizard-form-data";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <WizardFormProvider>
      <Component {...pageProps} />
    </WizardFormProvider>
  );
}
