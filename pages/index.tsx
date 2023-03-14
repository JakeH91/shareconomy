import Head from "next/head";
import styles from "@/styles/pages/Home.module.css";
import NavBar from "@/components/molecules/NavBar";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import Auth from "@/components/organisms/Auth";

export default function Home() {
  const session = useSession();
  const supabase = useSupabaseClient();

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
      <main className={styles.main}>
        <div className={styles.left}>
          <h1>Shareconomy - Coming soon!</h1>
          <h2>Share your stuff</h2>
          <p className={styles.moreInfo}>
            {
              "There's a high chance that, between all of you, your neighbourhood has everything it needs in abundance. Whether it's tools, books, or boardgames, most of these things are just sitting around gathering dust. If we all share what we have, they'll be no more wasted items, and everyone will save a bit of money in the process."
            }
          </p>
          <h2>Lend a hand</h2>
          <p className={styles.moreInfo}>
            {
              "Maybe there's someone in your neighbourhood that can help you paint that room you've bene meaning to paint. Or perhaps there is a dog next door that would just love for you to take it on a walk. We all have skills that we can use to help out our community in one way or another. Shareconomy offers you the chance to do just that."
            }
          </p>
        </div>
        <div className={styles.right}>
          <Auth />
        </div>
      </main>
    </div>
  );
}
