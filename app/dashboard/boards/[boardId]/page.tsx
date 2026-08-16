import Board from "@/components/boards/Board";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
 import { notFound } from "next/navigation";
type Props={
  params: Promise<{
boardId:string
  }>
}

export default async function BoardPage({params}:Props) {
  const {boardId} = await params
  const user = await getCurrentUser()
  if (!user) {
    return <div>Unauthorized</div>;
  }
  const board = await prisma.board.findFirst({
    where:{
     id:boardId ,
      ownerId: user?.userId
    },
    include:{
      lists:{
        include:{
          cards:true
        }
      }
    }
  }) 
 

if (!board) {
  notFound();
}
  return <Board board={board}/>;
}