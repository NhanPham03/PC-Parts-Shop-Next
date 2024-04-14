import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import authReducer from "./authSlice";

const authStore = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export default authStore;

export const useAppDispatch = () => useDispatch<typeof authStore.dispatch>();
export const useAppSelector: TypedUseSelectorHook<typeof authStore.getState> = useSelector;
