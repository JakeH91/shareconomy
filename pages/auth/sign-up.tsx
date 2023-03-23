import Head from "next/head";
import HomeStyles from "@/styles/pages/Home.module.css";
import AuthStyles from "@/styles/organisms/Auth.module.css";
import SignUp from "@/components/molecules/Auth/SignUp";

export default function SignUpPage() {
  return (
    <div className={`page ${HomeStyles.container}`}>
      <Head>
        <title>Sign Up - Shareconomy</title>
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
        <SignUp href={"/auth/sign-in"} />
      </div>
    </div>
  );
}
