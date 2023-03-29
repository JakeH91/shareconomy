import styles from "@/styles/organisms/Auth.module.css";
import Link from "next/link";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { SubmitHandler } from "react-hook-form";
import FormSubmit from "@/components/atoms/FormAtoms/FormSubmit";
import InputWithLabel from "@/components/atoms/FormAtoms/InputWithLabel";

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

  // TODO: change state to "Verication email sent" or some such thing
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
      <FormSubmit onSubmit={onSubmit} styles={styles} buttonText={"Sign Up"}>
        <>
          <InputWithLabel
            id={"first_name"}
            label={"First Name:"}
            type={"text"}
            autoComplete={"given-name"}
          />
          <InputWithLabel
            id={"last_name"}
            label={"Last Name:"}
            type={"text"}
            autoComplete={"family-name"}
          />
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
      {href ? (
        <Link href={href}>{"Already have an account? Sign in"}</Link>
      ) : (
        <p onClick={clickHandler}>{"Already have an account? Sign in"}</p>
      )}
    </>
  );
}
