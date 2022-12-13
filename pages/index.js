import Head from "next/head";
import styles from "@/styles/pages/Home.module.css";
import NavBar from "@/components/molecules/NavBar";

export default function Home() {
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
        <img
          src="/under-construction.svg"
          alt="Road sign to indicate construction work"
        />
        <h1>This site is currently under construction!</h1>
        <h2>What is being constructed?</h2>
        <p className={styles.moreInfo}>
          Using this site, you will be able to lend items to your neighbours as
          they need them, and borrow items as you do. The goal is to rekindle
          closeness within communities, and help everyone save a little money on
          the side.
        </p>
        <h2>How can I find out what's coming next?</h2>
        <p className={styles.moreInfo}>
          If you'd like to watch my development process, and hear about my
          struggles, I post (semi) regular videos on my{" "}
          <a href="https://www.youtube.com/@thejakery" target={"_blank"}>
            YouTube channel
          </a>
          , subscribe if you want to follow the journey.
        </p>
      </main>
    </div>
  );
}
