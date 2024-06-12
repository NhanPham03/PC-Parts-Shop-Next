import { jwtDecode } from "jwt-decode";

interface JwtPayload {
  token_type: string;
  exp: string;
  iat: number;
  jti: string;
  user_id: number;
}

export function getUserId(token: string) {
  try {
    const decoded = jwtDecode<JwtPayload>(token);
    return decoded.user_id;
  } catch (error) {
    console.error("Error parsing token:", error);
    return null;
  }
}
