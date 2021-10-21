/**
 * This file can mostly be ignored, as it just sets up the basic app shell
 * and UI library.
 *
 * The one important thing that happens here is the `RelayEnvironmentProvider`,
 * which provides the Relay environment to all child components.
 */

import type { AppProps } from "next/app";
import React, { useEffect, useState } from "react";
import Head from "next/head";
import { RelayEnvironmentProvider } from "relay-hooks";
import {
  Global,
  GlobalStyles,
  MantineProvider,
  NormalizeCSS,
} from "@mantine/core";
import { relayEnvironment } from "../relayEnvironment";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ClientOnly>
      <RelayEnvironmentProvider environment={relayEnvironment}>
        <Head>
          <title>Relay Workshop</title>
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width"
          />
        </Head>

        <MantineProvider theme={{ colorScheme: "light" }}>
          <NormalizeCSS />
          <GlobalStyles />
          <Global
            styles={(theme) => ({
              body: {
                backgroundColor: theme.colors.gray[1],
              },
            })}
          />
          <Component {...pageProps} />
        </MantineProvider>
      </RelayEnvironmentProvider>
    </ClientOnly>
  );
}

/**
 * This is a hack that basically avoids us having to talk about the implications
 * of server-side-rendering with Relay, as it is not relevant for this demo.
 * You can safely ignore it.
 */
function ClientOnly({ children }: { children: React.ReactNode }) {
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    setShouldRender(true);
  }, []);

  if (shouldRender) return <>{children}</>;

  return null;
}
