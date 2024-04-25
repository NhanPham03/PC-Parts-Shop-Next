import { RegisterSchema } from "../schemas/auth.schema";

export default async function register(data: RegisterSchema) {
  try {
    const res = await fetch(`${process.env.API_URL}/api/users/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      throw new Error("Register failed. Please try again later.")
    };

    const statusCode = res.status;
    return statusCode;
  } catch (error) {
    console.error("Error during register:", error);
    throw error;
  }
}