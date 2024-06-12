'use client';

import { useForm } from "react-hook-form";
import { Form } from "../ui/form";
import { userSchema, UserSchema } from "@/lib/schemas/database.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Button } from "../ui/button";
import { PulseLoader } from "react-spinners";
import { useRouter } from "next/navigation";
import { AppDispatch } from "@/lib/redux/redux.config";
import { useDispatch } from "react-redux";
import { toast } from "../ui/use-toast";
import { clearTokens } from "@/lib/redux/authSlice";
import { clearAuthCookies } from "@/lib/utils/cookies.utils";
import { updateUser } from "@/lib/actions/user.actions";

export default function UserForm() {
  const router = useRouter();
  const dispatch: AppDispatch = useDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm<UserSchema>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      address: "",
      city: "",
      country: "",
      birthdate: null,
    },
  });

  async function onSubmit(data: UserSchema) {
    setIsLoading(true);

    try {
      const id = 1;
      const formData = userSchema.parse(data);
      const user = await updateUser(id, formData);
      if (user) {
        toast({ description: "Update success!" });
        router.refresh();
      }
    } catch (error) {
      toast({ variant: "destructive", title: "Oops! Something went wrong!", description: String(error) });
    } finally {
      setIsLoading(false);
    }
  }

  async function logout() {
    setIsLoading(true);

    try {
      dispatch(clearTokens());
      clearAuthCookies();

      toast({ description: "Log out success!" });
      router.push("/account/login");
    } catch (error) {
      toast({ variant: "destructive", title: "Oops! Something went wrong!", description: String(error) });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex flex-col items-center">
      <Form {...form}>
        <form className="flex flex-col w-fit gap-3 border rounded-xl p-6"
          onSubmit={form.handleSubmit(onSubmit)}
          method="POST"
        >
          <h1 className="text-center">ACCOUNT</h1>

          <Button className="w-fit self-center dark:bg-green-700 dark:hover:bg-green-600 bg-green-400 hover:bg-green-500"
            type="submit" 
            disabled={isLoading}
          >
            {isLoading ? (
              <PulseLoader color="#22c55e" size={15} speedMultiplier={0.8} />
            ) : (
              <p>Update</p>
            )}
          </Button>

          <Button className="w-fit self-center dark:bg-red-700 dark:hover:bg-red-600 bg-red-400 hover:bg-red-500"
            type="button"
            onClick={logout}
            disabled={isLoading}
          >
            {isLoading ? (
              <PulseLoader color="#22c55e" size={15} speedMultiplier={0.8} />
            ) : (
              <p>Log Out</p>
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}