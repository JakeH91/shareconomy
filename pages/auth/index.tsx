import Head from "next/head";
import styles from "@/styles/pages/Home.module.css";
import Auth from "@/components/organisms/Auth";

export default function AuthPage({
  form,
}: {
  form?: "sign-up" | "sign-in" | "forgot-password";
}) {
  return (
    <div className={`page ${styles.container}`}>
      <Head>
        <title>Shareconomy</title>
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
      <Auth form={form} />
    </div>
  );
}

export async function getServerSideProps(context) {
  return {
    props: {
      form: context?.query?.form ?? null,
    },
  };
}
