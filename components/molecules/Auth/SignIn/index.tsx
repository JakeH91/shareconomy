import styles from "@/styles/organisms/Auth.module.css";
import Link from "next/link";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { SubmitHandler } from "react-hook-form";
import FormSubmit from "@/components/atoms/FormAtoms/FormSubmit";
import InputWithLabel from "@/components/atoms/FormAtoms/InputWithLabel";

type SignInProps = {
  hrefs?: {
    forgotPassword: string;
    signUp: string;
  };
  clickHandlers?: {
    forgotPassword: () => void;
    signUp: () => void;
  };
};

type SignInFormValues = {
  email: string;
  password: string;
};

export default function SignIn({
  hrefs,
  clickHandlers,
}: SignInProps): React.ReactElement {
  const supabase = useSupabaseClient();
  const onSubmit: SubmitHandler<SignInFormValues> = async (data) => {
    await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });
  };

  return (
    <>
      <h2>Sign in to get started</h2>
      <FormSubmit onSubmit={onSubmit} styles={styles} buttonText={"Sign In"}>
        <>
          <InputWithLabel
            id={"email"}
            label={"Email:"}
            type={"email"}
            autoComplete={"email"}
          />
          <InputWithLabel
            id={"password"}
            label={"Password:"}
            type={"password"}
            autoComplete={"new-password"}
          />
        </>
      </FormSubmit>
      {hrefs ? (
        <>
          <Link href={hrefs.forgotPassword}>{"Forgot your password?"}</Link>
          <Link href={hrefs.signUp}>{"Don't have an account? Sign up"}</Link>
        </>
      ) : (
        <>
          <p onClick={clickHandlers.forgotPassword}>
            {"Forgot your password?"}
          </p>
          <p onClick={clickHandlers.signUp}>
            {"Don't have an account? Sign up"}
          </p>
        </>
      )}
    </>
  );
}
