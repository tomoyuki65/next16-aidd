import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { Button } from "./Button";

describe("Button", () => {
  it("children（ボタンラベル）が表示される", () => {
    render(<Button>Label</Button>);
    expect(screen.getByRole("button", { name: "Label" })).toBeInTheDocument();
  });

  it("クリックで onClick が1回呼ばれる", () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Click</Button>);

    fireEvent.click(screen.getByRole("button", { name: "Click" }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("disabled のときクリックしても onClick が呼ばれない", () => {
    const onClick = vi.fn();
    render(
      <Button disabled onClick={onClick}>
        Disabled
      </Button>,
    );

    fireEvent.click(screen.getByRole("button", { name: "Disabled" }));
    expect(onClick).toHaveBeenCalledTimes(0);
  });

  it("type 属性（button/submit/reset）を指定できる", () => {
    const { rerender } = render(<Button type="button">Type</Button>);
    expect(screen.getByRole("button", { name: "Type" })).toHaveAttribute(
      "type",
      "button",
    );

    rerender(<Button type="submit">Type</Button>);
    expect(screen.getByRole("button", { name: "Type" })).toHaveAttribute(
      "type",
      "submit",
    );

    rerender(<Button type="reset">Type</Button>);
    expect(screen.getByRole("button", { name: "Type" })).toHaveAttribute(
      "type",
      "reset",
    );
  });

  it("デフォルトのclass（bg-gray-700 / hover:bg-gray-600 / text-white）が付与される", () => {
    render(<Button>Class</Button>);
    const button = screen.getByRole("button", { name: "Class" });
    expect(button).toHaveClass("bg-gray-700");
    expect(button).toHaveClass("hover:bg-gray-600");
    expect(button).toHaveClass("text-white");
  });
});
