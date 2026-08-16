import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

function HeaderAvatar() {
  return (
    <Avatar className="size-9">
      <AvatarImage src="" alt="User avatar" />
      <AvatarFallback>EF</AvatarFallback>
      
    </Avatar>
  );
}

export default HeaderAvatar;
