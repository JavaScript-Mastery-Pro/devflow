import { test, expect } from "@playwright/test";

test.describe("Signup and Profile Update", () => {
  test("should allow user to update profile", async ({ page }) => {
    // No fixture needed, just navigate and test
    await page.goto("/profile/edit");
    await expect(page).toHaveURL("/profile/edit");

    // Verify we're on the right page
    await expect(page.getByRole("heading", { name: "Edit Profile" })).toBeVisible();

    // Fill out the profile form with updated values
    await page.getByPlaceholder("Your Name").fill("Updated Test User");
    await page.getByPlaceholder("Your username").fill("updatedusername");
    await page.getByPlaceholder("Your Portfolio link").fill("https://updated-portfolio.com");
    await page.getByPlaceholder("Where do you live?").fill("Updated City, Country");
    await page
      .getByPlaceholder("What's special about you?")
      .fill("This is my updated bio with more information about myself.");

    // Submit the form
    await page.getByRole("button", { name: "Submit" }).click();

    // After submission, should redirect to profile page
    await expect(page).toHaveURL(/\/profile\/[a-f0-9]+$/);

    // Verify updated profile information is visible
    await expect(page.getByRole("heading", { name: "Updated Test User", exact: true })).toBeVisible();
    await expect(page.getByText("@updatedusername")).toBeVisible();
    await expect(
      page.getByText("This is my updated bio with more information about myself.", { exact: false })
    ).toBeVisible();
    await expect(page.getByText("Updated City, Country", { exact: false })).toBeVisible();
  });
});
