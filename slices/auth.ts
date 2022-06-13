import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialAuthState } from "../types/initalAuthState";

const initialState: initialAuthState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
  method: "JWT",
  users: [
    {
      id: "c22c13729d8e445be0aa77d8",
      name: "demo user",
      email: "Sincere@april.biz",
      password: "123456",
    },
  ],
  route: "login",
};

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    initialize(
      state: initialAuthState,
      action: PayloadAction<{ isAuthenticated: boolean; user: object | null }>
    ) {
      const { isAuthenticated, user } = action.payload;
      return {
        ...state,
        isAuthenticated,
        isInitialized: true,
        user,
      };
    },
    login(
      state: initialAuthState,
      action: PayloadAction<{ user: object | null }>
    ) {
      const { user } = action.payload;

      return {
        ...state,
        isAuthenticated: true,
        user,
      };
    },
    changeMethod(
      state: initialAuthState,
      action: PayloadAction<{ method: string }>
    ) {
      const { method } = action.payload;

      return {
        ...state,
        method,
      };
    },
    changeRoute(
      state: initialAuthState,
      action: PayloadAction<{ route: string }>
    ) {
      const { route } = action.payload;

      return {
        ...state,
        route,
      };
    },
    logout(state: initialAuthState) {
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    },
    register(
      state: initialAuthState,
      action: PayloadAction<{ user: object | null }>
    ) {
      const { user } = action.payload;

      return {
        ...state,
        isAuthenticated: true,
        user,
      };
    },
  },
});

export const reducer = slice.reducer;

export const {
  initialize,
  register,
  login,
  logout,
  changeMethod,
  changeRoute,
} = slice.actions;

export default slice;
