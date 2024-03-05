export interface Markdown
{
  content: string,
  data: MarkdownData
}

export interface MarkdownData
{
  id: string,
  date: string,
  author: string,
  
  /** Path ke dokumen .md */
  path: string,
  title: string,
  keywords: string[]
}