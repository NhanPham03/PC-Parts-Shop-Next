import { User } from "@prisma/client";
import prisma from "../db";
import { toast } from "@/components/ui/use-toast";
import { checkAccountExists } from "./checkExist";

export default async function register(username: string, password: string, confirmPassword: string, user: User) {
  try {
    const exists = await checkAccountExists(username);

    if (exists) {
      toast({ title: "Error", description: "Username already exists" });
      return;
    }

    if (password !== confirmPassword) {
      toast({ title: "Error", description: "Passwords do not match" });
      return;
    }
  } catch (error) {
    toast({ title: "Error", description: "An error occurred while registering" });
  }
}
