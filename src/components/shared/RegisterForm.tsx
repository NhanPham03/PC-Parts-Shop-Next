'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { registerSchema, RegisterSchema } from "@/lib/schemas/auth.schema";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDebouncedCallback } from "use-debounce";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { PulseLoader } from "react-spinners";
import { toast } from "../ui/use-toast";
import { register } from "@/lib/actions/user.actions";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
  const router = useRouter();
  const [showConfirmField, setShowConfirmField] = useState<boolean>(false);
  const [showAdditionalFields, setShowAdditionalFields] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      password: "",
      confirm_password: "",
      user: {
        first_name: "",
        last_name: "",
        email: "",
        address: "",
        city: "",
        country: "",
        birthdate: null,
      },
    },
  });

  const handleUsernameChange = useDebouncedCallback(() => {
    setShowAdditionalFields(form.getValues("username") !== "");
  }, 400);

  const handlePasswordChange = useDebouncedCallback(() => {
    setShowConfirmField(form.getValues("password") !== "");
  }, 300);

  const handleConfirmPasswordChange = useDebouncedCallback(() => {
    const password = form.getValues("password");
    const confirm = form.getValues("confirm_password");

    if (password !== confirm) {
      form.setError("confirm_password", {
        type: "manual",
        message: "Passwords do not match",
      });
    } else {
      form.clearErrors("confirm_password");
    }
  }, 300);

  async function onSubmit(data: RegisterSchema) {
    setIsLoading(true);

    try {
      const formData = registerSchema.parse(data);

      const statusCode = await register(formData);
      if (statusCode === 201) {
        toast({ description: "Register success!" });
        router.push("/account/login");
      }
    } catch (error) {
      toast({ variant: "destructive", title: "Oops! Something went wrong!", description: String(error) });
      form.setValue("password", "");
      form.setValue("confirm_password", "");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex flex-col items-center">
      <Form {...form}>
        <form className="flex flex-col w-[25rem] gap-3 border rounded-xl p-6"
          onSubmit={form.handleSubmit(onSubmit)}
          method="POST"
        >
          <h1 className="text-center">Register</h1>

          <FormField control={form.control} name="username" render={({ field }) => (
            <FormItem className="w-full" onChange={() => handleUsernameChange()}>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input type="text" required {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <FormField control={form.control} name="password" render={({ field }) => (
            <FormItem className="w-full" onChange={() => handlePasswordChange()}>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" required {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />

          {showConfirmField && (
            <FormField control={form.control} name="confirm_password" render={({ field }) => (
              <FormItem className="w-full" onChange={() => handleConfirmPasswordChange()}>
                <FormLabel>Confirm password</FormLabel>
                <FormControl>
                  <Input type="password" required {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />
          )}

          {showAdditionalFields && (
            <div className="flex flex-col my-3 w-[28rem] gap-2">
              <h2 className="text-center">User information</h2>

              <div className="flex flex-row gap-2">
                <FormField control={form.control} name="user.first_name" render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>First name</FormLabel>
                    <FormControl>
                      <Input type="text" required {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="user.last_name" render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Last name</FormLabel>
                    <FormControl>
                      <Input type="text" required {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              </div>
              
              <div className="flex flex-row gap-2">
                <FormField control={form.control} name="user.email" render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" required {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="user.birthdate" render={({ field }) => (
                  <FormItem className="w-fit">
                    <FormLabel>Date of Birth</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} value={field.value ? field.value.toISOString().split('T')[0] : ''} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              </div>

              <div className="flex flex-row gap-2">
                <FormField control={form.control} name="user.address" render={({ field }) => (
                  <FormItem className="w-fit">
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Input type="text" {...field} value={field.value ?? ''} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="user.city" render={({ field }) => (
                  <FormItem className="w-fit">
                    <FormLabel>City</FormLabel>
                    <FormControl>
                      <Input type="text" {...field} value={field.value ?? ''} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="user.country" render={({ field }) => (
                  <FormItem className="w-fit">
                    <FormLabel>Country</FormLabel>
                    <FormControl>
                      <Input type="text" {...field} value={field.value ?? ''} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              </div>
            </div>
          )}

          <Button className="w-fit self-center" 
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? (
              <PulseLoader color="#22c55e" size={15} speedMultiplier={0.8} />
            ) : (
              <p>Register</p>
            )}
          </Button>

          <div className="flex flex-row gap-1 self-center">
            <p>Already have an account?</p>
            <Link className="text-blue-500 underline dark:hover:text-white hover:text-black"
              href={"/account/login"}
            >
              Log in!
            </Link>
          </div>
        </form>
      </Form>
    </div>
  );
}
