import BoardCard from "@/components/boards/BoardCard";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const tasks = [
  {
    id: 1,
    title: "Design Dashboard",
    description: "Create responsive dashboard layout",
    priority: "high" as const,
  },
  {
    id: 2,
    title: "Fix Login",
    description: "Resolve JWT authentication issue",
    priority: "medium" as const,
  },
  {
    id: 3,
    title: "Deploy Project",
    description: "Deploy TaskFlow to Vercel",
    priority: "low" as const,
  },
];

export default function TasksPage() {
  return (
    <main className="space-y-8 p-6">
      <div>
        <h1 className="text-3xl font-bold">My Tasks</h1>
        <p className="mt-2 text-muted-foreground">
          View and manage all your tasks.
        </p>
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input className="pl-10" placeholder="Search tasks..." />
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {tasks.map((task) => (
          <BoardCard key={task.id} {...task} />
        ))}
      </div>
    </main>
  );
}