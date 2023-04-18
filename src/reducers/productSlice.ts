import axios from "axios";
import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  imageUrl: string;
}
interface ProductState {
  products: Product[];
  error: string | null;
}
const initialState: ProductState = {
  products: [],
  error: null,
};

export const fetchProducts = createAsyncThunk(
  "product/fetchProducts",
  async () => {
    const response = await axios.get("http://localhost:8080/api/products");
    return response.data as Product[];
  }
);

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        fetchProducts.fulfilled,
        (state, action: PayloadAction<Product[]>) => {
          state.products = action.payload;
          state.error = null;
        }
      )
      .addCase(fetchProducts.rejected, (state, action) => {
        state.error = action.error.message || "Failed to fetch products";
      });
  },
});

export default productSlice.reducer;
