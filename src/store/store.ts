import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import todoReducer from "./todoSlice";
import categoryReducer from "./categorySlice"; 

export const store = configureStore({
  reducer: {
    todos: todoReducer,
    categories: categoryReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();