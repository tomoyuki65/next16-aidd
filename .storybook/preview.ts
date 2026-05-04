import type { Preview } from "@storybook/nextjs-vite";
import "@/app/globals.css";
import { initialize, mswLoader } from "msw-storybook-addon";
import { INITIAL_VIEWPORTS, MINIMAL_VIEWPORTS } from "storybook/viewport";
import { githubHandlers } from "@/lib/msw/handlers/github";
import { sampleHandlers } from "@/lib/msw/handlers/sample";

// mswの初期化
initialize({ onUnhandledRequest: "warn" }, [
  ...sampleHandlers,
  ...githubHandlers,
]);

const preview: Preview = {
  // mswの設定追加
  loaders: [mswLoader],

  parameters: {
    viewport: {
      options: {
        ...INITIAL_VIEWPORTS,
        ...MINIMAL_VIEWPORTS,
      },
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: "todo",
    },
  },
};

export default preview;
