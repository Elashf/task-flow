import { Priority } from "@/src/generated/prisma/enums";
import AddList from "./AddList";
import BoardColumn from "./BoardColumn";

type Card = {
  id: string;
  title: string;
  description: string | null;
  listId: string;
  priority: Priority;
  createdAt: Date;
  updatedAt: Date;
};

type Props ={
   board: {
    id: string;
    title: string;
    lists: {
      id: string;
      title: string;
      cards: Card[];
    }[];
  };
  
}

function Board({board}:Props) {

  return (
    <div className="flex gap-6 overflow-x-auto px-4 pb-4">
     {board?.lists.map((list)=>(
      <BoardColumn key={list.id} list={list} />
     ))}
     <AddList boardId={board.id}/>
    </div>
  );
}

export default Board;