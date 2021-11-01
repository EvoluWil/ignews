import React, { useEffect } from "react";
import Head from "next/head";
import { GetStaticProps } from "next";
import { RichText } from "prismic-dom";

import { PostContainer } from "../../../ui/styles/pages/Post/Post";
import { getPrismicClient } from "../../../services/prismic";
import { ParsedUrlQuery } from "querystring";
import {
  CotinueReading,
  Post,
  PostContent,
} from "../../../ui/styles/pages/Post/PostDetail";
import Link from "next/link";
import { useSession } from "next-auth/client";
import { useRouter } from "next/router";
import { redirect } from "next/dist/server/api-utils";

interface PostPreviewProps {
  post: {
    slug: string;
    title: string;
    content: string;
    updatedAt: string;
  };
}

const PostsPreviewDetail = ({ post }: PostPreviewProps) => {
  const [session] = useSession();
  const route = useRouter();

  useEffect(() => {
    if (session?.activeSubscription) {
      route.push(`/posts/${post.slug}`);
    }
  }, [session]);

  return (
    <>
      <Head>
        <title>{post.title} | ig-news</title>
      </Head>
      <PostContainer>
        <Post>
          <h1>{post.title}</h1>
          <time>{post.updatedAt}</time>
          <PostContent
            className="previewContent"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
          <CotinueReading>
            Wanna continue reading?
            <Link href="/">
              <a>Subscribe now 🤗</a>
            </Link>
          </CotinueReading>
        </Post>
      </PostContainer>
    </>
  );
};

export default PostsPreviewDetail;

export const getStaticPaths = async () => {
  return {
    paths: [], //{ params: { slug: "o-famoso-javascript" } }
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params as ParsedUrlQuery;

  const prismic = getPrismicClient();

  const res = await prismic.getByUID("publication", slug as string, {});

  const post = {
    slug,

    title: RichText.asText(res.data.title),

    content: RichText.asHtml(res.data.content.splice(0, 2)),

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
    redirect: 60 * 60 * 24 * 7, //Week
  };
};
