import { test, expect } from "@playwright/test";

import { BROWSER_USERS } from "@/tests/fixtures/users";

test.describe("Authentication Setup", () => {
  test("authenticate and save storage state", async ({ page }) => {
    // Go directly to sign-in
    await page.goto("/sign-in");

    // Sign in using real UI
    await page.getByLabel("Email Address").fill(BROWSER_USERS.chrome.email);
    await page.getByLabel("Password").fill(BROWSER_USERS.chrome.password);
    await page.getByRole("button", { name: /sign in/i }).click();

    // Wait for session cookie to be set, then go home
    await expect
      .poll(async () => {
        const cookies = await page.context().cookies();
        return cookies.some((c) =>
          [
            "next-auth.session-token",
            "__Secure-next-auth.session-token",
            "authjs.session-token",
            "__Secure-authjs.session-token",
          ].includes(c.name)
        );
      })
      .toBe(true);

    await page.goto("/");

    // Persist authenticated state for dependent tests
    await page.context().storageState({ path: "storage/user_chrome.json" });
  });
});
