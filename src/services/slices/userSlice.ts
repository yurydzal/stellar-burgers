import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  registerUserApi,
  loginUserApi,
  getUserApi,
  updateUserApi,
  logoutApi
} from '@api';
import { TUser } from '@utils-types';

export const registerUser = createAsyncThunk(
  'user/registerUser',
  registerUserApi
);

export const loginUser = createAsyncThunk('user/loginUser', loginUserApi);

export const getUser = createAsyncThunk('user/getUser', getUserApi);

export const updateUser = createAsyncThunk('user/updateUser', updateUserApi);

export const logoutUser = createAsyncThunk('user/logoutUser', logoutApi);

interface UserState {
  user: TUser;
  isInit: boolean;
  isLoading: boolean;
  error: string | null;
}

const initialState: UserState = {
  user: {
    email: '',
    name: ''
  },
  isInit: false,
  isLoading: false,
  error: null
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    getUserLogout: () => initialState
  },
  selectors: {
    getUserData: (state) => state.user,
    getUserStatus: (state) => state.isInit
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error?.message ?? 'registerUser rejected';
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isInit = true;
        state.user = action.payload.user;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error?.message ?? 'loginUser rejected';
      })
      .addCase(getUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isInit = true;
        state.user = action.payload.user;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error?.message ?? 'getUser rejected';
      })
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error?.message ?? 'updateUser rejected';
      })
      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoading = false;
        state.isInit = false;
        state.user = {
          email: '',
          name: ''
        };
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error?.message ?? 'logoutUser rejected';
      });
  }
});

export const { getUserLogout } = userSlice.actions;
export const { getUserData, getUserStatus } = userSlice.selectors;
export default userSlice.reducer;
