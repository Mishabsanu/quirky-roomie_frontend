import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
  current_user: null,
  loading: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      const { token, current_user } = action.payload;
      state.token = token;
      state.current_user = current_user;
      state.loading = false;
    },

    setLogout: (state) => {
      state.token = null;
      state.current_user = null;
      state.loading = false;
    },

    startLoading: (state) => {
      state.loading = true;
    },
  },
}); 

export const { setLogin, setLogout, startLoading } = authSlice.actions;
export default authSlice.reducer;
