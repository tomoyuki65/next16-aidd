import { setupServer } from "msw/node";
import { githubHandlers } from "../handlers/github";
import { sampleHandlers } from "../handlers/sample";

// mswの設定
export const server = setupServer(...sampleHandlers, ...githubHandlers);
