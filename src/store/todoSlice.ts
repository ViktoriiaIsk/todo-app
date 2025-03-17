import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

type Todo = {
  id: string;
  text: string;
  completed: boolean;
  category: string;
};

type TodoState = {
  todos: Todo[];
  loading: boolean;
};

const initialState: TodoState = {
  todos: [],
  loading: false,
};

// Async download of todos
export const fetchTodos = createAsyncThunk("todos/fetchTodos", async () => {
  const response = await fetch("http://localhost:5000/todos");
  return (await response.json()) as Todo[];
});

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTodos.fulfilled, (state, action: PayloadAction<Todo[]>) => {
        state.loading = false;
        state.todos = action.payload;
      })
      .addCase(fetchTodos.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default todoSlice.reducer;
