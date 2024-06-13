import { LoginSchema, UserSchema } from "../schemas/zod.schema";

export async function login(data: LoginSchema) {
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
    console.error("[LOGIN]", error);
    throw error;
  }
}

export async function register(data: UserSchema) {
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
    console.error("[REGISTER]", error);
    throw error;
  }
}

export async function getUser(id: number) {
  try {
    if (typeof id !== "number" || isNaN(id)) {
      throw new Error("Invalid URL parameter.");
    }

    const res = await fetch(`${process.env.API_URL}/api/users/${encodeURIComponent(id)}/`, {
      method: 'GET',
    });

    if (!res.ok) {
      throw new Error(`Error getting user #${encodeURIComponent(id)}`);
    }

    const user = await res.json();
    return user;
  } catch (error) {
    console.error("[USER GET]", error);
    throw error;
  }
}

export async function updateUser(id: number, data: UserSchema) {
  try {
    if (typeof id !== "number" || isNaN(id)) {
      throw new Error("Invalid URL parameter.");
    }

    const res = await fetch(`${process.env.API_URL}/api/users/${encodeURIComponent(id)}/`, {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      throw new Error(`Error updating user #${encodeURIComponent(id)}`);
    }

    const user = await res.json();
    return user;
  } catch (error) {
    console.error("[USER UPDATE]", error);
    throw error;
  }
}

export async function deleteUser(id: number) {
  try {
    if (typeof id !== "number" || isNaN(id)) {
      throw new Error("Invalid URL parameter.");
    }

    const res = await fetch(`${process.env.API_URL}/api/users/${encodeURIComponent(id)}/`, {
      method: 'DELETE',
    });

    if (!res.ok) {
      throw new Error(`Error deleting user #${encodeURIComponent(id)}`);
    }
    return "User deleted successfully!";
  } catch (error) {
    console.error("[USER DELETE]", error);
    throw error;
  }
}
