import { test as base, expect, BrowserContext, Page } from "@playwright/test";
import { SAMPLE_QUESTIONS, TestQuestion } from "@/tests/fixtures/questions";

type QuestionFixture = {
  question: TestQuestion;
  createQuestion: { questionId: string; title: string; page: Page };
};

const FALLBACK_QUESTION = SAMPLE_QUESTIONS[0];

export const test = base.extend<QuestionFixture>({
  question: [FALLBACK_QUESTION, { scope: "test" }],
  createQuestion: [
    async ({ browser, question }, use) => {
      const context: BrowserContext = await browser.newContext();
      const page: Page = await context.newPage();

      await page.goto("/ask-question");
      await expect(page).toHaveURL("/ask-question");

      await page.getByRole("textbox", { name: "Question Title *" }).fill(question.title);
      await page.getByRole("textbox", { name: "editable markdown" }).fill(question.content);

      for (const tag of question.tags) {
        await page.getByRole("textbox", { name: "Add tags..." }).fill(tag);
        await page.getByRole("textbox", { name: "Add tags..." }).press("Enter");
      }

      await page.getByRole("button", { name: "Ask a question" }).click();
      await expect(page).toHaveURL(/\/questions\/[a-f0-9]+$/);

      const url = page.url();
      const questionId = url.split("/").pop();
      if (!questionId) throw new Error("Failed to extract questionId from URL");

      await expect(page.getByRole("heading", { name: question.title, exact: true })).toBeVisible();

      await use({ questionId, title: question.title, page });
      await context.close();
    },
    { scope: "test" },
  ],
});
