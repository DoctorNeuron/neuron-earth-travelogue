
export interface CitationData {
  author: string,
  url: string,
  lang: "id" | "en"
}

export interface CitationList {
  [key: string]: {
    [key: string]: CitationData
  }
}