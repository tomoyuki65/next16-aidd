import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useForm } from "react-hook-form";
import { describe, expect, it } from "vitest";

import { Input } from "./Input";

describe("Input", () => {
  it("placeholderが表示される", () => {
    render(<Input placeholder="type here" />);
    expect(screen.getByPlaceholderText("type here")).toBeInTheDocument();
  });

  it("textSize未指定時に text-base が付与される", () => {
    render(<Input placeholder="x" />);
    expect(screen.getByPlaceholderText("x")).toHaveClass("text-base");
  });

  it("デフォルト文字色が黒系（text-slate-900）になる", () => {
    render(<Input placeholder="x" />);
    expect(screen.getByPlaceholderText("x")).toHaveClass("text-slate-900");
  });

  it("textSize指定で文字サイズクラスが変わる", () => {
    const { rerender } = render(<Input placeholder="x" textSize="sm" />);
    expect(screen.getByPlaceholderText("x")).toHaveClass("text-sm");

    rerender(<Input placeholder="x" textSize="lg" />);
    expect(screen.getByPlaceholderText("x")).toHaveClass("text-lg");
  });

  it("textColorHex指定時に input.style.color が反映される", () => {
    render(<Input placeholder="x" textColorHex="#111111" />);
    const input = screen.getByPlaceholderText("x") as HTMLInputElement;
    expect(input.style.color).toBe("rgb(17, 17, 17)");
  });

  it("error.message が表示され、 text-red-600 が付与される", () => {
    render(
      <Input
        placeholder="x"
        error={{ type: "manual", message: "Error message" }}
      />,
    );
    const message = screen.getByText("Error message");
    expect(message).toBeInTheDocument();
    expect(message).toHaveClass("text-red-600");
  });

  it("errorTextSize未指定時に text-sm が付与される", () => {
    render(
      <Input
        placeholder="x"
        error={{ type: "manual", message: "Error message" }}
      />,
    );
    expect(screen.getByText("Error message")).toHaveClass("text-sm");
  });

  it("errorTextSize=xs で text-xs が付与される", () => {
    render(
      <Input
        placeholder="x"
        error={{ type: "manual", message: "Error message" }}
        errorTextSize="xs"
      />,
    );
    expect(screen.getByText("Error message")).toHaveClass("text-xs");
  });

  it("react-hook-form の register() を渡して userEvent.type で値更新できる", async () => {
    const Form = () => {
      const { register } = useForm<{ field: string }>({
        defaultValues: { field: "" },
      });

      return <Input placeholder="field" {...register("field")} />;
    };

    render(<Form />);

    const input = screen.getByPlaceholderText("field");
    await userEvent.type(input, "hello");
    expect(input).toHaveValue("hello");
  });
});
