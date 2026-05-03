import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import type { FieldError } from "react-hook-form";

import { Input } from "./Input";

const requiredError: FieldError = {
  type: "required",
  message: "This field is required",
};

const meta: Meta<typeof Input> = {
  title: "Common/Input",
  component: Input,
  decorators: [
    (Story) => (
      <div className="p-6">
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof Input>;

export const Default: Story = {
  render: (args) => (
    <div className="w-80">
      <Input {...args} />
    </div>
  ),
  args: {
    placeholder: "Search...",
  },
};

export const TextSizeSm: Story = {
  args: {
    placeholder: "Small text",
    textSize: "sm",
  },
};

export const TextSizeLg: Story = {
  args: {
    placeholder: "Large text",
    textSize: "lg",
  },
};

export const TextColorHex: Story = {
  args: {
    placeholder: "Colored text",
    textColorHex: "#0ea5e9",
  },
};

export const TextColorHexRed: Story = {
  args: {
    placeholder: "Colored text (red)",
    textColorHex: "#dc2626",
    defaultValue: "Red text",
  },
};

export const WithError: Story = {
  args: {
    placeholder: "With error",
    error: requiredError,
    errorTextSize: "xs",
  },
};

export const Disabled: Story = {
  args: {
    placeholder: "Disabled",
    disabled: true,
  },
};
