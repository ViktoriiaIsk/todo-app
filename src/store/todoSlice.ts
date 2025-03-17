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

type AsyncThunkConfig = {
  rejectValue: string;
};

const initialState: TodoState = {
  todos: [],
  loading: false,
};

export const fetchTodos = createAsyncThunk<Todo[], void, AsyncThunkConfig>(
  "todos/fetchTodos",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch("http://localhost:5000/todos");
      if (!response.ok) throw new Error("Error fetching todos");
      return (await response.json()) as Todo[];
    } catch (error) {
      return rejectWithValue("Error fetching todos");
    }
  }
);

// AsyncThunk
export const addTodoAsync = createAsyncThunk<Todo, { text: string; category: string }, AsyncThunkConfig>(
  "todos/addTodo",
  async (newTodo, { rejectWithValue }) => {
    try {
      const response = await fetch("http://localhost:5000/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: crypto.randomUUID(),
          text: newTodo.text,
          completed: false,
          category: newTodo.category,
        }),
      });

      if (!response.ok) throw new Error("Error adding todo");
      return (await response.json()) as Todo;
    } catch (error) {
      return rejectWithValue("Error adding todo");
    }
  }
);

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    // Reducer
    addTodo: (state, action: PayloadAction<{ text: string; category: string }>) => {
      state.todos.push({
        id: crypto.randomUUID(),
        text: action.payload.text,
        completed: false,
        category: action.payload.category,
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTodos.fulfilled, (state, action: PayloadAction<Todo[]>) => {
        state.loading = false;
        state.todos = action.payload;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.loading = false;
        console.error(action.payload);
      })
      .addCase(addTodoAsync.fulfilled, (state, action: PayloadAction<Todo>) => {
        state.todos.push(action.payload);
      })
      .addCase(addTodoAsync.rejected, (state, action) => {
        console.error(action.payload);
      });
  },
});

export const { addTodo } = todoSlice.actions;
export default todoSlice.reducer;
