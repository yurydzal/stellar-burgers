import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { orderBurgerApi, getOrdersApi, getOrderByNumberApi } from '@api';
import { TOrder } from '@utils-types';

export const newOrder = createAsyncThunk('orders/newOrder', orderBurgerApi);

export const fetchOrders = createAsyncThunk('orders/fetchOrders', getOrdersApi);

export const fetchOrderNumber = createAsyncThunk(
  'orders/fetchOrderNumber',
  getOrderByNumberApi
);

interface OrderState {
  orders: TOrder[];
  data: TOrder | null;
  isRequested: boolean;
  isLoading: boolean;
  error: string | null;
}

const initialState: OrderState = {
  orders: [],
  data: null,
  isRequested: false,
  isLoading: false,
  error: null
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    clearOrderData: (state) => {
      state.data = initialState.data;
    }
  },
  selectors: {
    getOrdersData: (state) => state.orders,
    getOrderData: (state) => state.data,
    getOrderStatus: (state) => state.isRequested,
    getOrdersStatus: (state) => state.isLoading
  },
  extraReducers: (builder) => {
    builder
      .addCase(newOrder.pending, (state) => {
        state.isRequested = true;
      })
      .addCase(newOrder.fulfilled, (state, action) => {
        state.isRequested = false;
        state.data = action.payload.order;
      })
      .addCase(newOrder.rejected, (state, action) => {
        state.isRequested = false;
        state.error = action.error?.message ?? 'newOrder rejected';
      })
      .addCase(fetchOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error?.message ?? 'fetchOrders rejected';
      })
      .addCase(fetchOrderNumber.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchOrderNumber.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload.orders[0];
      })
      .addCase(fetchOrderNumber.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error?.message ?? 'fetchOrderNumber rejected';
      });
  }
});

export const { clearOrderData } = orderSlice.actions;
export const { getOrdersData, getOrderData, getOrderStatus, getOrdersStatus } =
  orderSlice.selectors;
export default orderSlice.reducer;
