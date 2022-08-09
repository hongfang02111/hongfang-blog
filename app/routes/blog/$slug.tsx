import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { getPostByTitle } from "~/models/post.server";

type Params = {
  params: {
    slug: string;
  };
};

export async function loader({ params }: Params) {
  const slug = params.slug;
  return json(
    {
      ...(await getPostByTitle({ slug })),
    },
    {
      headers: { "Cache-Control": "private, max-age=60" },
    }
  );
}

export default function Post() {
  const { previousPost, currentPost, nextPost } = useLoaderData();
  const { title, date, content } = currentPost;

  return (
    <div
      className={
        "flex h-screen w-screen flex-col items-center overflow-auto bg-gray-700 pt-20 pr-5 pl-5"
      }
    >
      <article>
        <h1 className={"mb-10 items-start text-4xl font-extrabold text-white"}>
          Exploring Learning Practicing Improving
        </h1>
        <h1 className={"mb-5 block text-3xl font-bold text-pink-200"}>
          {title}
        </h1>
        <h2 className={"mb-5 text-white"}>{date}</h2>
        <section
          className={"prose prose-xl prose-invert mb-20"}
          dangerouslySetInnerHTML={{ __html: content }}
        />
        <div className={"flex"}>
          <div className={"w-1/2 text-left "}>
            {previousPost ? (
              <Link
                className="text-pink-200 underline hover:no-underline"
                to={`/blog/${previousPost.slug}`}
                prefetch={"intent"}
              >
                ← {previousPost.title}
              </Link>
            ) : null}
          </div>
          <div className={"w-1/2 text-right"}>
            {nextPost ? (
              <Link
                className="text-pink-200 underline hover:no-underline"
                to={`/blog/${nextPost.slug}`}
                prefetch={"intent"}
              >
                {nextPost.title} →
              </Link>
            ) : null}
          </div>
        </div>
      </article>
    </div>
  );
}
