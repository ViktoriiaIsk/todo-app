import { configureStore } from "@reduxjs/toolkit";
import { todoApi } from "./todoSlice";
import { categoryApi } from "./categorySlice";
import {todoSlice} from "./todoSlice";
export const store = configureStore({
  reducer: {
    [todoApi.reducerPath]: todoApi.reducer, // Add RTK Query reducer
    [categoryApi.reducerPath]: categoryApi.reducer, 
    todos: todoSlice.reducer, // Add RTK Query reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(todoApi.middleware, categoryApi.middleware), // Add RTK Query middleware
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;