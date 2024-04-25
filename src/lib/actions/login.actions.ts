import { LoginSchema } from "../schemas/auth.schema";

export default async function login(data: LoginSchema) {
  try {
    const res = await fetch(`${process.env.API_URL}/api/login/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      throw new Error("Login failed. Please try again later.");
    }

    const tokens = await res.json();
    return tokens;
  } catch (error) {
    console.error("Error during login:", error);
    throw error;
  }
}