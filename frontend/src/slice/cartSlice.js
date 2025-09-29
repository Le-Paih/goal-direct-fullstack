import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// const initialState = {
//   items: [],
//   bill: 0,
//   status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed',
//   error: null,
// };

export const fetchCart = createAsyncThunk("cart/fetchCart", async () => {
  const token = localStorage.getItem("authToken");
  const response = await axios.get("http://127.0.0.1:3000/api/v1/cart/", {
    withCredentials: true,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data.data;
});

export const addItemToCart = createAsyncThunk(
  "cart/addItemToCart",
  async ({ itemId, itemType, size, quantity }) => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:3000/api/v1/cart/add",
        { itemId, itemType, size, quantity },
        { withCredentials: true }
      );
      return response.data.data.cart;
    } catch (err) {
      console.error("Add to cart Error", err.response.data);
      throw new Error(err.response.data.message || "Add to cart failed");
      // return rejectWithValue(err.response.data);
    }
  }
);

export const updateCartItem = createAsyncThunk(
  "cart/update",
  async ({ itemId, itemType, size, quantity }) => {
    try {
      const response = await axios.put(
        "http://127.0.0.1:3000/api/v1/cart/update",
        { itemId, itemType, size, quantity },
        { withCredentials: true }
      );
      return response.data.data.cart;
    } catch (err) {
      console.error("Updating cart Error", err.response.data);
      throw new Error(err.response.data.message || "Updating cart failed");
    }
  }
);

export const removeItemFromCart = createAsyncThunk(
  "cart/remove",
  async ({ itemId, itemType, size, quantity }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("authToken");

      const response = await axios.delete(
        "http://127.0.0.1:3000/api/v1/cart/remove",
        {
          data: { itemId, itemType, size, quantity }, // 👈 DELETE needs `data` inside the config
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`, // Optional but helps if backend reads from this
          },
        }
      );
      return response.data.data.cart;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const clearCart = createAsyncThunk("cart/clearCart", async () => {
  const token = localStorage.getItem("authToken");
  const response = await axios.post(
    "http://127.0.0.1:3000/api/v1/cart/clear",
    {},
    {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data.data;
});

// Create the slice
const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    bill: 0,
    status: "idle",
    error: null,
  },
  reducers: {
    clearLocalCart: (state) => {
      state.items = [];
      state.bill = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch cart
      .addCase(fetchCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload.cart.items;
        state.bill = action.payload.bill;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      // add items to cart
      .addCase(addItemToCart.fulfilled, (state, action) => {
        state.items = action.payload.items;
        state.bill = action.payload.bill;
      })
      // Remove item from cart
      .addCase(removeItemFromCart.fulfilled, (state, action) => {
        state.items = action.payload.items || [];
        state.bill = action.payload.bill || 0;
      })
      .addCase(removeItemFromCart.rejected, (state, action) => {
        state.error = action.payload || "Failed to remove item.";
      })
      // clear cart
      .addCase(clearCart.fulfilled, (state, action) => {
        state.items = action.payload?.items || [];
        state.bill = action.payload.bill || 0;
      });
  },
});

export const { clearLocalCart } = cartSlice.actions;

export default cartSlice.reducer;
