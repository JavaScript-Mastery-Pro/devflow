import { expect } from "@playwright/test";
import { SAMPLE_QUESTIONS } from "@/tests/fixtures/questions";
import { test } from "../fixtures/question.fixture";

const answer =
  "This is my answer to the question. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. It should be at least 100 characters long. Should be enough to test the answer.";

test.describe("Answer Flow", () => {
  test.use({ question: SAMPLE_QUESTIONS[1] });

  test("should submit answer to a question successfully", async ({ page, createQuestion }) => {
    const { questionId } = createQuestion;

    await page.goto(`/questions/${questionId}`);
    await expect(page).toHaveURL(`/questions/${questionId}`);

    await page.getByRole("img", { name: "Upvote" }).click();
    await page.getByRole("textbox", { name: "editable markdown" }).fill(answer);
    await page.getByRole("button", { name: "Post Answer" }).click();

    await expect(page.getByText(answer, { exact: false })).toBeVisible();
  });
});
