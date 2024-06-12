'use client';

import { setTokens } from "@/lib/redux/authSlice";
import { AppDispatch } from "@/lib/redux/redux.config";
import { getAuthCookies } from "@/lib/utils/cookies.utils";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function AuthLoader({ children }: { children: React.ReactNode }) {
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    const { accessToken, refreshToken } = getAuthCookies();
    if (accessToken && refreshToken) {
      dispatch(setTokens({ accessToken, refreshToken }));
    }
  }, []);
  
  return <>{children}</>;
}
