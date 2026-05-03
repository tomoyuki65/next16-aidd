import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useState } from "react";

import { Pagination } from "./Pagination";

const meta: Meta<typeof Pagination> = {
  title: "Common/Pagination",
  component: Pagination,
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <div className="p-6">
        <Story />
      </div>
    ),
  ],
  args: {
    page: 1,
    totalPages: 12,
  },
  argTypes: {
    page: { control: { type: "number", min: 1, step: 1 } },
    totalPages: { control: { type: "number", min: 1, step: 1 } },
    className: { control: "text" },
    onPageChange: { action: "pageChanged" },
    buttonClassNames: { control: "object" },
  },
};

export default meta;

type Story = StoryObj<typeof Pagination>;

export const FirstPage: Story = {
  args: {
    page: 1,
    totalPages: 12,
  },
};

export const MiddlePage: Story = {
  args: {
    page: 6,
    totalPages: 12,
  },
};

export const LastPage: Story = {
  args: {
    page: 12,
    totalPages: 12,
  },
};

export const FewPagesNoEllipsis: Story = {
  args: {
    page: 3,
    totalPages: 5,
  },
};

export const Interactive: Story = {
  render: (args) => {
    const [page, setPage] = useState(args.page);

    return (
      <Pagination
        {...args}
        page={page}
        onPageChange={(nextPage) => {
          args.onPageChange?.(nextPage);
          setPage(nextPage);
        }}
      />
    );
  },
  args: {
    page: 6,
    totalPages: 12,
  },
};

export const CustomButtonStyles: Story = {
  args: {
    page: 6,
    totalPages: 12,
    buttonClassNames: {
      textSizeClass: "text-xs",
      paddingClass: "px-2 py-1",
      bgColorHex: "#0284c7",
      hoverBgColorHex: "#0369a1",
      textColorHex: "#ffffff",
      activeBgColorHex: "#0c4a6e",
      activeHoverBgColorHex: "#082f49",
      activeTextColorHex: "#ffffff",
    },
  },
};
