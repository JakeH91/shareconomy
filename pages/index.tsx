import Head from "next/head";
import styles from "@/styles/pages/Home.module.css";
import { useSession } from "@supabase/auth-helpers-react";
import HomePageSignedOut from "@/components/organisms/HomePage/SignedOut";
import HomePageSignedIn from "@/components/organisms/HomePage/SignedIn";

export default function Home() {
  const session = useSession();

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
      {!session ? <HomePageSignedOut /> : <HomePageSignedIn />}
    </div>
  );
}
