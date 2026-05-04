import type {
  GitHubRepositoryDetail,
  GitHubSearchRepositoriesResponse,
} from "@/types/github";

export const buildSearchRepositoriesResponse =
  (): GitHubSearchRepositoriesResponse => {
    return {
      total_count: 1,
      items: [
        {
          id: 101,
          name: "next16-aidd",
          full_name: "next16-ai/next16-aidd",
          owner: {
            login: "next16-ai",
          },
        },
      ],
    };
  };

export const buildRepoDetailResponse = (): GitHubRepositoryDetail => {
  return {
    id: 101,
    name: "next16-aidd",
    full_name: "next16-ai/next16-aidd",
    owner: {
      login: "next16-ai",
    },
    language: "TypeScript",
    stargazers_count: 123,
    watchers_count: 45,
    forks_count: 6,
    open_issues_count: 7,
    description: "E2E mock repository detail",
  };
};
