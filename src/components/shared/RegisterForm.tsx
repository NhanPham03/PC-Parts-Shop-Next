'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { userSchema, UserSchema } from "@/lib/schemas/zod.schema";

export default function RegisterForm() {
  const router = useRouter();
  const [showConfirmField, setShowConfirmField] = useState<boolean>(false);
  const [showAdditionalFields, setShowAdditionalFields] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm<UserSchema>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      username: "",
      password: "",
      confirm_password: "",
      first_name: "",
      last_name: "",
      email: "",
      address: "",
      city: "",
      country: "",
      birthdate: null,
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

  async function onSubmit(data: UserSchema) {
    setIsLoading(true);

    try {
      const formData = userSchema.parse(data);
      
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
    <Form {...form}>
      <form className="flex flex-col items-center"
        onSubmit={form.handleSubmit(onSubmit)} 
        method="POST"
      >
        <div className="flex flex-col w-fit border rounded-xl p-6 gap-3 self-center">
          <h1 className="text-center">REGISTER</h1>

          <FormField control={form.control} name="username" render={({ field }) => (
            <FormItem onChange={() => handleUsernameChange()}>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input className="w-[25em]" type="text" required {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <FormField control={form.control} name="password" render={({ field }) => (
            <FormItem onChange={() => handlePasswordChange()}>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input className="w-[25em]" type="password" required {...field} />
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

          {!showAdditionalFields && (
            <>
              <Button className="w-fit self-center dark:bg-green-700 dark:hover:bg-green-600 bg-green-400 hover:bg-green-500" 
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
            </>
          )}
        </div>

        {showAdditionalFields && (
          <div className="flex flex-col my-3 w-[28rem] gap-3 self-center border rounded-xl p-6">
            <h2 className="text-center">INFORMATION</h2>

            <div className="flex flex-row gap-2">
              <FormField control={form.control} name="first_name" render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>First name</FormLabel>
                  <FormControl>
                    <Input type="text" required {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="last_name" render={({ field }) => (
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
              <FormField control={form.control} name="email" render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" required {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="birthdate" render={({ field }) => (
                <FormItem className="w-fit">
                  <FormLabel>Date of Birth</FormLabel>
                  <FormControl>
                    <Input {...field} 
                      type="date" 
                      value={field.value instanceof Date ? field.value.toISOString().split('T')[0] : field.value || ''} 
                      onChange={(e) => field.onChange(new Date(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
            </div>

            <div className="flex flex-row gap-2">
              <FormField control={form.control} name="address" render={({ field }) => (
                <FormItem className="w-fit">
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} value={field.value ?? ''} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="city" render={({ field }) => (
                <FormItem className="w-fit">
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} value={field.value ?? ''} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="country" render={({ field }) => (
                <FormItem className="w-fit">
                  <FormLabel>Country</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} value={field.value ?? ''} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
            </div>

            <div className="flex flex-col w-full items-center gap-3">
              <Button className="w-fit self-center dark:bg-green-700 dark:hover:bg-green-600 bg-green-400 hover:bg-green-500" 
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
            </div>
          </div>
        )}
      </form>
    </Form>
  );
}
