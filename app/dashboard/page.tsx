import Link from "next/link";
import { ArrowRight, CheckCircle2, Clock3, FolderKanban } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import AddBord from "@/components/dashboard/AddBord";

type Props = {
  searchParams: Promise<{ search?: string }>;
};

export default async function DashboardPage({ searchParams }: Props) {
  const {search} = await searchParams
  const user = await getCurrentUser();
  if (!user) {
    return <div>Unauthorized</div>;
  }
  const boards = await prisma.board.findMany({
    where: {
      ownerId: user.userId,
      ...(search 
        ?{
          OR:[
            {
              title:{
                contains: search,
                mode:"insensitive"
              }
            },
            {
              description:{
                contains: search,
                mode:"insensitive"
              }
            }
          ]
        }
        : {}
      )
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  const boardCount = await prisma.board.count({
    where: {
      ownerId: user.userId,
    },
  });

  const completedTask = await prisma.card.count({
    where:{
      list:{
        board:{
          ownerId: user.userId
        },
        title: "Done"
      }
    }
  })


  const inProgressTasks= await prisma.card.count({
    where:{
      list:{
        board:{
          ownerId:user.userId
        },
        title:"Doing"
      }
    }
  })

  return (
    <main className="p-8 space-y-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold">Welcome Back 👋</h1>

          <p className="text-muted-foreground mt-2">
            Here's an overview of your workspace.
          </p>
        </div>

        <AddBord />
      </div>

      <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        <Card>
          <CardContent className="p-6">
            <FolderKanban className="mb-4 text-primary" />
            <p className="text-3xl font-bold">{boardCount}</p>
            <p className="text-muted-foreground">Total Boards</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <CheckCircle2 className="mb-4 text-green-600" />
            <p className="text-3xl font-bold">{completedTask}</p>
            <p className="text-muted-foreground">Completed Tasks</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <Clock3 className="mb-4 text-orange-500" />
            <p className="text-3xl font-bold">{inProgressTasks}</p>
            <p className="text-muted-foreground">In Progress</p>
          </CardContent>
        </Card>

        
      </section>

      <div className="grid gap-8 lg:grid-cols-3">
        <section className="lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold">Recent Boards</h2>

            <Button variant="ghost">
              <Link href="/dashboard/boards">
                View All
                <ArrowRight className="ml-2 size-4" />
              </Link>
            </Button>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {boards.map((board) => (
              <Card
                key={board.id}
                className="transition-all hover:-translate-y-1 hover:shadow-lg"
              >
                <CardContent className="p-6">
                  <FolderKanban className="mb-4 text-primary" />

                  <h3 className="font-semibold text-lg">{board.title}</h3>

                  <p className="mt-2 text-muted-foreground">
                    {board.description ?? "No description"}
                  </p>

                  <Button className="mt-6 w-full">
                    <Link href={`/dashboard/boards/${board.id}`}>
                      Open Board
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
