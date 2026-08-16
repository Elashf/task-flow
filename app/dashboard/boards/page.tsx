import BoardHeader from '@/components/boards/BoardHeader'
import { Card, CardContent } from '@/components/ui/card'
import { getCurrentUser } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'

async function page() {

  const user = await getCurrentUser()
  if(!user){
    return <div>Unauthorized</div>
  }
  const boards = await prisma.board.findMany({
    where:{
      ownerId: user.userId
    },
    orderBy:{
      createdAt:"desc"
    }
  })

  return (
    <div>
      <BoardHeader/>
      <div className="flex gap-6 overflow-x-auto pb-4">
        {boards.map((board)=>(
 <Link key={board.id} href={`/dashboard/boards/${board.id}`}>
    <Card className="w-72 hover:shadow-lg transition">
      <CardContent className="p-6">
        <h2 className="font-semibold text-lg">
          {board.title}
        </h2>

        <p className="text-sm text-muted-foreground mt-2">
          {board.description ?? "No description"}
        </p>
      </CardContent>
    </Card>
  </Link>
        ))}
      </div>
    </div>
  )
}

export default page