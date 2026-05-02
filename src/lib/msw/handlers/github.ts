import { HttpResponse, http, type RequestHandler } from "msw";

// search repositories
const searchRepositoriesHandler = http.get(
  "https://api.github.com/search/repositories",
  ({ request }) => {
    const url = new URL(request.url);
    const q = url.searchParams.get("q");

    return HttpResponse.json({
      total_count: 2,
      items: [
        {
          id: 1,
          name: `${q}-repo-1`,
          full_name: `test/${q}-repo-1`,
          owner: { login: "test" },
        },
        {
          id: 2,
          name: `${q}-repo-2`,
          full_name: `test/${q}-repo-2`,
          owner: { login: "test" },
        },
      ],
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
