import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

type Category = {
  id: string;
  name: string;
  color: string;
};

type CategoryState = {
  categories: Category[];
  loading: boolean;
};

const initialState: CategoryState = {
  categories: [],
  loading: false,
};


export const fetchCategories = createAsyncThunk<Category[]>(
  "categories/fetchCategories",
  async () => {
    const response = await fetch("http://localhost:5000/categories");
    return (await response.json()) as Category[];
  }
);

const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCategories.fulfilled, (state, action: PayloadAction<Category[]>) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default categorySlice.reducer;
