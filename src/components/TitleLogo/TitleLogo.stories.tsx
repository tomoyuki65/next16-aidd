import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { expect, userEvent, within } from "storybook/test";

import { TitleLogo } from "./TitleLogo";

const meta: Meta<typeof TitleLogo> = {
  title: "App/TitleLogo",
  component: TitleLogo,
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: "/",
        query: {},
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof TitleLogo>;

export const Default: Story = {
  args: {
    title: "Next16-AIDD",
    backgroundColor: "#e5e7eb",
    textColor: "#374151",
    hoverTextColor: "#1f2937",
    fontSize: "1.125rem",
  },
};

export const Hover: Story = {
  args: Default.args,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const link = canvas.getByRole("link", { name: "Next16-AIDD" });

    await expect(link).toHaveStyle({ color: "rgb(55, 65, 81)" });
    await userEvent.hover(link);
    await expect(link).toHaveStyle({ color: "rgb(31, 41, 55)" });
  },
};
