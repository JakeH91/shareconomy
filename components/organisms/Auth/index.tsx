import styles from "@/styles/organisms/Auth.module.css";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useForm, SubmitHandler, SubmitErrorHandler } from "react-hook-form";
import { useState } from "react";

type AuthProps = {};

export default function Auth({}: AuthProps): React.ReactElement {
  const supabase = useSupabaseClient();
  const [authState, setAuthState] = useState<
    "sign-up" | "sign-in" | "forgot-password"
  >("sign-up");

  type ForgotPasswordFormValues = {
    email: string;
  };

  function ForgotPassword() {
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
        <h2>
          Create an account to subscribe to the monthly development newsletter
        </h2>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor={"email"}>Email:</label>
          <input
            type={"email"}
            id={"email"}
            {...register("email")}
            autoComplete={"email"}
          />
          <input className={styles.button} type={"submit"} value={"Sign In"} />
        </form>
        <p onClick={() => setAuthState("sign-in")}>{"< Back to sign in"}</p>
      </>
    );
  }

  type SignInFormValues = {
    email: string;
    password: string;
  };

  function SignIn() {
    const { register, handleSubmit } = useForm<SignInFormValues>();
    const onSubmit: SubmitHandler<SignInFormValues> = async (data) => {
      await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });
    };

    return (
      <>
        <h2>
          Create an account to subscribe to the monthly development newsletter
        </h2>
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
        <div>
          <p onClick={() => setAuthState("forgot-password")}>
            {"Forgot your password?"}
          </p>
          <p onClick={() => setAuthState("sign-up")}>
            {"Don't have an account? Sign up"}
          </p>
        </div>
      </>
    );
  }

  type SignUpFormValues = {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
  };

  function SignUp() {
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
        <h2>
          Create an account to subscribe to the monthly development newsletter
        </h2>
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
        <p onClick={() => setAuthState("sign-in")}>
          {"Already have an account? Sign in"}
        </p>
      </>
    );
  }

  const formContent = {
    "forgot-password": <ForgotPassword />,
    "sign-in": <SignIn />,
    "sign-up": <SignUp />,
  };

  return <div className={styles.container}>{formContent[authState]}</div>;
}
