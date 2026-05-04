import { HttpResponse, http, type RequestHandler } from "msw";
import { endpoints } from "@/lib/api/endpoints";

const extractQueryTerm = (q: string) => {
  const trimmed = q.trim();
  if (!trimmed) return "";

  return trimmed.split(/\s+/)[0] ?? "";
};

// search repositories
const searchRepositoriesHandler = http.get(
  endpoints.github.searchRepositories,
  ({ request }) => {
    const url = new URL(request.url);
    const q = url.searchParams.get("q") ?? "";
    const term = extractQueryTerm(q);
    const perPageRaw = Number(url.searchParams.get("per_page") ?? "30");
    const pageRaw = Number(url.searchParams.get("page") ?? "1");

    if (term === "error") {
      return HttpResponse.json({ message: "Mock error" }, { status: 500 });
    }

    const total_count = term === "empty" ? 0 : 250;
    const perPage = Math.min(100, Math.max(1, perPageRaw || 30));
    const page = Math.min(10, Math.max(1, pageRaw || 1));

    const start = (page - 1) * perPage;
    const end = Math.min(total_count, start + perPage);
    const items =
      total_count <= 0
        ? []
        : Array.from({ length: Math.max(0, end - start) }, (_, index) => {
            const ordinal = start + index + 1;
            return {
              id: ordinal,
              name: `${term}-repo-${ordinal}`,
              full_name: `test/${term}-repo-${ordinal}`,
              owner: {
                login: "test",
                avatar_url: "https://github.com/test.png",
              },
            };
          });

    return HttpResponse.json({
      total_count,
      items,
    });
  },
);

// repository detail
const repositoryDetailHandler = http.get(
  "https://api.github.com/repos/:owner/:repo",
  ({ params }) => {
    const { owner, repo } = params;

    return HttpResponse.json({
      id: 123,
      name: repo,
      full_name: `${owner}/${repo}`,
      owner: {
        login: owner,
        avatar_url: `https://github.com/${owner}.png`,
      },
      language: "TypeScript",
      stargazers_count: 1200,
      watchers_count: 300,
      forks_count: 150,
      open_issues_count: 42,
      description: `Mock repo for ${repo}`,
    });
  },
);

export const githubHandlers: RequestHandler[] = [
  searchRepositoriesHandler,
  repositoryDetailHandler,
];
