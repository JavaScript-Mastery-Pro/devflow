import "@testing-library/jest-dom";
import * as integrationDb from "./tests/config/db-integration";
import { mockAuth } from "./tests/mocks";

jest.mock("./auth", () => ({
  auth: mockAuth,
}));

jest.mock("@/lib/mongoose", () => ({
  __esModule: true,
  default: jest.fn(() => Promise.resolve()),
}));

beforeAll(async () => {
  await integrationDb.connectDB();
}, 30000);

beforeEach(async () => {
  if (integrationDb.isDBConnected()) {
    await integrationDb.clearDB();
  }
}, 10000);

afterAll(async () => {
  await integrationDb.clearDB();
});

afterAll(async () => {
  await integrationDb.disconnectDB();
}, 10000);

process.on("SIGINT", async () => {
  await integrationDb.disconnectDB();
  process.exit(0);
});

process.on("SIGTERM", async () => {
  await integrationDb.disconnectDB();
  process.exit(0);
});
