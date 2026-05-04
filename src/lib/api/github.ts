import type {
  GitHubRepositoryDetail,
  GitHubSearchRepositoriesResponse,
} from "@/types/github";
import { endpoints } from "./endpoints";

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

export type FetchRepoDetailParams = {
  owner: string;
  repo: string;
  signal?: AbortSignal;
};

export const fetchRepoDetail = async ({
  owner,
  repo,
  signal,
}: FetchRepoDetailParams): Promise<GitHubRepositoryDetail> => {
  const url = endpoints.github.repositoryDetail(owner, repo);
  const response = await fetch(url, { signal });
  if (!response.ok) {
    throw new Error(
      `GitHub Repo API error: ${response.status} ${response.statusText}`,
    );
  }

  const json = (await response.json()) as GitHubRepositoryDetail;

  return {
    id: json.id,
    name: json.name,
    full_name: json.full_name,
    owner: {
      login: json.owner.login,
      avatar_url: json.owner.avatar_url,
    },
    language: json.language ?? null,
    stargazers_count: json.stargazers_count,
    watchers_count: json.watchers_count,
    forks_count: json.forks_count,
    open_issues_count: json.open_issues_count,
    description: json.description ?? null,
  };
};

export type SearchRepositoriesParams = {
  query: string;
  perPage?: number;
  page?: number;
  signal?: AbortSignal;
};

export const searchRepositories = async ({
  query,
  perPage = 100,
  page = 1,
  signal,
}: SearchRepositoriesParams): Promise<GitHubSearchRepositoriesResponse> => {
  const trimmedQuery = query.trim();
  const clampedPerPage = clamp(perPage, 1, 100);
  const clampedPage = clamp(page, 1, 10);

  const url = new URL(endpoints.github.searchRepositories);
  const q = trimmedQuery ? `${trimmedQuery} in:name` : "";
  url.searchParams.set("q", q);
  url.searchParams.set("per_page", String(clampedPerPage));
  url.searchParams.set("page", String(clampedPage));

  const response = await fetch(url, { signal });
  if (!response.ok) {
    throw new Error(
      `GitHub Search API error: ${response.status} ${response.statusText}`,
    );
  }

  return (await response.json()) as GitHubSearchRepositoriesResponse;
};
