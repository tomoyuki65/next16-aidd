import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Sample } from "./Sample";

describe("Sample", () => {
  it("labelが表示される", () => {
    render(<Sample label="test label" />);
    expect(screen.getByText("test label")).toBeInTheDocument();
    // expect(screen.getByText("Hello, world!")).toBeInTheDocument();
    // const message = await screen.findByText("Hello, world!");

    // expect(message).toBeInTheDocument();
  });

  it("countが表示される", () => {
    render(<Sample label="test" count={5} />);
    expect(screen.getByText("count: 5")).toBeInTheDocument();
  });

  it("ボタン押下でonClickが呼ばれる", () => {
    const onClick = vi.fn();

    render(<Sample label="test" onClick={onClick} />);

    fireEvent.click(screen.getByText("increment"));

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("fetchで取得したmessageが表示される", async () => {
    render(<Sample label="test label" />);

    // MSWのレスポンス待ち
    const message = await screen.findByText("Hello World !!");

    expect(message).toBeInTheDocument();
  });
});
