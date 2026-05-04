"use client";

import { useState } from "react";
import useSWR from "swr";
import { fetchRepoDetail } from "@/lib/api/github";

export type RepositoryDetailPageProps = {
  owner: string;
  repo: string;
};

const formatNumber = (value: number) => new Intl.NumberFormat().format(value);

export const RepositoryDetailPage = ({
  owner,
  repo,
}: RepositoryDetailPageProps) => {
  const [isOwnerImageFailed, setIsOwnerImageFailed] = useState(false);

  const swrKey = owner && repo ? (["repoDetail", owner, repo] as const) : null;

  const { data, error, isLoading } = useSWR(swrKey, async ([, o, r]) => {
    return await fetchRepoDetail({ owner: o, repo: r });
  });

  const pageClassName =
    "flex w-full flex-1 flex-col items-center px-4 py-10 sm:px-6";

  if (isLoading) {
    return (
      <div className={pageClassName}>
        <output className="text-slate-600" aria-live="polite">
          Loading...
        </output>
      </div>
    );
  }

  if (error) {
    return (
      <div className={pageClassName}>
        <div role="alert" className="text-red-600">
          リポジトリ詳細の取得に失敗しました
        </div>
      </div>
    );
  }

  if (!data) return null;

  const shouldShowOwnerImage =
    Boolean(data.owner.avatar_url) && !isOwnerImageFailed;

  return (
    <div className={pageClassName}>
      <div className="w-full max-w-[44rem] rounded-3xl border border-slate-200 bg-white px-5 py-6 shadow-md sm:px-8 sm:py-8">
        <div className="mx-auto w-full max-w-[38rem]">
          <div className="grid gap-y-10 md:grid-cols-4 md:gap-x-10">
            <header className="flex justify-center md:col-span-1 md:justify-self-center">
              <div className="h-16 w-16 shrink-0">
                {shouldShowOwnerImage ? (
                  // biome-ignore lint/performance/noImgElement: next/image のremote設定に依存しないため
                  <img
                    src={data.owner.avatar_url}
                    alt="Owner avatar"
                    className="h-16 w-16 rounded-full object-cover"
                    onError={() => {
                      setIsOwnerImageFailed(true);
                    }}
                  />
                ) : (
                  <div
                    role="img"
                    aria-label="Owner image fallback"
                    className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-200 text-sm font-semibold text-slate-500"
                  >
                    icon
                  </div>
                )}
              </div>
            </header>

            <div className="min-w-0 text-center md:col-span-3 md:text-left">
              <h1 className="break-words text-2xl font-semibold text-slate-900">
                {data.full_name}
              </h1>
              <p className="mt-3 text-lg text-slate-700">
                Language: {data.language ?? "—"}
              </p>
            </div>

            <section className="md:col-span-4" aria-label="Repository stats">
              <dl className="grid grid-cols-4 gap-x-3 gap-y-8 sm:gap-x-6 md:gap-x-10">
                <div className="text-center">
                  <dt className="whitespace-nowrap text-xs font-semibold leading-tight text-slate-900 sm:text-xl">
                    Star数
                  </dt>
                  <dd className="mt-4 text-lg text-slate-700 sm:mt-5 sm:text-2xl">
                    {formatNumber(data.stargazers_count)}
                  </dd>
                </div>
                <div className="text-center">
                  <dt className="whitespace-nowrap text-xs font-semibold leading-tight text-slate-900 sm:text-xl">
                    Watcher数
                  </dt>
                  <dd className="mt-4 text-lg text-slate-700 sm:mt-5 sm:text-2xl">
                    {formatNumber(data.watchers_count)}
                  </dd>
                </div>
                <div className="text-center">
                  <dt className="whitespace-nowrap text-xs font-semibold leading-tight text-slate-900 sm:text-xl">
                    Fork数
                  </dt>
                  <dd className="mt-4 text-lg text-slate-700 sm:mt-5 sm:text-2xl">
                    {formatNumber(data.forks_count)}
                  </dd>
                </div>
                <div className="text-center">
                  <dt className="whitespace-nowrap text-xs font-semibold leading-tight text-slate-900 sm:text-xl">
                    Issue数
                  </dt>
                  <dd className="mt-4 text-lg text-slate-700 sm:mt-5 sm:text-2xl">
                    {formatNumber(data.open_issues_count)}
                  </dd>
                </div>
              </dl>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};
