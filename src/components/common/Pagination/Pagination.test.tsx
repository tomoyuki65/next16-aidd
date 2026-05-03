import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import { describe, expect, it, vi } from "vitest";

import { Pagination } from "./Pagination";

describe("Pagination", () => {
  it("page=1 のとき '<<' が disabled になる", () => {
    render(<Pagination page={1} totalPages={12} onPageChange={() => {}} />);
    expect(screen.getByRole("button", { name: "<<" })).toBeDisabled();
  });

  it("page=totalPages のとき '>>' が disabled になる", () => {
    render(<Pagination page={12} totalPages={12} onPageChange={() => {}} />);
    expect(screen.getByRole("button", { name: ">>" })).toBeDisabled();
  });

  it("数字ボタンのクリックで onPageChange(nextPage) が呼ばれる", () => {
    const onPageChange = vi.fn();
    render(<Pagination page={1} totalPages={12} onPageChange={onPageChange} />);

    fireEvent.click(screen.getByRole("button", { name: "3" }));
    expect(onPageChange).toHaveBeenCalledWith(3);
  });

  it("'<<' と '>>' のクリックで onPageChange が最小/最大ページで呼ばれる（境界では呼ばれない）", () => {
    const onPageChange = vi.fn();
    const { rerender } = render(
      <Pagination page={6} totalPages={12} onPageChange={onPageChange} />,
    );

    fireEvent.click(screen.getByRole("button", { name: "<<" }));
    expect(onPageChange).toHaveBeenCalledWith(1);

    fireEvent.click(screen.getByRole("button", { name: ">>" }));
    expect(onPageChange).toHaveBeenCalledWith(12);

    onPageChange.mockClear();
    rerender(
      <Pagination page={1} totalPages={12} onPageChange={onPageChange} />,
    );
    fireEvent.click(screen.getByRole("button", { name: "<<" }));
    expect(onPageChange).toHaveBeenCalledTimes(0);

    onPageChange.mockClear();
    rerender(
      <Pagination page={12} totalPages={12} onPageChange={onPageChange} />,
    );
    fireEvent.click(screen.getByRole("button", { name: ">>" }));
    expect(onPageChange).toHaveBeenCalledTimes(0);
  });

  it("ページ番号の並びが先頭/中央/末尾で '…' を含む", () => {
    const { rerender } = render(
      <Pagination page={1} totalPages={12} onPageChange={() => {}} />,
    );
    expect(screen.getByText("…")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "5" })).toBeInTheDocument();

    rerender(<Pagination page={6} totalPages={12} onPageChange={() => {}} />);
    expect(screen.getAllByText("…")).toHaveLength(2);
    expect(screen.getByRole("button", { name: "6" })).toBeInTheDocument();

    rerender(<Pagination page={12} totalPages={12} onPageChange={() => {}} />);
    expect(screen.getByText("…")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "8" })).toBeInTheDocument();
  });

  it("選択中のページは aria-current=page になり disabled になる", () => {
    render(<Pagination page={6} totalPages={12} onPageChange={() => {}} />);
    const current = screen.getByRole("button", { name: "6" });
    expect(current).toHaveAttribute("aria-current", "page");
    expect(current).toBeDisabled();
  });

  it("buttonClassNames でボタンのclassを上書きできる", () => {
    render(
      <Pagination
        page={6}
        totalPages={12}
        onPageChange={() => {}}
        buttonClassNames={{
          textSizeClass: "text-xs",
          paddingClass: "px-2 py-1",
          hoverBgClass: "hover:bg-sky-700",
          bgClass: "bg-sky-600",
          textColorClass: "text-white",
          activeBgClass: "bg-sky-900",
        }}
      />,
    );

    const normal = screen.getByRole("button", { name: "5" });
    expect(normal).toHaveClass("text-xs");
    expect(normal).toHaveClass("px-2");
    expect(normal).toHaveClass("py-1");
    expect(normal).toHaveClass("bg-sky-600");
    expect(normal).toHaveClass("hover:bg-sky-700");
    expect(normal).toHaveClass("text-white");

    const active = screen.getByRole("button", { name: "6" });
    expect(active).toHaveClass("bg-sky-900");
  });

  it("クリックでページが切り替わると表示（可変ウィンドウ）が再計算される", async () => {
    const onPageChange = vi.fn();

    const Controlled = () => {
      const [page, setPage] = useState(6);
      return (
        <Pagination
          page={page}
          totalPages={12}
          onPageChange={(nextPage) => {
            onPageChange(nextPage);
            setPage(nextPage);
          }}
        />
      );
    };

    render(<Controlled />);

    // page=6 では中央ウィンドウ（… 2個 + 5,6,7）が表示される
    expect(screen.getAllByText("…")).toHaveLength(2);
    expect(screen.getByRole("button", { name: "6" })).toBeDisabled();

    const user = userEvent.setup();
    await user.click(screen.getByRole("button", { name: "12" }));
    expect(onPageChange).toHaveBeenCalledWith(12);

    // page=12 に切り替わると末尾ウィンドウへ再計算される
    expect(screen.getByRole("button", { name: "12" })).toBeDisabled();
    expect(screen.getByRole("button", { name: "8" })).toBeInTheDocument();
  });
});
