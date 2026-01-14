import type { AppProps } from 'next/app';
import '../index.css'; // Assuming we reuse the existing css or create a global one

export default function App({ Component, pageProps }: AppProps) {
    return <Component {...pageProps} />;
}
