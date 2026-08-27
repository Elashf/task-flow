import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { createCardSchema } from "@/lib/validations/card";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

  const result = createCardSchema.safeParse(body)
  if(!result.success){
    return NextResponse.json({error:"validation error",
      details: result.error.issues
    },{status:400})
  }
  const {title, description , priority, listId} = result.data 
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const list = await prisma.list.findFirst({
      where: {
        id: listId,
        board: {
          ownerId: user.userId,
        },
      },
    });
    if (!list) {
      return NextResponse.json({ message: "List not found" }, { status: 404 });
    }

    const card = await prisma.card.create({
      data: {
        title,
        description,
        priority,
        listId,
      },
    });
    return NextResponse.json(
      {
        message: "Card created successfully",
        card,
      },
      { status: 201 },
    );
  } catch (error) {
    console.log(error);

    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
