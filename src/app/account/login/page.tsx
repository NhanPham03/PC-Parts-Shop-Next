import LoginForm from "@/components/shared/LoginForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Login',
}

export default function Login() {
  return (
    <main>
      <LoginForm />
    </main>
  );
}
