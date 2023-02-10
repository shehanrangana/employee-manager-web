import ConfirmationDialog from "@/components/ConfirmationDialog";
import { ConfirmProvider } from "@/contexts/ConfirmContext";
import Layout from "@/layouts/Layout";
import { wrapper } from "@/store";
import { CacheProvider } from "@emotion/react";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { Inter } from "@next/font/google";
import Head from "next/head";
import { Provider } from "react-redux";
import createEmotionCache from "../config/createEmotionCache";
import theme from "../config/theme";

const inter = Inter({ subsets: ["latin"] });

import "@/styles/globals.css";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

const App = ({ Component, ...otherProps }) => {
  const { store, props } = wrapper.useWrappedStore(otherProps);
  const { emotionCache = clientSideEmotionCache, pageProps } = props;

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
              <Layout>
                <Component {...pageProps} />
              </Layout>

              <ConfirmationDialog />
            </main>
          </ConfirmProvider>
        </Provider>
      </ThemeProvider>
    </CacheProvider>
  );
};

export default App;
