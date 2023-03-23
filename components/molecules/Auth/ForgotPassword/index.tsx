import styles from "@/styles/organisms/Auth.module.css";
import Link from "next/link";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { SubmitHandler, useForm } from "react-hook-form";

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
  const { register, handleSubmit } = useForm<ForgotPasswordFormValues>();
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
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor={"email"}>Email:</label>
        <input
          type={"email"}
          id={"email"}
          {...register("email")}
          autoComplete={"email"}
        />
        <input className={styles.button} type={"submit"} value={"Send Email"} />
      </form>
      {href ? (
        <Link href={href}>{"< Back to sign in"}</Link>
      ) : (
        <p onClick={clickHandler}>{"< Back to sign in"}</p>
      )}
    </>
  );
}
