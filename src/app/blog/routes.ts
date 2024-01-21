export interface IRoute {
  name: string,
  subroute?: IRoute[],

  /** Otomatis langung diubah ke /blog/{path} */
  path: string
}

export const BlogRoutes : IRoute[] = [
  {
    name: "Test",
    path: "test"
  }
]