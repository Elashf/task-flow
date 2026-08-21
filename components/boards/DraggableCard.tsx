"use client";

type Props = {
  id: string;
  children: React.ReactNode;
};

function DraggableCard({ id, children }: Props) {
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData("cardId", id);
  };

  return (
    <div draggable onDragStart={handleDragStart}>
      {children}
    </div>
  );
}

export default DraggableCard;