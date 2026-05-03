import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { delay, HttpResponse, http } from "msw";
import type { ReactElement } from "react";
import { SWRConfig } from "swr";

import { endpoints } from "@/lib/api/endpoints";

import { TopPage } from "./TopPage";

const meta: Meta<typeof TopPage> = {
  title: "App/TopPage",
  component: TopPage,
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: "/",
        query: {},
      },
    },
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
};

export default meta;

type Story = StoryObj<typeof TopPage>;

export const Default: Story = {};

export const Loading: Story = {
  parameters: {
    nextjs: {
      navigation: {
        query: { search: "react", page: "1" },
      },
    },
    msw: {
      handlers: [
        http.get(endpoints.github.searchRepositories, async () => {
          await delay("infinite");
          return HttpResponse.json({ total_count: 0, items: [] });
        }),
      ],
    },
  },
};

export const ErrorState: Story = {
  parameters: {
    nextjs: {
      navigation: {
        query: { search: "react", page: "1" },
      },
    },
    msw: {
      handlers: [
        http.get(endpoints.github.searchRepositories, () => {
          return HttpResponse.json({ message: "Mock error" }, { status: 500 });
        }),
      ],
    },
  },
};

export const Results: Story = {
  parameters: {
    nextjs: {
      navigation: {
        query: { search: "react", page: "1" },
      },
    },
  },
};

const withFixedWidth =
  (widthPx: number) => (StoryComponent: () => ReactElement) => (
    <div style={{ width: `${widthPx}px` }}>
      <StoryComponent />
    </div>
  );

export const Mobile: Story = {
  decorators: [withFixedWidth(375)],
  parameters: {
    nextjs: {
      navigation: {
        query: { search: "react", page: "1" },
      },
    },
  },
};

export const Desktop: Story = {
  decorators: [withFixedWidth(1024)],
  parameters: {
    nextjs: {
      navigation: {
        query: { search: "react", page: "1" },
      },
    },
  },
};
