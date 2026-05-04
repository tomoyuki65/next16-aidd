import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { AnchorHTMLAttributes, ReactNode } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";

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

const mockUseSearchParams = vi.fn();
const mockUsePathname = vi.fn();
const pushMock = vi.fn();
const refreshMock = vi.fn();

vi.mock("next/navigation", async () => {
  const actual =
    await vi.importActual<typeof import("next/navigation")>("next/navigation");

  return {
    ...actual,
    useSearchParams: () => mockUseSearchParams(),
    usePathname: () => mockUsePathname(),
    useRouter: () => ({
      push: pushMock,
      refresh: refreshMock,
      replace: vi.fn(),
      back: vi.fn(),
      prefetch: vi.fn(),
      forward: vi.fn(),
    }),
  };
});

import { TitleLogo } from "./TitleLogo";

describe("TitleLogo", () => {
  beforeEach(() => {
    mockUsePathname.mockReturnValue("/repos/test/react-repo");
    pushMock.mockClear();
    refreshMock.mockClear();
  });

  it("search 未指定・page 未指定のとき href が / になる", () => {
    mockUseSearchParams.mockReturnValue(new URLSearchParams());

    render(<TitleLogo />);

    expect(screen.getByRole("link", { name: "Next16-AIDD" })).toHaveAttribute(
      "href",
      "/",
    );
  });

  it("search 未指定・page=2 のとき href が / になる", () => {
    mockUseSearchParams.mockReturnValue(new URLSearchParams({ page: "2" }));

    render(<TitleLogo title="With Page Only" />);

    expect(
      screen.getByRole("link", { name: "With Page Only" }),
    ).toHaveAttribute("href", "/");
  });

  it("search=react・page 未指定のとき href が /?search=react になる", () => {
    mockUseSearchParams.mockReturnValue(
      new URLSearchParams({ search: "react" }),
    );

    render(<TitleLogo title="With Search" />);

    expect(screen.getByRole("link", { name: "With Search" })).toHaveAttribute(
      "href",
      "/?search=react",
    );
  });

  it("search=react・page=2 のとき href が /?search=react&page=2 になる", () => {
    mockUseSearchParams.mockReturnValue(
      new URLSearchParams({ search: "react", page: "2" }),
    );

    render(<TitleLogo title="With Search And Page" />);

    expect(
      screen.getByRole("link", { name: "With Search And Page" }),
    ).toHaveAttribute("href", "/?search=react&page=2");
  });

  it("search=react・page が空/空白のみのとき href が /?search=react になる", () => {
    mockUseSearchParams.mockReturnValue(
      new URLSearchParams({ search: "react", page: "" }),
    );

    render(<TitleLogo title="With Empty Page" />);

    expect(
      screen.getByRole("link", { name: "With Empty Page" }),
    ).toHaveAttribute("href", "/?search=react");

    mockUseSearchParams.mockReturnValue(
      new URLSearchParams({ search: "react", page: "   " }),
    );

    render(<TitleLogo title="With Blank Page" />);

    expect(
      screen.getByRole("link", { name: "With Blank Page" }),
    ).toHaveAttribute("href", "/?search=react");
  });

  it("デフォルトpropsの style が反映される", () => {
    mockUseSearchParams.mockReturnValue(new URLSearchParams());

    render(<TitleLogo />);

    const link = screen.getByRole("link", { name: "Next16-AIDD" });
    expect(link).toHaveStyle({ backgroundColor: "rgb(229, 231, 235)" });
    expect(link).toHaveStyle({ color: "rgb(55, 65, 81)" });
    expect(link).toHaveStyle({ fontSize: "1.125rem" });
  });

  it("props 上書きで style が反映される", () => {
    mockUseSearchParams.mockReturnValue(new URLSearchParams());

    render(
      <TitleLogo
        title="Override"
        backgroundColor="#000000"
        textColor="#ffffff"
        hoverTextColor="#ff0000"
        fontSize="2rem"
      />,
    );

    const link = screen.getByRole("link", { name: "Override" });
    expect(link).toHaveStyle({ backgroundColor: "rgb(0, 0, 0)" });
    expect(link).toHaveStyle({ color: "rgb(255, 255, 255)" });
    expect(link).toHaveStyle({ fontSize: "2rem" });
  });

  it("hover/unhover で color が切り替わる", async () => {
    const user = userEvent.setup();

    mockUseSearchParams.mockReturnValue(new URLSearchParams());

    render(
      <TitleLogo
        title="Hover Target"
        textColor="#000000"
        hoverTextColor="#ff0000"
      />,
    );

    const link = screen.getByRole("link", { name: "Hover Target" });
    expect(link).toHaveStyle({ color: "rgb(0, 0, 0)" });

    await user.hover(link);
    expect(link).toHaveStyle({ color: "rgb(255, 0, 0)" });

    await user.unhover(link);
    expect(link).toHaveStyle({ color: "rgb(0, 0, 0)" });
  });

  it("search=react・page=2（前後空白あり）で trim された href が生成される", () => {
    mockUseSearchParams.mockReturnValue(
      new URLSearchParams({ search: "  hello  ", page: " 2 " }),
    );

    render(<TitleLogo title="With Params" />);

    expect(screen.getByRole("link", { name: "With Params" })).toHaveAttribute(
      "href",
      "/?search=hello&page=2",
    );
  });

  it("search が空/空白のみのとき href が常に / になる（page があっても付与しない）", () => {
    mockUseSearchParams.mockReturnValue(
      new URLSearchParams({ search: "", page: "2" }),
    );

    render(<TitleLogo title="Empty Search" />);

    expect(screen.getByRole("link", { name: "Empty Search" })).toHaveAttribute(
      "href",
      "/",
    );

    mockUseSearchParams.mockReturnValue(
      new URLSearchParams({ search: "   ", page: "2" }),
    );

    render(<TitleLogo title="Blank Search" />);

    expect(screen.getByRole("link", { name: "Blank Search" })).toHaveAttribute(
      "href",
      "/",
    );
  });

  it("トップページではロゴクリックで / に遷移し、refresh する（キャッシュを使わない）", async () => {
    const user = userEvent.setup();
    mockUsePathname.mockReturnValue("/");
    mockUseSearchParams.mockReturnValue(
      new URLSearchParams({ search: "react", page: "2" }),
    );

    render(<TitleLogo title="Top" />);

    const link = screen.getByRole("link", { name: "Top" });
    expect(link).toHaveAttribute("href", "/");

    await user.click(link);

    expect(pushMock).toHaveBeenCalledWith("/");
    expect(refreshMock).toHaveBeenCalled();
  });
});
