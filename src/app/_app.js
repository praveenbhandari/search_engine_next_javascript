import { ResultsProvider } from '../context/ResultsContext';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <ResultsProvider>
      <Component {...pageProps} />
    </ResultsProvider>
  );
}

export default MyApp;
