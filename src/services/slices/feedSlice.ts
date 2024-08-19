import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getFeedsApi } from '@api';
import { TOrdersData } from '@utils-types';

export const fetchFeed = createAsyncThunk('orders/fetchFeed', getFeedsApi);

interface FeedState {
  feed: TOrdersData;
  isLoading: boolean;
  error: string | null;
}

const initialState: FeedState = {
  feed: {
    orders: [],
    total: 0,
    totalToday: 0
  },
  isLoading: false,
  error: null
};

const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  selectors: {
    getFeedData: (state) => state.feed,
    getFeedStatus: (state) => state.isLoading
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeed.pending, (state) => {
        state.isLoading = true;
        state.feed.orders = [];
      })
      .addCase(fetchFeed.fulfilled, (state, action) => {
        state.isLoading = false;
        state.feed = action.payload;
      })
      .addCase(fetchFeed.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error?.message ?? 'fetchFeed rejected';
      });
  }
});

export const { getFeedData, getFeedStatus } = feedSlice.selectors;
export default feedSlice.reducer;
