import Head from "next/head";
import styles from "@/styles/pages/Home.module.css";
import NavBar from "@/components/molecules/NavBar";
import { useSession } from "@supabase/auth-helpers-react";
import Account from "@/components/molecules/Account";
import HomePageSignedOut from "@/components/organisms/HomePage/SignedOut";

export default function Home() {
  const session = useSession();

  return (
    <div className={styles.container}>
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
      <NavBar />
      {!session ? <HomePageSignedOut /> : <Account session={session} />}
    </div>
  );
}
