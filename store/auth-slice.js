import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
    username: null,
    userId: null,
    orderHistory: [],
    errorMessage: null,
    successMessage: null,
  },
  reducers: {
    login(state, action) {
      state.isLoggedIn = true;
      state.username = action.payload.userName;
      state.userId = action.payload.userId;
    },

    logout(state) {
      state.isLoggedIn = false;
      state.username = null;
      state.userId = null;
      state.errorMessage = null;
      state.successMessage = null;
    },

    addToOrderHistory(state, action) {
      const newItem = action.payload;
      state.orderHistory.push({
        ...newItem,
      });
    },

    setError(state, action) {
      state.errorMessage = action.payload;
    },

    setSuccess(state, action) {
      state.sucessMessage = action.payload;
    },
  },
});

export const authAction = authSlice.actions;
export default authSlice;
