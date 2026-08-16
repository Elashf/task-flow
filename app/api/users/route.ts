import { prisma } from "@/lib/prisma";


export async function GET() {

  const users = await prisma.user.findMany();

  return Response.json(users);

}


export async function POST(request: Request) {

  const user = await prisma.user.create({
    data: {
      name: "ela",
      email: "new@gmail.com",
      password: "123456",
    },
  });


  return Response.json(user);

}