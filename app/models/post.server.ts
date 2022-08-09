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

export async function getPosts(): Promise<Array<Post>> {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames
    .map((fileName) => {
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
    })
    .sort((a, z) => new Date(a.date).valueOf() - new Date(z.date).valueOf());
}

export async function getPostByTitle({ slug }: Params) {
  const posts = await getPosts();
  return posts.find((post) => post.slug === slug);
}
