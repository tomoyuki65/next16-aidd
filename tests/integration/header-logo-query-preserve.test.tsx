import { render, screen } from "@testing-library/react";
import type { AnchorHTMLAttributes, ReactNode } from "react";
import { describe, expect, it, vi } from "vitest";

vi.mock("next/link", () => {
  type LinkMockProps = {
    href: unknown;
    children: ReactNode;
  } & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "children">;

  return {
    default: ({ href, children, ...props }: LinkMockProps) => (
      <a href={String(href)} {...props}>
        {children}
      </a>
    ),
  };
});

let mockedPathname = "/repository-detail/test/my-repo";
let mockedSearchParams = new URLSearchParams();

vi.mock("next/navigation", () => {
  return {
    usePathname: () => mockedPathname,
    useSearchParams: () => mockedSearchParams,
    useRouter: () => ({
      push: vi.fn(),
      replace: vi.fn(),
      refresh: vi.fn(),
      back: vi.fn(),
      prefetch: vi.fn(),
      forward: vi.fn(),
    }),
  };
});

import { Header } from "@/components/Header/Header";

describe("Header logo query preserve (integration)", () => {
  it("search/page がある詳細画面で、ロゴリンクが /?search=...&page=... になる", () => {
    mockedPathname = "/repository-detail/test/my-repo";
    mockedSearchParams = new URLSearchParams({ search: "react", page: "2" });

    render(<Header />);

    expect(screen.getByRole("link", { name: "Next16-AIDD" })).toHaveAttribute(
      "href",
      "/?search=react&page=2",
    );
  });

  it("search/page が無い詳細画面で、ロゴリンクが / になる", () => {
    mockedPathname = "/repository-detail/test/my-repo";
    mockedSearchParams = new URLSearchParams();

    render(<Header />);

    expect(screen.getByRole("link", { name: "Next16-AIDD" })).toHaveAttribute(
      "href",
      "/",
    );
  });
});
