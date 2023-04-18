import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface CartItem {
  id: number;
  product: {
    id: number;
    name: string;
    description: string;
    price: string;
    imageUrl: string;
  };
  quantity: number;
}

interface CartState {
  items: CartItem[];
  error: string | null;
}

const initialState: CartState = {
  items: [],
  error: null,
};

export const fetchCartItems = createAsyncThunk(
  "cart/fetchCartItems",
  async (userId: number) => {
    const response = await axios.get(
      `http://localhost:8080/api/cart/${userId}`
    );
    return response.data as CartItem[];
  }
);

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async (params: { userId: number; productId: number; quantity: number }) => {
    const { userId, productId, quantity } = params;
    const response = await axios.post(
      `http://localhost:8080/api/cart/${userId}/${productId}?quantity=${quantity}`
    );
    return response.data as CartItem;
  }
);

export const removeOneFromCart = createAsyncThunk(
  "cart/removeOneFromCart",
  async (cartItemId: number) => {
    await axios.delete(
      `http://localhost:8080/api/cart/${cartItemId}/removeOne`
    );
    return cartItemId;
  }
);

export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async (cartItemId: number) => {
    await axios.delete(`http://localhost:8080/api/cart/${cartItemId}`);
    return cartItemId;
  }
);

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart: (state) => {
      state.items = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        fetchCartItems.fulfilled,
        (state, action: PayloadAction<CartItem[]>) => {
          state.items = action.payload;
          state.error = null;
        }
      )
      .addCase(fetchCartItems.rejected, (state, action) => {
        state.error = action.error.message || "Failed to fetch cart items";
      })
      .addCase(
        addToCart.fulfilled,
        (state, action: PayloadAction<CartItem>) => {
          state.items.push(action.payload);
        }
      )
      .addCase(
        removeFromCart.fulfilled,
        (state, action: PayloadAction<number>) => {
          state.items = state.items.filter(
            (item) => item.id !== action.payload
          );
        }
      )
      .addCase(removeOneFromCart.fulfilled, (state, action) => {
        const cartItemId = action.payload;
        const cartItemIndex = state.items.findIndex(
          (item) => item.id === cartItemId
        );

        if (cartItemIndex >= 0) {
          if (state.items[cartItemIndex].quantity > 1) {
            state.items[cartItemIndex].quantity -= 1;
          } else {
            state.items.splice(cartItemIndex, 1);
          }
        }
      });
  },
});

export const { clearCart } = cartSlice.actions;

export default cartSlice.reducer;
