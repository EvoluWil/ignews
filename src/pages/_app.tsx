import React from "react";
import { AppProps } from "next/app";
import "../ui/styles/global.css";
import "react-toastify/dist/ReactToastify.css";
import { Provider as NextAuthProvider } from "next-auth/client";

import { Header } from "../ui/components/Header";
import { ToastContainer } from "react-toastify";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <NextAuthProvider session={pageProps.session}>
      <ToastContainer autoClose={3000} />
      <Header />
      <Component {...pageProps} />
    </NextAuthProvider>
  );
}

export default MyApp;
