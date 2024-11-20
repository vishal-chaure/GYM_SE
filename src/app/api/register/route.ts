import User from "@/models/User";
import connect from "@/utils/db";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

// Define types for the request body
interface RegisterRequestBody {
  username: string;
  fullname: string;
  email: string;
  password: string;
}

export const POST = async (req: Request) => {
  // Parse the request body
  const { username, fullname, email, password }: RegisterRequestBody = await req.json();

  try {
    await connect(); // Ensure this connection is successful
  } catch (error) {
    console.error("Database connection error:", error);
    return new NextResponse("Internal server error", { status: 500 });
  }

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return new NextResponse("Email is already in use", { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(password, 5);
  const newUser = new User({
    username,
    fullname,
    email,
    password: hashedPassword,
  });

  try {
    await newUser.save();
    return new NextResponse("user is registered", { status: 200 });
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.log(err.message);
      return new NextResponse(err.message, {
        status: 500,
      });
    } else {
      console.log("An unknown error occurred");
      return new NextResponse("Internal server error", {
        status: 500,
      });
    }
  }
};