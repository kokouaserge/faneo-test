import type { AppProps } from "next/app";
import React from "react";
import { Provider } from "react-redux";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import ThemeProvider from "../theme/ThemeProviderWrapper";
import { SnackbarProvider } from "notistack";
import { CssBaseline } from "@mui/material";

import ScrollTop from "../hooks/useScrollTop";
import store from "../store";
import App from "../layouts/App";
import Authenticated from "../components/Authenticated/Authenticated";

function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = React.useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <Provider store={store}>
          <ThemeProvider>
            <ScrollTop />
            <SnackbarProvider
              maxSnack={6}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
            >
              <CssBaseline />
              <Authenticated>
                <App>
                  <Component {...pageProps} />
                </App>
              </Authenticated>
            </SnackbarProvider>
          </ThemeProvider>
        </Provider>
      </Hydrate>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default MyApp;
