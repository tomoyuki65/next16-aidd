import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

vi.mock("next/font/google", () => {
  return {
    Geist: () => ({ variable: "--font-geist-sans" }),
    Geist_Mono: () => ({ variable: "--font-geist-mono" }),
  };
});

import React from "react";
import RootLayout from "@/app/layout";
import HomePage from "@/app/page";

let mockedSearchParams = new URLSearchParams();
const pushMock = vi.fn();

vi.mock("next/navigation", () => {
  return {
    useRouter: () => ({
      push: pushMock,
      replace: vi.fn(),
      refresh: vi.fn(),
      back: vi.fn(),
      prefetch: vi.fn(),
    }),
    useSearchParams: () => mockedSearchParams,
  };
});

describe("Top page (integration)", () => {
  it("ヘッダーと検索フォームが表示される", () => {
    mockedSearchParams = new URLSearchParams();

    const layoutElement = RootLayout({ children: <HomePage /> });

    type WithChildrenProps = { children?: React.ReactNode };
    const isElementWithChildren = (
      value: unknown,
    ): value is React.ReactElement<WithChildrenProps> => {
      return React.isValidElement(value);
    };

    const stack: unknown[] = [layoutElement];
    let hasHeader = false;

    while (stack.length) {
      const current = stack.pop();
      if (!isElementWithChildren(current)) continue;

      if (
        typeof current.type !== "string" &&
        "name" in current.type &&
        current.type.name === "Header"
      ) {
        hasHeader = true;
      }

      const children = current.props.children;
      if (Array.isArray(children)) stack.push(...children);
      else if (children) stack.push(children);
    }

    expect(hasHeader).toBe(true);

    render(
      <div>
        {/* RootLayout は <html> を返すため、DOMとしては最小構成を再現する */}
        <HomePage />
      </div>,
    );

    // page.tsx は TopPage の呼び出しのみであること（検索フォームが表示されること）を保証する
    expect(
      screen.getByPlaceholderText("リポジトリ名を入力してください"),
    ).toBeVisible();
    expect(screen.getByRole("button", { name: "検索" })).toBeVisible();
  });
});
