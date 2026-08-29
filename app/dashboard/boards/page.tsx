import { getCurrentUser } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import BoardItem from './BoardItem'
import AddBord from '@/components/dashboard/AddBord'

async function page() {

  const user = await getCurrentUser()
  if(!user){
    return <div>Unauthorized</div>
  }
  
  const boards = await prisma.board.findMany({
    where:{
      ownerId: user.id
    },
    orderBy:{
      createdAt:"desc"
    }
  })
 if(boards.length <1){
  return(<div className='flex flex-col gap-10 items-center'>
     <div className='text-2xl p-4'>
    No Boards yet
    </div>
    <AddBord/>
  
  </div>)
 }
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