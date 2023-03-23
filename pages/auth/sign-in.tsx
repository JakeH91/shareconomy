import Head from "next/head";
import HomeStyles from "@/styles/pages/Home.module.css";
import AuthStyles from "@/styles/organisms/Auth.module.css";
import SignIn from "@/components/molecules/Auth/SignIn";

export default function SignInPage() {
  return (
    <div className={`page ${HomeStyles.container}`}>
      <Head>
        <title>Sign In - Shareconomy</title>
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
      </Head>
      <div className={AuthStyles.container}>
        <SignIn
          hrefs={{
            forgotPassword: "/auth/forgot-password",
            signUp: "/auth/sign-up",
          }}
        />
      </div>
    </div>
  );
}
