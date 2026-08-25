import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
type Props = {
  params: Promise<{ cardId: string }>;
};
export async function DELETE(request: Request, { params }: Props) {
  try {
    const { cardId } = await params;
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ message: "Unathorized" }, { status: 401 });
    }

    const card = await prisma.card.findFirst({
      where: {
        id: cardId,
        list: {
          board: {
            ownerId: user.userId,
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
    const { cardId } = await params;
    const body = await request.json();
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ message: "Unathorized" }, { status: 401 });
    }

    const card = await prisma.card.findFirst({
      where: {
        id: cardId,
        list: {
          board: {
            ownerId: user.userId,
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
        title: body.title,
        description: body.description,
        priority: body.priority,
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

    const {cardId} = await params
    const {listId} = await request.json()
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
      ownerId: user.userId,
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
            ownerId:user.userId
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
