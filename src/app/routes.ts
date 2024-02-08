export interface IRoute {
  name: string,
  subroute?: IRoute[],

  /** Otomatis langung diubah ke /blog/{path} */
  path?: string
}

export const AppRoutes : IRoute[] = [
  {
    name: "Travel Blog",
    subroute: [
      {
        name: "Before you read",
        path: "/blog"
      },
      {
        name: "2024",
        subroute: [
          {
            name: "27 January",
            path: "/blog/2024/27-01"
          },
          {
            name: "20 January",
            path: "/blog/2024/20-01"
          }
        ]
      }
    ]
  }
]