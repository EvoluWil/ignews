import React from "react";
import { AppProps } from "next/app";
import "../ui/styles/global.css";
import { Header } from "../ui/components/Header";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Header />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
