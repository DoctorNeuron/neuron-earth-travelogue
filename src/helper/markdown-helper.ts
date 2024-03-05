import { Markdown } from "@/model/markdown";
import matter from "gray-matter";

export const fetchMarkdown = async (route: string, extension: 'md' | 'mdx' = 'md') => {
  if (extension != 'md' && extension != 'mdx') return false;

  route.replace('../', '');

  const res = await fetch(process.env.NEXT_PUBLIC_BLOG_URL + `${route}.${extension}`);
  if (!res.ok) return false;

  let matterDocs = matter(await res.text());

  return {
    content: matterDocs.content,
    data: {
      author: matterDocs.data["author"],
      date: matterDocs.data["date"],
      keywords: (matterDocs.data["keywords"] as string).split('|'),
      path: matterDocs.data["path"],
      title: matterDocs.data["title"],
      id: matterDocs.data["id"]
    }
  } as Markdown;
}

export const fetchJson = async <T>(route: string) => {
  const reviewFetch = await fetch(process.env.NEXT_PUBLIC_BLOG_URL + `${route}.json`);
  if (reviewFetch.ok) return ((await reviewFetch.json()) as T);
  else return false;
}