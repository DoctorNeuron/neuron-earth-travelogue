import matter from "gray-matter";

// export const BLOG_URL = "https://raw.githubusercontent.com/DoctorNeuron/neuron-earth-travelogue-content/dev/";
export const BLOG_URL = "http://localhost:12345/";
export const fetchMarkdown = async (route: string, extension: 'md' | 'mdx' = 'md') => {
  if (extension != 'md' && extension != 'mdx') return false;

  route.replace('../', '');

  const res = await fetch(BLOG_URL + `${route}.${extension}`);
  if (!res.ok) return false;

  return matter(await res.text());
}

export const fetchJson = async <T>(route: string) => {
  const reviewFetch = await fetch(BLOG_URL + `${route}.json`);
  if (reviewFetch.ok) return ((await reviewFetch.json()) as T);
  else return false;
}