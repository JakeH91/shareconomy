import Head from "next/head";
import HomeStyles from "@/styles/pages/Home.module.css";
import AuthStyles from "@/styles/organisms/Auth.module.css";
import ForgotPassword from "@/components/molecules/Auth/ForgotPassword";

export default function ForgotPasswordPage() {
  return (
    <div className={`page ${HomeStyles.container}`}>
      <Head>
        <title>Forgot Password - Shareconomy</title>
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
        <ForgotPassword href={"/auth/sign-in"} />
      </div>
    </div>
  );
}
