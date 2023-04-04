import "../styles/globals.css";
import "../styles/blog.scss";
import "remixicon/fonts/remixicon.css";
import "highlight.js/styles/night-owl.css";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name='theme-color' content='#161A26' />
        <meta name='msapplication-navbutton-color' content='#161A26' />
        <meta name='apple-mobile-web-app-status-bar-style' content='#161A26' />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
