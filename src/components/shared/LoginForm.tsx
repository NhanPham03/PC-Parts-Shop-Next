'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { loginSchema, LoginSchema } from "@/lib/schemas/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { PulseLoader } from "react-spinners";
import { toast } from "../ui/use-toast";
import login from "@/lib/actions/login.actions";
import { useAppDispatch } from "@/lib/redux/redux.config";
import { setAuthTokens } from "@/lib/redux/authSlice";
import { useRouter } from "next/navigation";

export function LoginForm() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  async function onSubmit(data: LoginSchema) {
    setIsLoading(true);

    try {
      const formData = loginSchema.parse(data);

      const tokens = await login(formData);
      if (tokens) {
        dispatch(setAuthTokens(tokens));
        toast({ description: "Login success!" });
        router.push("/account");
      }
    } catch (error) {
      toast({ variant: "destructive", title: "Oops! Something went wrong!", description: String(error) });
      form.setValue("password", "");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex flex-col items-center">
      <Form {...form}>
        <form className="flex flex-col w-[20rem] gap-3"
          onSubmit={form.handleSubmit(onSubmit)}
          method="POST"
        >
          <h1 className="text-center">Login</h1>

          <FormField control={form.control} name="username" render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input type="text" required {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <FormField control={form.control} name="password" render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" required {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />

          <Button className="w-fit self-center"
            type="submit" 
            disabled={isLoading}
          >
            {isLoading ? (
              <PulseLoader color="#22c55e" size={15} speedMultiplier={0.8} />
            ) : (
              <p>Login</p>
            )}
          </Button>
        </form>
      </Form>

      <div className="flex flex-row my-2 gap-1">
        <p>Don't have an account?</p>
        <Link className="text-blue-500 underline dark:hover:text-white hover:text-black"
          href={"/account/register"}
        >
          Register!
        </Link>
      </div>
    </div>
  );
}
