"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import useSWR from "swr";
import { Card } from "@/components/common/Card/Card";
import { Pagination } from "@/components/common/Pagination/Pagination";
import { Search } from "@/components/Search/Search";
import { searchRepositories } from "@/lib/api/github";
import type { GitHubRepository } from "@/types/github";

const UI_PAGE_SIZE = 5;
const API_PAGE_SIZE = 100;
const MAX_TOTAL_COUNT = 1000;

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

const parsePositiveInt = (value: string | null) => {
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) return undefined;
  if (!Number.isInteger(parsed)) return undefined;
  if (parsed <= 0) return undefined;
  return parsed;
};

const buildTopPageHref = (search: string, page: number) => {
  const trimmed = search.trim();
  if (!trimmed) return "/";

  const params = new URLSearchParams({ search: trimmed, page: String(page) });
  return `/?${params.toString()}`;
};

const buildRepoDetailHref = (
  repoFullName: string,
  search: string,
  page: number,
) => {
  const [owner, repo] = repoFullName.split("/");
  if (!owner || !repo) return buildTopPageHref(search, page);

  const params = new URLSearchParams();
  const trimmed = search.trim();
  if (trimmed) params.set("search", trimmed);
  params.set("page", String(page));

  return `/repository-detail/${owner}/${repo}?${params.toString()}`;
};

export const TopPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const rawSearch = searchParams.get("search")?.trim() ?? "";
  const hasPageParam = searchParams.has("page");
  // In Storybook, the iframe URL can contain a generic `search` query parameter
  // for Storybook itself. Avoid treating that as the app's query unless `page`
  // is also present (which we always set when we update the URL).
  const urlSearch = hasPageParam ? rawSearch : "";
  const urlPageRaw = parsePositiveInt(searchParams.get("page")) ?? 1;

  const [query, setQuery] = useState(urlSearch);
  const [page, setPage] = useState(urlPageRaw);

  useEffect(() => {
    setQuery(urlSearch);
    setPage(urlPageRaw);
  }, [urlSearch, urlPageRaw]);

  const { apiPage, sliceStart } = useMemo(() => {
    const zeroBasedOffset = (page - 1) * UI_PAGE_SIZE;
    const apiPageComputed = Math.floor(zeroBasedOffset / API_PAGE_SIZE) + 1;
    const sliceStartComputed = zeroBasedOffset % API_PAGE_SIZE;
    return { apiPage: apiPageComputed, sliceStart: sliceStartComputed };
  }, [page]);

  const swrKey = query ? (["githubSearch", query, apiPage] as const) : null;

  const { data, error, isLoading } = useSWR(
    swrKey,
    async ([, q, apiPageValue]) => {
      // デバッグ用
      // console.log("APIを呼び出します:", q, apiPageValue);
      return await searchRepositories({
        query: q,
        perPage: API_PAGE_SIZE,
        page: apiPageValue,
      });
    },
    // オプション設定
    {
      // 同じキーでのリクエストを30秒間は「重複」とみなして通信をスキップする
      dedupingInterval: 30000,
      // ブラウザのタブを切り替えて戻ってきた時の自動更新をオフにする
      revalidateOnFocus: false,
      // ネットワークが復帰した時の自動更新をオフにする
      revalidateOnReconnect: false,
    },
  );

  const totalCount = data?.total_count ?? 0;
  const clampedTotalCount = Math.min(totalCount, MAX_TOTAL_COUNT);
  const totalPages = query ? Math.ceil(clampedTotalCount / UI_PAGE_SIZE) : 0;

  const resolvedPage = totalPages > 0 ? clamp(page, 1, totalPages) : page;

  const visibleItems: GitHubRepository[] = useMemo(() => {
    if (!data?.items) return [];
    if (resolvedPage !== page) return [];
    return data.items.slice(sliceStart, sliceStart + UI_PAGE_SIZE);
  }, [data?.items, page, resolvedPage, sliceStart]);

  const showResults = Boolean(query) && !isLoading && !error;

  return (
    <div className="flex w-full flex-1 flex-col gap-6 px-4 py-6 sm:px-6">
      <div className="mt-4 w-[95%] self-center">
        <Search
          defaultQuery={query}
          onSearch={(nextQuery) => {
            setQuery(nextQuery);
            setPage(1);
            router.push(buildTopPageHref(nextQuery, 1));
          }}
        />
      </div>

      {query ? (
        <div className="flex flex-col gap-4">
          {isLoading ? (
            <output className="text-slate-600" aria-live="polite">
              Loading...
            </output>
          ) : error ? (
            <div role="alert" className="text-red-600">
              検索に失敗しました
            </div>
          ) : showResults && clampedTotalCount === 0 ? (
            <div className="text-slate-600">結果がありません</div>
          ) : showResults ? (
            <>
              <ul className="flex flex-col gap-3" aria-label="検索結果">
                {visibleItems.map((item) => (
                  <li key={item.id}>
                    <Card
                      repoName={item.full_name}
                      ownerImageUrl={item.owner.avatar_url}
                      className="w-full"
                      repoNameMaxLines={2}
                      minHeightClassName="min-h-[88px]"
                      onClick={() => {
                        router.push(
                          buildRepoDetailHref(item.full_name, query, page),
                        );
                      }}
                    />
                  </li>
                ))}
              </ul>

              {totalPages > 1 ? (
                <div className="flex justify-end pt-2">
                  <Pagination
                    page={resolvedPage}
                    totalPages={totalPages}
                    onPageChange={(nextPage) => {
                      setPage(nextPage);
                      router.push(buildTopPageHref(query, nextPage));
                    }}
                  />
                </div>
              ) : null}
            </>
          ) : null}
        </div>
      ) : null}
    </div>
  );
};
