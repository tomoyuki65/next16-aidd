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

export type GitHubSearchRepositoriesResponse = {
  total_count: number;
  items: GitHubRepository[];
};
