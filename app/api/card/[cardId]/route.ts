import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { cardIdSchema, moveCardSchema, updateCardSchema } from "@/lib/validations/card";
import { NextResponse } from "next/server";
type Props = {
  params: Promise<{ cardId: string }>;
};
export async function DELETE(request: Request, { params }: Props) {
  try {
    const body = await params;
    const result = cardIdSchema.safeParse(body)
    if(!result.success){
       return NextResponse.json({ message: "validation error" ,
        errors: result.error.issues
        }, { status: 400 });
    }
    const {cardId} = result.data
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ message: "Unathorized" }, { status: 401 });
    }

    const card = await prisma.card.findFirst({
      where: {
        id: cardId,
        list: {
          board: {
            ownerId: user.id,
          },
        },
      },
    });
    if (!card) {
      return NextResponse.json({ message: "Card not found" }, { status: 404 });
    }

    await prisma.card.delete({
      where: {
        id: cardId,
      },
    });

    return NextResponse.json({
      message: "Card deleted successfully",
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: Props) {
  try {
    const paramsData = await params;
    const cardIdResult = cardIdSchema.safeParse(paramsData)
    if(!cardIdResult.success){
       return NextResponse.json({ message: "validation error" }, { status: 400 });
    }
    const {cardId} = cardIdResult.data
    const body = await request.json();
    const result = updateCardSchema.safeParse(body)
    if(!result.success){
       return NextResponse.json({ message: "validation error",
        errors:result.error.issues
        }, { status: 400 });
    }
    const {title , description , priority} =result.data
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ message: "Unathorized" }, { status: 401 });
    }

    const card = await prisma.card.findFirst({
      where: {
        id: cardId,
        list: {
          board: {
            ownerId: user.id,
          },
        },
      },
    });
    if (!card) {
      return NextResponse.json({ message: "Card not found" }, { status: 404 });
    }

    await prisma.card.update({
      where: {
        id: cardId,
      },
      data: {
        title,
        description,
        priority
      },
    });

    return NextResponse.json({
      message: "Card updated successfully",
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

export async function PATCH(request: Request, { params }: Props) {
  try {

    const paramsData = await params
    const body = await request.json()
    const cardIdResult = cardIdSchema.safeParse(paramsData)
    if(!cardIdResult.success){
       return NextResponse.json({ message: "validation error",
        errors:cardIdResult.error.issues
        }, { status: 400 });
    }
    const {cardId} = cardIdResult.data
    const result = moveCardSchema.safeParse(body)
    if(!result.success){
       return NextResponse.json({ message: "validation error",
        errors:result.error.issues
        }, { status: 400 });
    }
    const {listId} = result.data
    const user= await getCurrentUser()
    if (!user) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }
    const targetList = await prisma.list.findFirst({
  where: {
    id: listId,
    board: {
      ownerId: user.id,
    },
  },
});

if (!targetList) {
  return NextResponse.json(
    { message: "Target list not found" },
    { status: 404 }
  );
}

    const card = await prisma.card.findFirst({
      where:{
        id:cardId,
        list:{
          board:{
            ownerId:user.id
          }
        }
      }
    })
    if (!card) {
      return NextResponse.json(
        { message: "Card not found" },
        { status: 404 }
      );
    }

    await prisma.card.update({
      where:{
        id:cardId
      },
      data:{
        listId
      }
    })
  return NextResponse.json({
      message: "Card moved successfully",
    });

  } catch (error) {
    console.log(error);

    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
