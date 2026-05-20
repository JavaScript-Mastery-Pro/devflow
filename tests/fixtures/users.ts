export interface TestUser {
  name: string;
  username: string;
  email: string;
  password: string;
}

// Browser-specific users for E2E authentication
export const BROWSER_USERS: Record<string, TestUser> = {
  chrome: {
    name: "Chrome Test User",
    username: "chromeuser",
    email: "e2e-chrome@test.com",
    password: "password123",
  },
  firefox: {
    name: "Firefox Test User",
    username: "firefoxuser",
    email: "e2e-firefox@test.com",
    password: "password123",
  },
  safari: {
    name: "Safari Test User",
    username: "safariuser",
    email: "e2e-safari@test.com",
    password: "password123",
  },
  edge: {
    name: "Edge Test User",
    username: "edgeuser",
    email: "e2e-edge@test.com",
    password: "password123",
  },
};

// Common test users for various scenarios
export const COMMON_USERS: TestUser[] = [
  {
    name: "Regular Test User",
    username: "testuser",
    email: "test@example.com",
    password: "password123",
  },
  {
    name: "Admin User",
    username: "admin",
    email: "admin@example.com",
    password: "admin123",
  },
  {
    name: "Moderator User",
    username: "moderator",
    email: "mod@example.com",
    password: "mod123",
  },
  {
    name: "John Developer",
    username: "johndev",
    email: "john@dev.com",
    password: "dev123",
  },
  {
    name: "Sarah Designer",
    username: "sarahdesign",
    email: "sarah@design.com",
    password: "design123",
  },
];
