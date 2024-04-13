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

export function RegisterForm() {
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [showConfirmField, setShowConfirmField] = useState<boolean>(false);
  const [showAdditionalFields, setShowAdditionalFields] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      password: "",
      user: {
        first_name: "",
        last_name: "",
        email: "",
        address: null,
        city: null,
        country: null,
        birthdate: null,
      },
    },
  });

  const handlePasswordChange = useDebouncedCallback(() => {
    setShowConfirmField(true);
  }, 300);

  const handleUsernameChange = useDebouncedCallback(() => {
    setShowAdditionalFields(true);
  }, 400);

  const onSubmit = async (data: RegisterSchema) => {
    setIsLoading(true);

    try {
      
    } catch (error) {

    } finally {
      setIsLoading(false);
      form.reset();
    }
  };

  return (
    <div className="flex flex-col items-center">
      <Form {...form}>
        <form className="flex flex-col w-[20rem] gap-3"
          onSubmit={form.handleSubmit(onSubmit)}
          method="POST"
        >
          <h1 className="text-center">Register</h1>

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

          {showConfirmField && (
            <FormField control={form.control} name="password" render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm password</FormLabel>
                <FormControl>
                  <Input type="password" required {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />
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
        </form>
      </Form>
      
        {showConfirmField && 
          <Input type="password" 
            value={confirmPassword} 
            onChange={(e) => setConfirmPassword(e.target.value)} 
            placeholder="Confirm password" 
          />
        }
      
      {showAdditionalFields && (
        <div className="flex flex-col text-center my-3 w-[28rem] gap-2">
          <h2>User information</h2>
          <div className="flex flex-row gap-2">
            <Input type="text" 
              placeholder="First name" 
              required
            />
            <Input type="text" 
              placeholder="Last name" 
              required
            />
          </div>
          <div className="flex flex-row gap-2">
            <Input type="email" 
              placeholder="Email" 
              required
            />
            <Input className="justify-end max-w-fit" type="date" />
          </div>
          <div className="flex flex-row gap-2">
            <Input type="text" placeholder="Address" />
            <Input type="text" placeholder="City" />
            <Input type="text" placeholder="Country" />
          </div>
        </div>
      )}

      <div className="flex flex-row my-2 gap-1">
        <p>Already have an account?</p>
        <Link className="text-blue-500 underline dark:hover:text-white hover:text-black"
          href={"/account/login"}
        >
          Log in!
        </Link>
      </div>
    </div>
  );
}
