import { test, expect } from "@playwright/test";

import { SAMPLE_QUESTIONS } from "@/tests/fixtures/questions";

const question = SAMPLE_QUESTIONS[0];

test.describe("Ask a Question Flow", () => {
  test("should allow a user to submit a new question and view it on the question page", async ({ page }) => {
    await page.goto("/ask-question");
    await expect(page).toHaveURL("/ask-question");

    await page.getByRole("textbox", { name: "Question Title *" }).dblclick();
    await page.getByRole("textbox", { name: "Question Title *" }).fill(question.title);

    await page.getByRole("textbox", { name: "editable markdown" }).click();
    await page.getByRole("textbox", { name: "editable markdown" }).fill(question.content);

    await page.getByRole("textbox", { name: "Add tags..." }).click();
    await page.getByRole("textbox", { name: "Add tags..." }).fill(question.tags[0]);
    await page.getByRole("textbox", { name: "Add tags..." }).press("Enter");

    await page.getByRole("textbox", { name: "Add tags..." }).click();
    await page.getByRole("textbox", { name: "Add tags..." }).fill(question.tags[1]);
    await page.getByRole("textbox", { name: "Add tags..." }).press("Enter");

    await page.getByRole("button", { name: "Ask a question" }).click();

    // after submission, check the redirected correct question page:
    await expect(page).toHaveURL(/\/questions\/[a-f0-9]+$/);
    await expect(page.getByRole("heading", { name: question.title, exact: true })).toBeVisible();
  });
});
