// src/components/common/Sample/Sample.stories.tsx

// import type { Meta, StoryObj } from "@storybook/react-vite";
//storybook/nextjs-vite
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { HttpResponse, http } from "msw";

import { Sample } from "./Sample";

const meta: Meta<typeof Sample> = {
  title: "Common/Sample",
  component: Sample,
};

export default meta;

type Story = StoryObj<typeof Sample>;

export const Default: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get("http://localhost:3000/hello", () => {
          return HttpResponse.json({
            message: "Hello from Storybook",
          });
        }),
      ],
    },
  },
  args: {
    label: "Hello Sample",
    count: 0,
  },
};

export const WithCount: Story = {
  args: {
    label: "With Count",
    count: 10,
  },
};
