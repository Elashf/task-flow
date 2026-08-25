"use client";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Plus } from "lucide-react";
import { Input } from "../ui/input";
import { useState } from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

type Props = {
  listId: string;
};

function AddCard({ listId }: Props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [priority, setPriority] = useState("medium");
  const router = useRouter();

  const addToCard = async () => {
    setLoading(true);
    
    const res = await fetch("/api/card", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, description, priority, listId }),
    });
    if (res.ok) {
      toast.success("card created");
      setOpen(false);
      setLoading(false);
      router.refresh();
      setTitle("");
      setDescription("");
    }else{
      toast.error("Something went wrong ,try again")
      router.refresh();
    }
  };
  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger>
          <span
            className="
      inline-flex
      h-9
      items-center
      justify-center
      rounded-md
      bg-primary
      px-4
      py-2
      text-sm
      font-medium
      text-primary-foreground
      cursor-pointer
      hover:bg-primary/90
    "
          >
            <Plus className="size-4 mr-2" />
            Add card
          </span>
        </DialogTrigger>
        <DialogContent  className="
    w-[calc(100vw-32px)]
    max-w-md
    rounded-xl
  ">
          <DialogTitle>Add card</DialogTitle>
          <Input
            placeholder="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Input
            placeholder="description"
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <Select value={priority} onValueChange={setPriority}>
            <SelectTrigger>
                <SelectValue placeholder="Select priority"/>
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="low">
                    Low
                </SelectItem>
                <SelectItem value="medium">
                    Medium
                </SelectItem>
                <SelectItem value="high">
                    High
                </SelectItem>
            </SelectContent>
          </Select>
          <Button className="cursor-pointer" onClick={addToCard}>
            {loading ? "Craeting... " : "Add To card"}
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddCard;
