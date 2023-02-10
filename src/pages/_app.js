import ConfirmationDialog from "@/components/ConfirmationDialog";
import Loader from "@/components/Loader";
import theme from "@/config/theme";
import { ConfirmProvider } from "@/contexts/ConfirmContext";
import Layout from "@/layouts/Layout";
import { wrapper } from "@/store";
import { CacheProvider } from "@emotion/react";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { Inter } from "@next/font/google";
import Head from "next/head";
import Router from "next/router";
import { useEffect, useState } from "react";
import { Provider } from "react-redux";
import createEmotionCache from "../config/createEmotionCache";

const inter = Inter({ subsets: ["latin"] });

import "@/styles/globals.css";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

const App = ({ Component, ...otherProps }) => {
  const { store, props } = wrapper.useWrappedStore(otherProps);
  const { emotionCache = clientSideEmotionCache, pageProps } = props;

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    Router.events.on("routeChangeStart", (url) => {
      setIsLoading(true);
    });

    Router.events.on("routeChangeComplete", (url) => {
      setIsLoading(false);
    });

    Router.events.on("routeChangeError", (url) => {
      setIsLoading(false);
    });
  }, []);

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <meta name="description" content="Employee Manager application" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Provider store={store}>
          <ConfirmProvider>
            <main className={inter.className}>
              <Layout>{isLoading ? <Loader /> : <Component {...pageProps} />}</Layout>

              <ConfirmationDialog />
            </main>
          </ConfirmProvider>
        </Provider>
      </ThemeProvider>
    </CacheProvider>
  );
};

export default App;
