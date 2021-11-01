import React from "react";
import Head from "next/head";
import Prismic from "@prismicio/client";
import { GetStaticProps } from "next";

import { PostContainer, PostList } from "../../ui/styles/pages/Post/Post";
import { getPrismicClient } from "../../services/prismic";
import { RichText } from "prismic-dom";
import Link from "next/link";

type Post = {
  slug: string;
  title: string;
  excerpt: string;
  updatedAt: string;
};

interface PostsProps {
  posts: Post[];
}

const Posts = ({ posts }: PostsProps) => {
  return (
    <>
      <Head>
        <title>Posts | ig-news</title>
      </Head>
      <PostContainer>
        <PostList>
          {posts.map((post) => (
            <Link href={`/posts/${post.slug}`} key={post.slug}>
              <a>
                <time>{post.updatedAt}</time>
                <strong>{post.title}</strong>
                <p>{post.excerpt}</p>
              </a>
            </Link>
          ))}
        </PostList>
      </PostContainer>
    </>
  );
};

export default Posts;

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient();

  const res = await prismic.query(
    [Prismic.Predicates.at("document.type", "publication")],
    {
      fetch: ["publication.title", "publication.content"],
      pageSize: 10,
    }
  );

  const posts = res.results.map((post) => {
    return {
      slug: post.uid,

      title: RichText.asText(post.data.title),

      excerpt:
        post.data.content.find((content: any) => content.type === "paragraph")
          ?.text ?? "ta vindo vazio",

      updatedAt: new Date(
        post.last_publication_date as string
      ).toLocaleDateString("en-US", {
        day: "2-digit",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "numeric",
      }),
    };
  });
  return {
    props: { posts },
    revalidate: 60 * 60 * 12, // 12 hours
  };
};
