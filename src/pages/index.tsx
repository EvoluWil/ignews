import React from "react";
import { GetServerSideProps, GetStaticProps } from "next";
import { stripe } from "../services/stripe";
import Head from "next/head";
import { SubscribeButton } from "../ui/components/SubscribeButton";
import { SectionContainer, ContentContainer } from "../ui/styles/pages/Home";

interface HomeProps {
  product: {
    priceId: string;
    amount: number;
  };
}

export default function Home({ product }: HomeProps) {
  return (
    <>
      <Head>
        <title>Home | ig-news</title>
      </Head>{" "}
      <ContentContainer>
        <SectionContainer>
          <span>
            👏 Hey, welcome
            <h1>
              News about the <span> React </span> world.
            </h1>
            <p>
              Get access to all the publications <br />
              <span>for {product?.amount} month</span>
            </p>
          </span>
          <SubscribeButton priceId={product.priceId} />
        </SectionContainer>
        <img src="/images/avatar.svg" alt="Girl coding" />
      </ContentContainer>
    </>
  );
}

// client side
// server side
// static site generation

export const getStaticProps: GetStaticProps = async () => {
  const price = await stripe.prices.retrieve("price_1JqGVyJi3hQnQd2hWIpr7sem", {
    expand: ["product"],
  });

  const product = {
    priceId: price.id,
    amount: new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format((price.unit_amount as number) / 100),
  };
  return {
    props: {
      product,
    },
    revalidate: 60 * 60 * 24, // 24 hours
  };
};
