import UserForm from "@/components/shared/UserForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Account",
}

export default function Account() {
  return (
    <main>
      <UserForm />
    </main>
  );
}