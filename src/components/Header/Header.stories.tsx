import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Header } from "./Header";

const meta: Meta<typeof Header> = {
  title: "App/Header",
  component: Header,
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: "/",
        query: {},
      },
    },
  },
  args: {
    backgroundColorHex: undefined,
    titleLogoProps: undefined,
  },
  argTypes: {
    backgroundColorHex: {
      control: { type: "color" },
    },
    titleLogoProps: {
      control: "object",
    },
  },
};

export default meta;

type Story = StoryObj<typeof Header>;

export const Default: Story = {};

export const CustomBackground: Story = {
  args: {
    backgroundColorHex: "#111827",
    titleLogoProps: {
      textColor: "#f9fafb",
      hoverTextColor: "#ffffff",
    },
  },
};

const withFixedWidth =
  (widthPx: number) => (StoryComponent: () => JSX.Element) => (
    <div style={{ width: `${widthPx}px`, border: "1px dashed #d1d5db" }}>
      <StoryComponent />
    </div>
  );

export const Narrow: Story = {
  decorators: [withFixedWidth(375)],
};

export const Wide: Story = {
  decorators: [withFixedWidth(1024)],
};
