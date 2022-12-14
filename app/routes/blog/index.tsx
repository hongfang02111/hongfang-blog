import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import React from "react";
import { getPosts } from "~/models/post.server";

export const loader = async () => {
  return json(
    {
      posts: await getPosts(),
    },
    {
      headers: { "Cache-Control": "private, max-age=10" },
    }
  );
};

type LoaderData = {
  posts: Awaited<ReturnType<typeof getPosts>>;
};

const Blog = () => {
  const { posts } = useLoaderData() as LoaderData;
  return (
    <main
      className={
        "flex h-screen w-screen flex-col items-center overflow-auto bg-gray-700 pt-20 pr-5 pl-5"
      }
    >
      <section>
        <Link
          to={"/"}
          className={
            "mb-10 block items-start text-4xl font-extrabold text-white"
          }
        >
          The Path to Enightenment
        </Link>
        <ul className={"flex list-none flex-col items-start gap-14 pb-20"}>
          {posts.map((post) => (
            <li key={post.slug}>
              <Link
                to={post.slug}
                className={"mb-3 block text-3xl font-bold text-pink-200"}
                prefetch={"intent"}
              >
                {post.title}
              </Link>
              <h3 className={"mb-3 text-white"}>{post.date}</h3>
              <h2 className={"text-white"}>{post.description}</h2>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
};

export default Blog;
