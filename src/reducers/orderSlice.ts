import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { clearCart } from "./cartSlice";
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

interface CustomerOrder {
  id: number;
  user: {
    id: number;
    username: string;
    email: string;
  };
  cartItems: CartItem[];
  orderDate: string;
  status: string;
}

interface OrderState {
  orders: CustomerOrder[];
  error: string | null;
}

const initialState: OrderState = {
  orders: [],
  error: null,
};

export const placeOrder = createAsyncThunk(
  "order/placeOrder",
  async (userId: number, { dispatch }) => {
    const response = await axios.post<CustomerOrder>(
      `http://localhost:8080/api/orders`,
      null,
      { params: { userId } }
    );
    dispatch(clearCart());
    return response.data;
  }
);

export const fetchUserOrders = createAsyncThunk(
  "order/fetchUserOrders",
  async (userId: number) => {
    const response = await axios.get<CustomerOrder[]>(
      `http://localhost:8080/api/orders/user/${userId}`
    );
    return response.data;
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(placeOrder.fulfilled, (state, action) => {
        state.orders.push(action.payload);
      })
      .addCase(placeOrder.rejected, (state, action) => {
        state.error = action.error.message || "Failed to place order.";
      })
      .addCase(fetchUserOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
      })
      .addCase(fetchUserOrders.rejected, (state, action) => {
        state.error = action.error.message || "Failed to fetch orders";
      });
  },
});

export default orderSlice.reducer;
