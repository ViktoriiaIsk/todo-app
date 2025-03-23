import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

type Todo = {
  id: string;
  text: string;
  completed: boolean;
  category: string;
  description: string;
};

type TodoState = {
  filterCategory: string;
  filterStatus: string;
};

const initialState: TodoState = {
  filterCategory: "All",
  filterStatus: "All",
};

export const todoApi = createApi({
  reducerPath: "todoApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://my-todo-api.glitch.me/" }),
  tagTypes: ["Todos"],
  endpoints: (builder) => ({
    fetchTodos: builder.query<Todo[], void>({
      query: () => "todos",
      providesTags: ["Todos"],
    }),
    addTodo: builder.mutation<Todo, { text: string; category: string }>({
      query: (newTodo) => ({
        url: "todos",
        method: "POST",
        body: {
          id: crypto.randomUUID(),
          text: newTodo.text,
          completed: false,
          category: newTodo.category,
        },
      }),
      invalidatesTags: ["Todos"],
    }),
    deleteTodo: builder.mutation<void, string>({
      query: (id) => ({
        url: `todos/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Todos"],
    }),
    editTodo: builder.mutation<
      Todo,
      { id: string; text: string; category: string; description: string, completed: boolean }
    >({
      query: ({ id, text, category, description, completed }) => ({
        url: `todos/${id}`,
        method: "PATCH",
        body: { text, category, description, completed },
      }),
      invalidatesTags: ["Todos"],
    }),
  }),
});

export const {
  useFetchTodosQuery,
  useAddTodoMutation,
  useDeleteTodoMutation,
  useEditTodoMutation,
} = todoApi;

export const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    setFilterCategory: (state, action: PayloadAction<string>) => {
      state.filterCategory = action.payload;
    },
    setFilterStatus: (state, action: PayloadAction<string>) => {
      state.filterStatus = action.payload;
    },
  },
});

export const { setFilterCategory, setFilterStatus } = todoSlice.actions;
