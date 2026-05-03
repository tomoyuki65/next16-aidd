import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Card } from "./Card";

const meta: Meta<typeof Card> = {
  title: "Common/Card",
  component: Card,
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <div className="w-[360px] max-w-[calc(100vw-48px)] p-6">
        <Story />
      </div>
    ),
  ],
  args: {
    repoName: "openai/codex",
    ownerImageUrl: "https://avatars.githubusercontent.com/u/63446725?s=200&v=4",
  },
  argTypes: {
    repoName: { control: "text" },
    ownerImageUrl: { control: "text" },
    repoNameTextSizeClassName: { control: "text" },
    repoNameTextColorClassName: { control: "text" },
    repoNameTextColorHex: { control: "color" },
    paddingXClassName: { control: "text" },
    borderClassName: { control: "text" },
    shadowClassName: { control: "text" },
    bgClassName: { control: "text" },
    hoverBgClassName: { control: "text" },
    bgColorHex: { control: "color" },
    hoverBgColorHex: { control: "color" },
    repoNameMaxLines: { control: "select", options: [undefined, 1, 2] },
    minHeightClassName: { control: "text" },
    className: { control: "text" },
    onClick: { action: "clicked" },
  },
};

export default meta;

type Story = StoryObj<typeof Card>;

export const Default: Story = {};

export const NoOwnerImage: Story = {
  args: {
    ownerImageUrl: undefined,
  },
};

export const LongRepoName: Story = {
  args: {
    repoName:
      "some-owner/some-very-very-very-very-very-very-very-long-repository-name-to-test-wrapping",
  },
};

export const ClampedTwoLines: Story = {
  args: {
    repoName:
      "some-owner/some-very-very-very-very-very-very-very-long-repository-name-to-test-wrapping",
    repoNameMaxLines: 2,
    minHeightClassName: "min-h-[88px]",
  },
};

export const ListExampleFixedHeights: Story = {
  render: (args) => (
    <div className="flex w-full max-w-[420px] flex-col gap-3">
      <Card {...args} repoName="owner/short" />
      <Card
        {...args}
        repoName="owner/medium-repository-name"
        ownerImageUrl={undefined}
      />
      <Card
        {...args}
        repoName="some-owner/some-very-very-very-very-very-very-very-long-repository-name-to-test-wrapping"
      />
      <Card {...args} repoName="owner/another-short" />
      <Card
        {...args}
        repoName="owner/another-super-long-repository-name-to-ensure-we-trigger-the-second-line-and-then-some"
      />
    </div>
  ),
  args: {
    repoNameMaxLines: 2,
    minHeightClassName: "min-h-[88px]",
    className: "w-full",
  },
  decorators: [
    (Story) => (
      <div className="w-full max-w-[calc(100vw-48px)] p-6">
        <Story />
      </div>
    ),
  ],
};

export const CustomTypography: Story = {
  args: {
    repoNameTextSizeClassName: "text-sm",
    repoNameTextColorClassName: "text-sky-700",
  },
};

export const CustomPaddingAndBg: Story = {
  args: {
    paddingXClassName: "px-3",
    bgClassName: "bg-gray-900",
    hoverBgClassName: "hover:bg-gray-800",
    borderClassName: "border border-white/10",
    shadowClassName: "shadow-none",
    repoNameTextColorClassName: "text-white",
  },
};

export const Responsive: Story = {
  decorators: [
    (Story) => (
      <div className="w-full max-w-[720px] p-6">
        <Story />
      </div>
    ),
  ],
  args: {
    className: "w-full max-w-[420px] md:max-w-[560px]",
  },
};
