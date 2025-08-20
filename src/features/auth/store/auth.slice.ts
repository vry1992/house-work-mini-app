import { createSlice } from '@reduxjs/toolkit';
import { useActionCreators } from '../../../store/hooks';
import { StateStatus } from '../../../store/types';
import type { AuthState } from '../types/types';
import { authThunks } from './auth.actions';

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  status: StateStatus.SUCCESS,
  error: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(authThunks.login.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.status = StateStatus.SUCCESS;
      state.error = null;
    });
    builder.addCase(authThunks.login.pending, (state) => {
      state.user = null;
      state.token = null;
      state.error = null;
      state.isAuthenticated = false;
      state.status = StateStatus.LOADING;
    });
    builder.addCase(authThunks.login.rejected, (state, action) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = action.error;
      state.status = StateStatus.ERROR;
    });
  },
});

const authActions = {
  ...authSlice.actions,
  ...authThunks,
};

export const useAuthActionCreators = () => {
  const boundActionCreators = useActionCreators(authActions);

  return boundActionCreators;
};

export const authReducer = authSlice.reducer;
