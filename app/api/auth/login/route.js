import { NextResponse } from "next/server";
import { createToken } from "@/lib/auth";

export async function POST(request) {
  try {
    const body = await request.json();

    const email = body.email?.trim().toLowerCase();
    const password = body.password;

    const validEmail = "mdruhulamin96888@gmail.com";
    const validPassword = "Siam.123.bd";

    if (
      email !== validEmail.toLowerCase() ||
      password !== validPassword
    ) {
      return NextResponse.json(
        {
          success: false,
        },
        {
          status: 401,
        }
      );
    }

    const user = {
      name: "Md Ruhul Amin",
      email: validEmail,
      role: "ADMIN",
    };

    const token = createToken(user);

    const response = NextResponse.json({
      success: true,
      user,
    });

    response.cookies.set("hospital_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Login API error:", error);

    return NextResponse.json(
      {
        success: false,
      },
      {
        status: 500,
      }
    );
  }
}