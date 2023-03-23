import styles from "@/styles/organisms/Auth.module.css";
import Link from "next/link";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { SubmitHandler, useForm } from "react-hook-form";

type SignUpProps = {
  href?: string;
  clickHandler?: () => void;
};

type SignUpFormValues = {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
};

export default function SignUp({
  href,
  clickHandler,
}: SignUpProps): React.ReactElement {
  const supabase = useSupabaseClient();
  const { register, handleSubmit } = useForm<SignUpFormValues>();
  const onSubmit: SubmitHandler<SignUpFormValues> = async (data) => {
    try {
      await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            first_name: data.first_name,
            last_name: data.last_name,
          },
        },
      });
    } catch (error) {
      console.log("Something went wrong:", error);
    }
  };

  return (
    <>
      <h2>Create an account to get started</h2>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor={"first_name"}>First Name:</label>
        <input
          type={"text"}
          id={"first_name"}
          {...register("first_name")}
          autoComplete={"given-name"}
        />
        <label htmlFor={"last_name"}>Last Name:</label>
        <input
          type={"text"}
          id={"last_name"}
          {...register("last_name")}
          autoComplete={"family-name"}
        />
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
        <input className={styles.button} type={"submit"} value={"Sign Up"} />
      </form>

      {href ? (
        <Link href={href}>{"Already have an account? Sign in"}</Link>
      ) : (
        <p onClick={clickHandler}>{"Already have an account? Sign in"}</p>
      )}
    </>
  );
}
