import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getOrdersApi, getOrderByNumberApi } from '@api';
import { TOrder } from '@utils-types';

export const fetchOrders = createAsyncThunk('orders/fetchOrders', getOrdersApi);

export const fetchOrderNumber = createAsyncThunk(
  'orders/fetchOrderNumber',
  getOrderByNumberApi
);

interface OrdersListState {
  orders: TOrder[];
  orderData: TOrder | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: OrdersListState = {
  orders: [],
  orderData: null,
  isLoading: false,
  error: null
};

const ordersListSlice = createSlice({
  name: 'ordersList',
  initialState,
  reducers: {},
  selectors: {
    getOrdersData: (state) => state.orders,
    getOrderData: (state) => state.orderData,
    getOrdersStatus: (state) => state.isLoading
  },
  extraReducers: (builder) => {
    builder
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
        state.orderData = action.payload.orders[0];
      })
      .addCase(fetchOrderNumber.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error?.message ?? 'fetchOrderNumber rejected';
      });
  }
});

export const { getOrdersData, getOrderData, getOrdersStatus } =
  ordersListSlice.selectors;
export default ordersListSlice.reducer;
