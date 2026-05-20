import type { Config } from "jest";
import nextJest from "next/jest.js";

const createJestConfig = nextJest({
  dir: "./",
});

const config: Config = {
  verbose: true,
  projects: [
    {
      displayName: "client",
      clearMocks: true,
      testEnvironment: "jsdom",
      testMatch: [
        "**/tests/unit/**/*.+(test|spec).[jt]s?(x)",
        "**/tests/integration/**/*.client.+(test|spec).[jt]s?(x)",
        "**/*.client.+(test|spec).[jt]s?(x)",
      ],
      transform: {
        "^.+\\.(js|jsx|ts|tsx)$": ["babel-jest", { presets: ["next/babel"] }],
      },
      moduleNameMapper: {
        "^@/(.*)$": "<rootDir>/$1",
      },
      setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
      testPathIgnorePatterns: [".*\\.server\\.(test|spec)\\.[jt]s?(x)$"],
    },
    {
      displayName: "server",
      clearMocks: true,
      testEnvironment: "node",
      testMatch: ["**/tests/integration/**/*.server.+(test|spec).[jt]s?(x)", "**/*.server.+(test|spec).[jt]s?(x)"],
      testPathIgnorePatterns: [".*\\.client\\.(test|spec)\\.[jt]s?(x)$"],
      moduleNameMapper: {
        "^@/(.*)$": "<rootDir>/$1",
      },
      setupFilesAfterEnv: ["<rootDir>/jest.server.setup.ts"],
      transform: {
        "^.+\\.(js|jsx|ts|tsx)$": ["babel-jest", { presets: ["next/babel"] }],
      },
    },
  ],
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageReporters: ["html", ["text", { skipFull: true }], "text-summary"],
  collectCoverageFrom: [
    "components/**/*.{js,jsx,ts,tsx}",
    "lib/**/*.{js,ts}",
    "app/**/*.{js,jsx,ts,tsx}",
    "!**/*.d.ts",
    "!**/node_modules/**",
    "!**/*.test.{js,jsx,ts,tsx}",
    "!**/*.spec.{js,jsx,ts,tsx}",
  ],
};

export default createJestConfig(config);
