import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Search } from "./Search";

const meta: Meta<typeof Search> = {
  title: "App/Search",
  component: Search,
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <div className="w-[32rem] max-w-[90vw] p-6">
        <Story />
      </div>
    ),
  ],
  args: {
    className: "flex w-full items-start gap-2",
    inputWrapperClassName: undefined,
    inputClassName: undefined,
    inputTextColorHex: undefined,
    buttonClassName: undefined,
    buttonBgClass: undefined,
    buttonHoverBgClass: undefined,
    buttonTextColorClass: undefined,
    buttonTextSizeClass: undefined,
    buttonPaddingClass: undefined,
    buttonBgColorHex: undefined,
    buttonHoverBgColorHex: undefined,
    buttonTextColorHex: undefined,
    buttonLabel: undefined,
    defaultQuery: "",
  },
  argTypes: {
    onSearch: { action: "search" },
    className: { control: "text" },
    inputWrapperClassName: { control: "text" },
    inputClassName: { control: "text" },
    inputTextColorHex: { control: { type: "color" } },
    buttonClassName: { control: "text" },
    buttonBgClass: { control: "text" },
    buttonHoverBgClass: { control: "text" },
    buttonTextColorClass: { control: "text" },
    buttonTextSizeClass: { control: "text" },
    buttonPaddingClass: { control: "text" },
    buttonBgColorHex: { control: { type: "color" } },
    buttonHoverBgColorHex: { control: { type: "color" } },
    buttonTextColorHex: { control: { type: "color" } },
    buttonLabel: { control: "text" },
    defaultQuery: { control: "text" },
  },
};

export default meta;

type Story = StoryObj<typeof Search>;

export const Default: Story = {
  args: {
    defaultQuery: "",
  },
};

export const ValidFilled: Story = {
  args: {
    defaultQuery: "react-hook-form",
  },
};

export const InvalidRegex: Story = {
  args: {
    defaultQuery: "invalid query",
  },
};

export const InputTextColor: Story = {
  args: {
    defaultQuery: "react-hook-form",
    inputTextColorHex: "#0284c7",
  },
};

export const ButtonTextAndColor: Story = {
  args: {
    defaultQuery: "react-hook-form",
    buttonLabel: "Search",
    buttonTextColorClass: "text-amber-200",
  },
};

export const ButtonBackground: Story = {
  args: {
    defaultQuery: "react-hook-form",
    buttonBgColorHex: "#ef4444",
    buttonHoverBgColorHex: "#dc2626",
  },
};

const withFixedWidth =
  (widthPx: number) => (StoryComponent: () => JSX.Element) => (
    <div
      style={{ width: `${widthPx}px` }}
      className="rounded-md bg-slate-50 p-3"
    >
      <StoryComponent />
    </div>
  );

export const Mobile: Story = {
  decorators: [withFixedWidth(375)],
  args: {
    className: "grid w-full grid-cols-1 gap-2 sm:grid-cols-[1fr_auto]",
    buttonClassName: "w-full sm:w-auto",
  },
};

export const Desktop: Story = {
  decorators: [withFixedWidth(1024)],
  args: {
    className: "grid w-full grid-cols-[1fr_auto] gap-2",
  },
};
