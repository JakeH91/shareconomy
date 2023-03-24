import { useForm, FormProvider } from "react-hook-form";

type FormUpdateProps = {
  styles?: { readonly [key: string]: string };
  updateClicked: () => void;
  children: React.ReactElement;
  buttonDisabled: boolean;
  buttonText: string;
};

export default function FormUpdate({
  styles,
  updateClicked,
  children,
  buttonDisabled,
  buttonText,
}: FormUpdateProps): React.ReactElement {
  const methods = useForm();

  return (
    <FormProvider {...methods}>
      <form className={styles?.form}>{children}</form>
    </FormProvider>
  );
}
