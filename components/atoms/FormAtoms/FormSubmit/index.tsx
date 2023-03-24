import { useForm, FormProvider, SubmitHandler } from "react-hook-form";

type FormSubmitProps = {
  styles?: { readonly [key: string]: string };
  onSubmit: SubmitHandler<any>;
  children: React.ReactElement;
  buttonText: string;
};

export default function FormSubmit({
  styles,
  onSubmit,
  children,
  buttonText,
}: FormSubmitProps): React.ReactElement {
  const methods = useForm();

  return (
    <FormProvider {...methods}>
      <form className={styles?.form} onSubmit={methods.handleSubmit(onSubmit)}>
        {children}
        <input className={styles?.button} type={"submit"} value={buttonText} />
      </form>
    </FormProvider>
  );
}
