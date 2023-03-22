import Head from "next/head";
import styles from "@/styles/pages/Home.module.css";

export default function Loading() {
  return (
    <div className={`page ${styles.container}`}>
      <Head>
        <title>Loading...</title>
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
      <main>
        <h1>LOADING</h1>
      </main>
    </div>
  );
}
