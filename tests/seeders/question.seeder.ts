import { Question, Tag } from "@/database";

import { TestQuestion } from "../fixtures/questions";

export async function createTestQuestion(questionDetails: TestQuestion & { author: string }) {
  // Create or get all tags in parallel using findOneAndUpdate
  const tagIds = await Promise.all(
    questionDetails.tags.map(async (tagName: string) => {
      const tag = await Tag.findOneAndUpdate(
        { name: tagName },
        { $setOnInsert: { name: tagName } },
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );

      return tag._id;
    })
  );

  const question = await Question.create({
    title: questionDetails.title,
    content: questionDetails.content,
    tags: tagIds,
    author: questionDetails.author,
  });

  console.log(`❓ Created test question: ${questionDetails.title}`);
  return question;
}
