import bcrypt from "bcryptjs";

import { Account, User } from "@/database";

import { TestUser } from "../fixtures/users";

export async function createTestUser(userDetails: TestUser) {
  const user = await User.create({
    name: userDetails.name,
    username: userDetails.username,
    email: userDetails.email,
  });

  await Account.create({
    userId: user._id,
    name: userDetails.name,
    provider: "credentials",
    providerAccountId: userDetails.email,
    password: await bcrypt.hash(userDetails.password || "password123", 12),
  });

  console.log(`👤 Created test user: ${userDetails.username}`);
  return user;
}
