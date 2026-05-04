import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { delay, HttpResponse, http } from "msw";
import { SWRConfig } from "swr";

import { endpoints } from "@/lib/api/endpoints";

import { RepositoryDetailPage } from "./RepositoryDetailPage";

const meta: Meta<typeof RepositoryDetailPage> = {
  title: "App/RepositoryDetailPage",
  component: RepositoryDetailPage,
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => (
      <div className="min-h-screen bg-zinc-50 font-sans">
        <SWRConfig value={{ provider: () => new Map() }}>
          <Story />
        </SWRConfig>
      </div>
    ),
  ],
  args: {
    owner: "test",
    repo: "hello-world",
  },
  argTypes: {
    owner: { control: "text" },
    repo: { control: "text" },
  },
};

export default meta;

type Story = StoryObj<typeof RepositoryDetailPage>;

export const Default: Story = {};

export const Loading: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get(
          endpoints.github.repositoryDetail("test", "hello-world"),
          async () => {
            await delay("infinite");
            return HttpResponse.json({});
          },
        ),
      ],
    },
  },
};

export const ErrorState: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get(
          endpoints.github.repositoryDetail("test", "hello-world"),
          () => {
            return HttpResponse.json(
              { message: "Mock error" },
              { status: 500 },
            );
          },
        ),
      ],
    },
  },
};

export const MobilIphone5: Story = {
  globals: {
    viewport: { value: "iphone5", isRotated: false },
  },
};

export const MobilIphone14promax: Story = {
  globals: {
    viewport: { value: "iphone14promax", isRotated: false },
  },
};

export const TabletIpad: Story = {
  globals: {
    viewport: { value: "ipad", isRotated: false },
  },
};

export const Desktop: Story = {
  globals: {
    viewport: { value: "desktop", isRotated: false },
  },
};
