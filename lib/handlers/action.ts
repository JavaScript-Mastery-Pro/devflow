"use server";

import { error } from "console";

import { Session } from "next-auth";
import { ZodSchema } from "zod";

import { auth } from "@/auth";

import dbConnect from "../mongoose";

type MiddlewareOptions<T> = {
  params?: T;
  schema?: ZodSchema<T>;
  authorize?: boolean;
};

async function action<T>({
  params,
  schema,
  authorize = false,
}: MiddlewareOptions<T>) {
  if (schema && params) {
    schema.parse(params);
  }

  let session: Session | null = null;
  if (authorize) {
    session = await auth();

    if (!session) {
      throw error;
    }
  }

  await dbConnect();

  return { params, session };
}

export default action;
