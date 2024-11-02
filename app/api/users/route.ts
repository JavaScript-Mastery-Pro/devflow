import { NextRequest, NextResponse } from "next/server";

import User from "@/database/user.model";
import handleError from "@/lib/handlers/error";
import dbConnect from "@/lib/mongoose";
import { UserSchema } from "@/lib/validations";

export async function GET() {
  try {
    await dbConnect();

    const users = await User.find({});
    return NextResponse.json(
      {
        success: true,
        data: users,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return handleError(error, "api") as APIErrorResponse;
  }
}

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    const body = await request.json();

    const validatedData = UserSchema.parse(body);

    const existingUser = await User.findOne({ email: validatedData.email });
    if (existingUser) throw new Error("User already exists");

    const existingUsername = await User.findOne({
      username: validatedData.username,
    });
    if (existingUsername) throw new Error("Username already exists");

    const newUser = User.create(validatedData);

    return NextResponse.json(
      {
        success: true,
        data: newUser,
      },
      { status: 201 }
    );
  } catch (error) {
    return handleError(error, "api") as APIErrorResponse;
  }
}
