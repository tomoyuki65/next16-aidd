export const endpoints = {
  github: {
    searchRepositories: "https://api.github.com/search/repositories",
    repositoryDetail: (owner: string, repo: string) =>
      `https://api.github.com/repos/${owner}/${repo}`,
  },
} as const;
