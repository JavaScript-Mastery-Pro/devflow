import { NextResponse } from "next/server";

import Account from "@/database/account.model";
import handleError from "@/lib/handlers/error";
import { NotFoundError, ValidationError } from "@/lib/http-errors";
import { AccountSchema } from "@/lib/validations";

export async function POST(request: Request) {
  try {
    const { providerAccountId } = await request.json();

    const validatedData = AccountSchema.partial().safeParse({
      providerAccountId,
    });
    if (!validatedData.success)
      throw new ValidationError(validatedData.error.flatten().fieldErrors);

    const account = await Account.findOne({ providerAccountId });
    if (!account) throw new NotFoundError("Account");

    return NextResponse.json(account);
  } catch (error) {
    return handleError(error, "api");
  }
}
