import { badRequest, notFound, serverError, unauthorized } from "@/lib/api-response";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { createCardSchema } from "@/lib/validations/card";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

  const result = createCardSchema.safeParse(body)
  if(!result.success){
    return badRequest("Validation error" , 
      result.error.issues
    )
  }
  const {title, description , priority, listId} = result.data 
    const user = await getCurrentUser();
    if (!user) {
      return unauthorized()
    }

    const list = await prisma.list.findFirst({
      where: {
        id: listId,
        board: {
          ownerId: user.id,
        },
      },
    });
    if (!list) {
      return notFound("List is not exists")
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

    return serverError()
  }
}
