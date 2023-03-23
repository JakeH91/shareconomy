import styles from "@/styles/organisms/Auth.module.css";
import Link from "next/link";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { SubmitHandler, useForm } from "react-hook-form";

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
  const { register, handleSubmit } = useForm<SignInFormValues>();
  const onSubmit: SubmitHandler<SignInFormValues> = async (data) => {
    await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });
  };

  return (
    <>
      <h2>Sign in to get started</h2>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor={"email"}>Email:</label>
        <input
          type={"email"}
          id={"email"}
          {...register("email")}
          autoComplete={"email"}
        />
        <label htmlFor={"password"}>Password:</label>
        <input
          type={"password"}
          id={"password"}
          {...register("password")}
          autoComplete={"new-password"}
        />
        <input className={styles.button} type={"submit"} value={"Sign In"} />
      </form>
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
