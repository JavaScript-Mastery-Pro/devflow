import { Question, User, Vote } from "@/database";
import { createVote } from "@/lib/actions/vote.action";
import { mockAuth } from "@/tests/mocks";

jest.mock("next/cache", () => ({
  revalidatePath: jest.fn(),
}));

jest.mock("next/server", () => ({
  after: jest.fn((callback: () => void) => callback()),
}));

describe("createVote action", () => {
  describe("validation", () => {
    beforeEach(async () => {
      const testUser = await User.create({
        name: "Test User",
        username: "testuser",
        email: "test@example.com",
      });

      await Question.create({
        title: "Test Question",
        content: "This is a test question",
        author: testUser._id,
        tags: [],
      });

      mockAuth.mockResolvedValue({
        user: {
          id: testUser._id.toString(),
          name: testUser.name,
          email: testUser.email,
        },
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      });
    });

    afterEach(async () => {
      await Vote.deleteMany({});
      await Question.deleteMany({});
      await User.deleteMany({});
      jest.clearAllMocks();
    });

    it("should return error for invalid targetId", async () => {
      const result = await createVote({
        targetId: "invalid-id",
        targetType: "question",
        voteType: "upvote",
      });

      expect(result.success).toBe(false);
      expect(result.error).toBeDefined();
    });

    it("should return error when user is not authenticated", async () => {
      mockAuth.mockResolvedValueOnce(null);

      const testQuestion = await Question.findOne();
      const result = await createVote({
        targetId: testQuestion!._id.toString(),
        targetType: "question",
        voteType: "upvote",
      });

      expect(result.success).toBe(false);
      expect(result.error).toBeDefined();
      expect(result.error && result.error.message).toContain("Unauthorized");
    });
  });

  describe("Vote Creation", () => {
    beforeEach(async () => {
      const testUser = await User.create({
        name: "Test User",
        username: "testuser",
        email: "test@example.com",
      });

      await Question.create({
        title: "Test Question",
        content: "This is a test question",
        author: testUser._id,
        tags: [],
      });

      mockAuth.mockResolvedValue({
        user: {
          id: testUser._id.toString(),
          name: testUser.name,
          email: testUser.email,
        },
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      });
    });

    afterEach(async () => {
      await Vote.deleteMany({});
      await Question.deleteMany({});
      await User.deleteMany({});
      jest.clearAllMocks();
    });

    it("should create an upvote on a question and increment upvote count", async () => {
      const testQuestion = await Question.findOne();
      const testUser = await User.findOne();

      const result = await createVote({
        targetId: testQuestion!._id.toString(),
        targetType: "question",
        voteType: "upvote",
      });

      expect(result.success).toBe(true);

      const vote = await Vote.findOne({
        author: testUser!._id,
        actionId: testQuestion!._id,
        actionType: "question",
      });

      expect(vote).toBeDefined();
      expect(vote?.voteType).toBe("upvote");

      const updatedQuestion = await Question.findById(testQuestion!._id);
      expect(updatedQuestion?.upvotes).toBe(1);
      expect(updatedQuestion?.downvotes).toBe(0);
    });

    it("should create a downvote on a question and increment downvote count", async () => {
      const testQuestion = await Question.findOne();
      const testUser = await User.findOne();

      const result = await createVote({
        targetId: testQuestion!._id.toString(),
        targetType: "question",
        voteType: "downvote",
      });

      expect(result.success).toBe(true);

      const vote = await Vote.findOne({
        author: testUser!._id,
        actionId: testQuestion!._id,
        actionType: "question",
      });

      expect(vote).toBeDefined();
      expect(vote?.voteType).toBe("downvote");

      const updatedQuestion = await Question.findById(testQuestion!._id);
      expect(updatedQuestion?.upvotes).toBe(0);
      expect(updatedQuestion?.downvotes).toBe(1);
    });
  });
});
