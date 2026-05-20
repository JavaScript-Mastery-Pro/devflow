import { test as base, expect, BrowserContext, Page } from "@playwright/test";

type QuestionFixture = {
  createQuestion: { questionId: string; title: string; page: Page };
};

export const test = base.extend<QuestionFixture>({
  createQuestion: [
    async ({ browser }, use) => {
      const context: BrowserContext = await browser.newContext();
      const page: Page = await context.newPage();

      await page.goto("/ask-question");
      await expect(page).toHaveURL("/ask-question");

      const questionTitle = `E2E Test Question ${Date.now()}`;

      await page.getByRole("textbox", { name: "Question Title *" }).fill(questionTitle);
      await page
        .getByRole("textbox", { name: "editable markdown" })
        .fill(
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,"
        );

      await page.getByRole("textbox", { name: "Add tags..." }).fill("playwright");
      await page.getByRole("textbox", { name: "Add tags..." }).press("Enter");
      await page.getByRole("button", { name: "Ask a question" }).click();

      await expect(page).toHaveURL(/\/questions\/[a-f0-9]+$/);

      const url = page.url();
      const questionId = url.split("/").pop();
      if (!questionId) {
        throw new Error("Failed to extract questionId from URL");
      }

      await expect(page.getByRole("heading", { name: questionTitle, exact: true })).toBeVisible();

      await use({ questionId, title: questionTitle, page });

      await context.close();
    },
    { scope: "test" },
  ],
});
