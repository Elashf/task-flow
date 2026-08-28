import Board from "@/components/boards/Board";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
 import { notFound } from "next/navigation";
type Props={
  params: Promise<{
boardId:string
  }>;
  searchParams: Promise<{
    search?: string
  }>
}

export default async function BoardPage({params , searchParams}:Props) {
  const {boardId} = await params
  const {search} =await searchParams
  const user = await getCurrentUser()
  if (!user) {
    return <div>Unauthorized</div>;
  }
  const board = await prisma.board.findFirst({
    where:{
     id:boardId ,
      ownerId: user?.id
    },
    include:{
      lists:{
        include:{
          cards:{
            where:
              search ? {
              OR:[
                {
                  title:{
                    contains: search,
                    mode: "insensitive"
                  }
                },
                {
                  description:{
                    contains: search,
                    mode:"insensitive"
                  }
                }
              ],
              }
             :undefined
            }
          }
        }
      }
    }
  ) 
 

if (!board) {
  notFound();
}
  return <Board board={board}/>;
}