import styles from "@/styles/organisms/Auth.module.css";
import { useForm } from "react-hook-form";
import { useState } from "react";

type AuthProps = {};

export default function Auth({}: AuthProps): React.ReactElement {
  const [authState, setAuthState] = useState<
    "sign-up" | "sign-in" | "forgot-password"
  >("sign-up");

  function ForgotPassword() {
    const { register, handleSubmit } = useForm();
    const onSubmit = (data) => alert(JSON.stringify(data));
    return (
      <>
        <h2>
          Create an account to subscribe to the monthly development newsletter
        </h2>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor={"first"}>First name:</label>
          <input type={"text"} id={"first"} {...register("first")} />
          <input type={"submit"} value={"Sign Up"} />
        </form>
        <p onClick={() => setAuthState("sign-in")}>{"< Back to sign in"}</p>
      </>
    );
  }

  function SignIn() {
    const { register, handleSubmit } = useForm();
    const onSubmit = (data) => alert(JSON.stringify(data));
    return (
      <>
        <h2>
          Create an account to subscribe to the monthly development newsletter
        </h2>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor={"first"}>First name:</label>
          <input type={"text"} id={"first"} {...register("first")} />
          <input type={"submit"} value={"Sign Up"} />
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

  function SignUp() {
    const { register, handleSubmit } = useForm();
    const onSubmit = (data) => alert(JSON.stringify(data));
    return (
      <>
        <h2>
          Create an account to subscribe to the monthly development newsletter
        </h2>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor={"first"}>First name:</label>
          <input type={"text"} id={"first"} {...register("first")} />
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
