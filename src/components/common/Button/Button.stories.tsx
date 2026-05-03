import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Button } from "./Button";

const meta: Meta<typeof Button> = {
  title: "Common/Button",
  component: Button,
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
    children: "Button",
  },
  argTypes: {
    bgClass: { control: "text" },
    hoverBgClass: { control: "text" },
    textColorClass: { control: "text" },
    textSizeClass: { control: "text" },
    paddingClass: { control: "text" },
    type: { control: "select", options: ["button", "submit", "reset"] },
    disabled: { control: "boolean" },
    onClick: { action: "clicked" },
  },
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    children: "Search",
  },
};

export const Disabled: Story = {
  args: {
    children: "Disabled",
    disabled: true,
  },
};

export const CustomStyle: Story = {
  args: {
    children: "Custom",
    bgClass: "bg-sky-600",
    hoverBgClass: "hover:bg-sky-700",
    textColorClass: "text-white",
    textSizeClass: "text-sm",
    paddingClass: "px-3 py-1",
  },
};

export const Submit: Story = {
  render: (args) => (
    <form
      onSubmit={(event) => {
        event.preventDefault();
      }}
    >
      <Button {...args} />
    </form>
  ),
  args: {
    children: "Submit",
    type: "submit",
  },
};
