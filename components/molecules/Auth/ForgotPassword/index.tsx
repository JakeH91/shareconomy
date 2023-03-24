import styles from "@/styles/organisms/Auth.module.css";
import Link from "next/link";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { SubmitHandler } from "react-hook-form";
import FormSubmit from "@/components/atoms/FormAtoms/FormSubmit";
import InputWithLabel from "@/components/atoms/FormAtoms/InputWithLabel";

type ForgotPasswordProps = {
  href?: string;
  clickHandler?: () => void;
};

type ForgotPasswordFormValues = {
  email: string;
};

export default function ForgotPassword({
  href,
  clickHandler,
}: ForgotPasswordProps): React.ReactElement {
  const supabase = useSupabaseClient();
  const onSubmit: SubmitHandler<ForgotPasswordFormValues> = async (data) => {
    try {
      await supabase.auth.resetPasswordForEmail(data.email);
    } catch (error) {
      console.log("Something went wrong:", error);
    }
  };
  return (
    <>
      <h2>Forgot your password? We'll send you an email</h2>
      <FormSubmit onSubmit={onSubmit} styles={styles} buttonText={"Send Email"}>
        <InputWithLabel
          id={"email"}
          label={"Email:"}
          type={"email"}
          autoComplete={"email"}
        />
      </FormSubmit>
      {href ? (
        <Link href={href}>{"< Back to sign in"}</Link>
      ) : (
        <p onClick={clickHandler}>{"< Back to sign in"}</p>
      )}
    </>
  );
}
