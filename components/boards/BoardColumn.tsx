

import { Priority } from "@/src/generated/prisma/enums";
import AddCard from "./AddCard";
import BoardCard from "./BoardCard";
import EmptyBoard from "./EmptyBoard";
import DroppableColumn from "./DroppableColumn";


type Props = {
  list:{
    id: string;
  title: string;
  cards :{
    id:string;
    title:string;
    description:string | null;
          priority:Priority
  }[]
  }
};

function BoardColumn({ list }: Props) {
 const tasks= list.cards

  return (
    <div className="w-85 shrink-0 rounded-xl border bg-muted/40">
      <div className="border-b p-4 flex justify-between">
        <h2 className="font-semibold">{list.title}</h2>
        <p className="text-sm text-muted-foreground">{tasks.length}</p>
      </div>
<DroppableColumn id={list.id}>
      <div className="p-3">
        <div className="p-3 space-y-3 flex flex-col items-center">
          {tasks.length === 0 ? (
            <EmptyBoard />
          ) : (
            tasks.map((task) =>{
               return <BoardCard key={task.id} {...task} />
            }  )
          )}

          <AddCard listId={list.id}/>
        </div>
      </div>
      </DroppableColumn>
    </div>
  );
}

export default BoardColumn;
