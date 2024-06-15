import { SessionProvider } from 'next-auth/react';
import { ResultsProvider } from '../context/ResultsContext';
import '../styles/globals.css';
// SessionProvider
function MyApp({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
    <ResultsProvider>
      <Component {...pageProps} />
    </ResultsProvider>
    </SessionProvider>
  );
}

export default MyApp;
