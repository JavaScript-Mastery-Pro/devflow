import { Types } from "mongoose";
import { testApiHandler } from "next-test-api-route-handler";
import { GET, PUT } from "@/app/api/users/[id]/route";
import User from "@/database/user.model";

// const sleep = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

describe("API Route /api/users/[id]", () => {
  let testUser: User;

  beforeEach(async () => {
    await User.deleteMany({});
    testUser = await User.create({
      username: "johndoe",
      email: "johndoe@gmail.com",
      name: "John Doe",
    });
  });

  afterAll(async () => {
    await User.deleteMany({});
  });

  it("should return a single user by id", async () => {
    await testApiHandler({
      appHandler: { GET },
      params: { id: testUser._id.toString() },
      test: async ({ fetch }) => {
        const res = await fetch();
        const json = await res.json();

        // Make sure the response is correct
        expect(res.status).toBe(200);
        expect(res.headers.get("content-type")).toMatch(/application\/json/);

        // Check the returned user data
        expect(json.success).toBe(true);
        expect(json.data).toEqual(
          expect.objectContaining({
            username: "johndoe",
            name: "John Doe",
            email: "johndoe@gmail.com",
          })
        );
      },
    });
  });

  it("should update multiple fields of a user by id", async () => {
    const updateData = {
      name: "John Updated",
      bio: "This is my bio",
      location: "New York",
    };

    await testApiHandler({
      appHandler: { PUT },
      params: { id: testUser._id.toString() },
      test: async ({ fetch }) => {
        // Send the update request with update data
        const res = await fetch({
          method: "PUT",
          body: JSON.stringify(updateData),
        });

        const json = await res.json();

        // Assert response status
        expect(res.status).toBe(200);
        expect(json.success).toBe(true);

        // Check that updated fields are correct
        expect(json.data.name).toBe(updateData.name);
        expect(json.data.bio).toBe(updateData.bio);
        expect(json.data.location).toBe(updateData.location);

        // Ensure untouched fields remain unchanged
        expect(json.data.username).toBe(testUser.username);
        expect(json.data.email).toBe(testUser.email);
      },
    });
  });

  it("should return 404 when updating non-existing user", async () => {
    await testApiHandler({
      appHandler: { PUT },
      params: { id: "64d2f894b6b1b4e27a93a999" },
      test: async ({ fetch }) => {
        const res = await fetch({
          method: "PUT",
          body: JSON.stringify({ name: "Nope" }),
        });

        const json = await res.json();

        expect(res.status).toBe(404);
        expect(json.success).toBe(false);
        expect(json.error.message).toMatch(/User not found/i);
      },
    });
  });

  it("should handle concurrent updates without losing fields (race condition)", async () => {
    const updateA = { name: "John A", bio: "Bio from A" };
    const updateB = { name: "John B", location: "Los Angeles" };

    await testApiHandler({
      appHandler: { PUT, GET },
      params: { id: testUser._id.toString() },
      test: async ({ fetch }) => {
        // Fire two PUTs concurrently to simulate a race
        const [resA, resB] = await Promise.all([
          fetch({ method: "PUT", body: JSON.stringify(updateA) }),
          fetch({ method: "PUT", body: JSON.stringify(updateB) }),
        ]);

        // Both updates should succeed (or surface proper conflict handling if implemented)
        expect([200, 409]).toContain(resA.status);
        expect([200, 409]).toContain(resB.status);

        if (resA.status === 409 && resB.status === 409) {
          throw new Error("Both concurrent updates conflicted—expected at least one success.");
        }

        // Fetch the final state
        const finalRes = await fetch({ method: "GET" });
        expect(finalRes.status).toBe(200);
        const finalJson = await finalRes.json();
        expect(["John A", "John B"]).toContain(finalJson.data.name);
        expect(finalJson.data.bio).toBe("Bio from A");
        expect(finalJson.data.location).toBe("Los Angeles");
      },
    });
  });

  it("should ignore unknown fields", async () => {
    const update = {
      name: "Ok",
      role: "admin",
      _id: new Types.ObjectId(),
    };

    await testApiHandler({
      appHandler: { PUT, GET },
      params: { id: testUser._id.toString() },
      test: async ({ fetch }) => {
        const res = await fetch({
          method: "PUT",
          body: JSON.stringify(update),
        });
        expect(res.status).toBe(200);
        const final = await (await fetch({ method: "GET" })).json();
        expect(final.data.name).toBe("Ok");
        expect(final.data.role).toBeUndefined(); // or expect 400 if you enforce
        expect(final.data._id).toBe(testUser._id.toString()); // immutable
      },
    });
  });

  it("should sanitize script tags in free text", async () => {
    const dirty = { bio: "<script>alert(1)</script>" };
    await testApiHandler({
      appHandler: { PUT, GET },
      params: { id: testUser._id.toString() },
      test: async ({ fetch }) => {
        await fetch({ method: "PUT", body: JSON.stringify(dirty) });
        const final = await (await fetch({ method: "GET" })).json();

        // Expect sanitized output per your policy
        expect(final.data.bio).not.toMatch(/<script>/i);
      },
    });
  });
});
