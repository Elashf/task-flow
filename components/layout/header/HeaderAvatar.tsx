import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getCurrentUser } from "@/lib/auth";

type User={
  name:string,
  email:string,

}

async function HeaderAvatar() {
  const user:User | null= await getCurrentUser()
  
  
  return (
    <Avatar className="size-9">
      <AvatarImage src="" alt="User avatar" />
      <AvatarFallback>{user?.name.slice(0,1)}</AvatarFallback>
      
    </Avatar>
  );
}

export default HeaderAvatar;
