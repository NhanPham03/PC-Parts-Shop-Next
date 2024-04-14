import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthTokens {
  accessToken: string | null;
  refreshToken: string | null;
  authorized: boolean;
}

const initialState: AuthTokens = {
  accessToken: null,
  refreshToken: null,
  authorized: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthTokens: (state, action: PayloadAction<{ access: string, refresh: string }>) => {
      state.accessToken = action.payload.access;
      state.refreshToken = action.payload.refresh;
      state.authorized = true;
    },
    logout: (state) => {
      state.accessToken = null;
      state.refreshToken = null;
      state.authorized = false;
    },
  },
});

export const { setAuthTokens, logout } = authSlice.actions;
export default authSlice.reducer;
