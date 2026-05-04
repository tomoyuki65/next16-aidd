export type GitHubOwner = {
  login: string;
  avatar_url?: string;
};

export type GitHubRepository = {
  id: number;
  name: string;
  full_name: string;
  owner: GitHubOwner;
};

export type GitHubRepositoryDetail = {
  id: number;
  name: string;
  full_name: string;
  owner: GitHubOwner;
  language: string | null;
  stargazers_count: number;
  watchers_count: number;
  forks_count: number;
  open_issues_count: number;
  description: string | null;
};

export type GitHubSearchRepositoriesResponse = {
  total_count: number;
  items: GitHubRepository[];
};
