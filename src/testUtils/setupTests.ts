import { afterAll, afterEach, beforeAll } from "vitest";
import { setupMockServer } from "./mock/server";

const server = setupMockServer();

beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());

afterAll(() => server.close());
