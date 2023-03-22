import Head from "next/head";
import styles from "@/styles/pages/Home.module.css";
import useGetProfile from "utils/hooks/useGetProfile";
import { useSession } from "@supabase/auth-helpers-react";
import Loading from "@/components/organisms/Loading";
import Account from "@/components/molecules/Account";
import Router from "next/router";

export default function Profile() {
  const session = useSession();
  const [profile, isLoading, error] = useGetProfile(session);

  if (error) {
    Router.push("/");
  }

  if (isLoading || profile === null) {
    return <Loading />;
  }

  return (
    <div className={`page ${styles.container}`}>
      <Head>
        <title>{profile?.first_name} | Shareconomy</title>
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
        <Account profileData={profile} />
      </main>
    </div>
  );
}
