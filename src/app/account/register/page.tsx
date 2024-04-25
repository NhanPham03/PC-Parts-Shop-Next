import { RegisterForm } from "@/components/shared/RegisterForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Register',
}

export default function Register() {
  return (
    <main>
      <RegisterForm />
    </main>
  );
}
