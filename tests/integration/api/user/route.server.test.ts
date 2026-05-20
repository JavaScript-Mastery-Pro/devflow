import { testApiHandler } from "next-test-api-route-handler";

import { GET } from "@/app/api/users/route";
import User from "@/database/user.model";

describe("GET /api/users", () => {
  afterAll(async () => {
    await User.deleteMany({});
  });

  it("should return all users", async () => {
    await User.create({
      username: "johndoe",
      email: "johndoe@gmail.com",
      name: "John Doe",
    });

    await testApiHandler({
      appHandler: { GET },
      test: async ({ fetch }) => {
        const res = await fetch();
        const json = await res.json();

        expect(res.status).toBe(200);
        expect(res.headers.get("content-type")).toMatch(/application\/json/);
        expect(json.success).toBe(true);
        expect(json.data).toHaveLength(1);
        expect(json.data[0]).toEqual(
          expect.objectContaining({
            username: "johndoe",
            name: "John Doe",
            email: "johndoe@gmail.com",
          })
        );
      },
    });
  });
});
