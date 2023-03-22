import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider, Session } from "@supabase/auth-helpers-react";
import React, { useState } from "react";
import { AppProps } from "next/app";
import "@/styles/pages/globals.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import NavBar from "@/components/molecules/NavBar";
config.autoAddCss = false;

function App({
  Component,
  pageProps,
}: AppProps<{
  initialSession: Session;
}>) {
  const [supabaseClient] = useState(() => createBrowserSupabaseClient());

  return (
    <SessionContextProvider
      supabaseClient={supabaseClient}
      initialSession={pageProps.initialSession}
    >
      <>
        <NavBar />
        <Component {...pageProps} />
      </>
    </SessionContextProvider>
  );
}
export default App;
