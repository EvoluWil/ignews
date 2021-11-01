import React from "react";
import Head from "next/head";
import { GetServerSideProps } from "next";
import { RichText } from "prismic-dom";

import { PostContainer } from "../../ui/styles/pages/Post/Post";
import { getPrismicClient } from "../../services/prismic";
import { getSession } from "next-auth/client";
import { ParsedUrlQuery } from "querystring";
import { Post, PostContent } from "../../ui/styles/pages/Post/PostDetail";

interface PostProps {
  post: {
    slug: string;
    title: string;
    content: string;
    updatedAt: string;
  };
}

const PostsDetail = ({ post }: PostProps) => {
  return (
    <>
      <Head>
        <title>{post.title} | ig-news</title>
      </Head>
      <PostContainer>
        <Post>
          <h1>{post.title}</h1>
          <time>{post.updatedAt}</time>
          <PostContent dangerouslySetInnerHTML={{ __html: post.content }} />
        </Post>
      </PostContainer>
    </>
  );
};

export default PostsDetail;

export const getServerSideProps: GetServerSideProps = async ({
  req,
  params,
}) => {
  const session = await getSession({ req });

  const { slug } = params as ParsedUrlQuery;

  if (!session?.activeSubscription) {
    return {
      redirect: {
        destination: `posts/preview/${slug}`,
        permanent: false,
      },
    };
  }

  const prismic = getPrismicClient(req);

  const res = await prismic.getByUID("publication", slug as string, {});

  const post = {
    slug,

    title: RichText.asText(res.data.title),

    content: RichText.asHtml(res.data.content),

    updatedAt: new Date(res.last_publication_date as string).toLocaleDateString(
      "en-US",
      {
        day: "2-digit",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "numeric",
      }
    ),
  };
  return {
    props: { post },
  };
};
