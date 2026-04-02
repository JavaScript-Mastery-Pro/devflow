import { expect } from "@playwright/test";

import { test } from "../fixtures/question.fixture";
// import { SAMPLE_QUESTIONS } from "@/tests/fixtures/questions";

// const question = SAMPLE_QUESTIONS[0];

test.describe("Question Flow", () => {
  test("should allow user to update question", async ({ page, createQuestion, question }) => {
    const { questionId } = createQuestion;

    await page.goto(`/questions/${questionId}/edit`);
    await expect(page).toHaveURL(/\/questions\/[a-f0-9]+\/edit$/);

    // Fill out the question form
    await page.getByRole("textbox", { name: "Question Title *" }).fill(`${question.title} - E2E Test`);
    await page.getByRole("textbox", { name: "editable markdown" }).fill(`${question.content} - E2E Test`);

    // remove first tag and add a new one
    await page.getByRole("button", { name: question.tags[0] }).getByRole("img", { name: "close icon" }).click();

    await page.getByRole("textbox", { name: "Add tags..." }).fill("test");
    await page.getByRole("textbox", { name: "Add tags..." }).press("Enter");

    await page.getByRole("button", { name: "Save edits" }).click();

    // after submission, check udpated question details
    await expect(page).toHaveURL(`/questions/${questionId}`);
    // await expect(page).toHaveURL(/\/questions\/[a-f0-9]+$/);

    await expect(
      page.getByRole("heading", {
        name: `${question.title} - E2E Test`,
        exact: true,
      })
    ).toBeVisible();
    await expect(page.getByText(`${question.content} - E2E Test`, { exact: false })).toBeVisible();

    await expect(page.getByRole("link", { name: question.tags[0], exact: true })).not.toBeVisible();
    await expect(page.getByRole("link", { name: "test", exact: true })).toBeVisible();
  });
});
