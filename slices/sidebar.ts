import { createSlice } from "@reduxjs/toolkit";
import { initialSideBarState } from "../types/initialSideBarState";

const initialState: initialSideBarState = {
  sidebarToggle: false,
};

const slice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    closeSidebar(state: initialSideBarState) {
      return {
        ...state,
        sidebarToggle: false,
      };
    },
    toggleSidebar(state: initialSideBarState) {
      return {
        ...state,
        sidebarToggle: !state.sidebarToggle,
      };
    },
  },
});

export const reducer = slice.reducer;

export const { closeSidebar, toggleSidebar } = slice.actions;

export default slice;
