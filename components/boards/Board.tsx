import AddList from "./AddList";
import BoardColumn from "./BoardColumn";

type Props ={
   board: {
    id: string;
    title: string;
    lists: {
      id: string;
      title: string;
      cards: any[];
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