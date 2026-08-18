import { getCurrentUser } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import BoardItem from './BoardItem'

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
    <div className='grid grid-cols-1 gap-6 lg:grid-cols-3'>
     {boards.map((board) => (
  <BoardItem
    key={board.id}
    id={board.id}
    title={board.title}
    description={board.description}
  />
))}
    </div>
  )
}

export default page