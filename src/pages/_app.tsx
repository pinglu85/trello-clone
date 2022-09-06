import type { AppProps } from 'next/app';

import '../styles/globals.css';

function TrelloCloneApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default TrelloCloneApp;
