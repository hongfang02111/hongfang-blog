import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";

const postsDirectory = `${__dirname}/../posts`;

type Post = {
  slug: string;
  title: string;
  content: string;
  date: string;
  description: string;
};

type Params = {
  slug: string;
};

const getPostContent = (fileName: string) => {
  const slug = fileName.replace(/\.md$/, "");
  const fullPath = path.join(postsDirectory, fileName);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const matterResult = matter(fileContents);
  const {
    content,
    data: { title, date, description },
  } = matterResult;
  return {
    slug,
    title,
    content: marked(content),
    date,
    description,
  };
};

const sortPostByDate = (a: Post, z: Post) =>
  new Date(z.date).valueOf() - new Date(a.date).valueOf();

export async function getPosts(): Promise<Array<Post>> {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames
    .map((fileName) => getPostContent(fileName))
    .sort((a, z) => sortPostByDate(a, z));
}

export async function getPostByTitle({ slug }: Params) {
  const posts = await getPosts();
  const currentPostIndex = posts.findIndex((post) => post.slug === slug);
  const previousPost =
    currentPostIndex > 0 ? posts.at(currentPostIndex - 1) : null;
  const currentPost = posts.at(currentPostIndex);
  const nextPost =
    currentPostIndex < posts.length ? posts.at(currentPostIndex + 1) : null;
  return { previousPost, currentPost, nextPost };
}