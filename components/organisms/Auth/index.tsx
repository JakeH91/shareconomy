import styles from "@/styles/organisms/Auth.module.css";
import { useState } from "react";
import ForgotPassword from "@/components/molecules/Auth/ForgotPassword";
import SignIn from "@/components/molecules/Auth/SignIn";
import SignUp from "@/components/molecules/Auth/SignUp";

export default function Auth(): React.ReactElement {
  const [authState, setAuthState] = useState<
    "sign-up" | "sign-in" | "forgot-password"
  >("sign-up");

  const formContent = {
    "forgot-password": (
      <ForgotPassword clickHandler={() => setAuthState("sign-in")} />
    ),
    "sign-in": (
      <SignIn
        clickHandlers={{
          forgotPassword: () => setAuthState("forgot-password"),
          signUp: () => setAuthState("sign-up"),
        }}
      />
    ),
    "sign-up": <SignUp clickHandler={() => setAuthState("sign-in")} />,
  };

  return <div className={styles.container}>{formContent[authState]}</div>;
}
