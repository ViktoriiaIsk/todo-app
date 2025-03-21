import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

type Todo = {
    id: string;
    text: string;
    completed: boolean;
    category: string;
    description: string; 
  };

type TodoState = {
  todos: Todo[];
  loading: boolean;
  filterCategory: string;
  filterStatus: string;
};

type AsyncThunkConfig = {
  rejectValue: string;
};

const initialState: TodoState = {
  todos: [],
  loading: false,
  filterCategory: "All", 
  filterStatus: "All", 
};

// Fetch todos
export const fetchTodos = createAsyncThunk<Todo[], void, AsyncThunkConfig>(
  "todos/fetchTodos",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch("https://my-todo-api.glitch.me/todos");
      if (!response.ok) throw new Error("Error fetching todos");
      return (await response.json()) as Todo[];
    } catch (error) {
      return rejectWithValue("Error fetching todos");
    }
  }
);

// Add todo (AsyncThunk)
export const addTodoAsync = createAsyncThunk<Todo, { text: string; category: string }, AsyncThunkConfig>(
  "todos/addTodo",
  async (newTodo, { rejectWithValue }) => {
    try {
      const response = await fetch("https://my-todo-api.glitch.me/todos", {
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

// AsyncThunk for deleting a todo from the server
export const deleteTodoAsync = createAsyncThunk<string, string, AsyncThunkConfig>(
  "todos/deleteTodo",
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetch(`https://my-todo-api.glitch.me/todos/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Error deleting todo");
      return id; 
    } catch (error) {
      return rejectWithValue("Error deleting todo");
    }
  }
);

export const editTodoAsync = createAsyncThunk<
  Todo,
  { id: string; text: string; category: string; description: string }, 
  AsyncThunkConfig
>("todos/editTodo", async ({ id, text, category, description }, { rejectWithValue }) => {
  try {
    const response = await fetch(`https://my-todo-api.glitch.me/todos/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text, category, description }),
    });

    if (!response.ok) throw new Error("Error updating todo");
    return (await response.json()) as Todo;
  } catch (error) {
    return rejectWithValue("Error updating todo");
  }
});


const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<{ text: string; category: string; description?: string }>) => {
      state.todos.push({
        id: crypto.randomUUID(),
        text: action.payload.text,
        completed: false,
        category: action.payload.category,
        description: action.payload.description || "No description provided.",
      });
    },
    
    toggleTodo: (state, action: PayloadAction<string>) => {
        const todo = state.todos.find((t) => t.id === action.payload);
        if (todo) {
          todo.completed = !todo.completed;
        }
      },
      setFilterCategory: (state, action: PayloadAction<string>) => {
        state.filterCategory = action.payload;
      },
      
      setFilterStatus: (state, action: PayloadAction<string>) => {
        state.filterStatus = action.payload;
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
      
      .addCase(editTodoAsync.fulfilled, (state, action: PayloadAction<Todo>) => {
        const index = state.todos.findIndex((todo) => todo.id === action.payload.id);
        if (index !== -1) {
          state.todos[index] = action.payload;
        }
      })
      // Add a case for the deleteTodoAsync.fulfilled action
      .addCase(deleteTodoAsync.fulfilled, (state, action: PayloadAction<string>) => {
        state.todos = state.todos.filter((todo) => todo.id !== action.payload);
      })
      
  }
});
  

export const { addTodo, toggleTodo, setFilterCategory, setFilterStatus} = todoSlice.actions;
export default todoSlice.reducer;
