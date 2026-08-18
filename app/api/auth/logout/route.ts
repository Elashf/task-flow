import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const response = NextResponse.json({
      message: "Logged out successfully",
    });

    response.cookies.delete("token")
return response

  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 },
    );
  }
}
