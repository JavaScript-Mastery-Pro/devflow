"use server";

import bcrypt from "bcryptjs";
import mongoose from "mongoose";

import { signIn } from "@/auth";
import Account from "@/database/account.model";
import User from "@/database/user.model";

import action from "../handlers/action";
import handleError from "../handlers/error";
import { NotFoundError } from "../http-errors";
import { SignUpSchema } from "../validations";

export async function signUpWithCredentials(
  params: signUpWithCredentialsParams
): Promise<ActionResponse> {
  const validationResult = await action({
    params,
    schema: SignUpSchema,
  });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ActionErrorResponse;
  }

  const { name, username, email, password } = validationResult.params!;

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const existingUser = await User.findOne({ email }).session(session);
    if (existingUser) throw new Error("User already exists");

    const existingUsername = await User.findOne({ username }).session(session);
    if (existingUsername) throw new Error("Username already exists");

    const hashedPassword = await bcrypt.hash(password, 12);

    const [newUser] = await User.create([{ username, name, email }], {
      session,
    });

    await Account.create(
      [
        {
          userId: newUser._id,
          name,
          provider: "credentials",
          providerAccountId: email,
          password: hashedPassword,
        },
      ],
      { session }
    );

    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    await session.commitTransaction();

    return { success: true };
  } catch (error) {
    await session.abortTransaction();
    return handleError(error) as ActionErrorResponse;
  } finally {
    await session.endSession();
  }
}

export async function signInWithCredentials(
  params: signInWithCredentialsParams
): Promise<ActionResponse> {
  const validationResult = await action({
    params,
    schema: SignUpSchema,
  });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ActionErrorResponse;
  }

  const { email, password } = validationResult.params!;

  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser) throw new NotFoundError("User");

    const existingAccount = await Account.findOne({
      provider: "credentials",
      providerAccountId: email,
    });
    if (!existingAccount) throw new NotFoundError("Account");

    const passwordMatch = await bcrypt.compare(
      password,
      existingAccount.password
    );
    if (!passwordMatch) throw new Error("Invalid password");

    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    return { success: true };
  } catch (error) {
    return handleError(error) as ActionErrorResponse;
  }
}
