import BoardCard from "@/components/boards/BoardCard";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

type Props={
  searchParams: Promise<{
search? :string
  }>
}

export default async function TasksPage({searchParams}:Props) {
  const user = await getCurrentUser()
  const {search}= await searchParams
  if (!user) {
  return <div>Unauthorized</div>;
}
  const tasks = await prisma.card.findMany({
    where:{
    list:{
      board:{
        ownerId:user.id
      }
    },
    ...(search
      ?{
        OR:[
          {title :{
            contains:search,
            mode: "insensitive"
          }},
          {
          description:{
            contains : search,
            mode:"insensitive"
          }}
        ]
      }
      :{}
    )
    }
  })
  return (
    <main className="space-y-8 p-6">
      <div>
        <h1 className="text-3xl font-bold">My Tasks</h1>
        <p className="mt-2 text-muted-foreground">
          View and manage all your tasks.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {tasks.map((task) => (
          <BoardCard key={task.id} {...task} />
        ))}
      </div>
    </main>
  );
}