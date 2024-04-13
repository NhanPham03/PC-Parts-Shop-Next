import { toast } from "@/components/ui/use-toast";
import prisma from "../db";

export default async function login(username: string, password: string) {
  try {
    const account = await prisma.account.findFirstOrThrow({ where: { username: username } });

    if (account && account.password === password) {
      toast({ title: "Login success!" });
    } else {
      toast({ title: "Invalid username or password", description: "Please check your credentials and try again" });
    }
  } catch (error) {
    toast({ title: "Error", description: "An error occurred while logging in" });
  }
}
