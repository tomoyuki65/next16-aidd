import type { GitHubSearchRepositoriesResponse } from "@/types/github";
import { endpoints } from "./endpoints";

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

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
  const clampedPerPage = clamp(perPage, 1, 100);
  const clampedPage = clamp(page, 1, 10);

  const url = new URL(endpoints.github.searchRepositories);
  url.searchParams.set("q", query);
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
