import { combineReducers } from "@reduxjs/toolkit";
import { reducer as authReducer } from "../slices/auth";
import { reducer as sidebarReducer } from "../slices/sidebar";

const rootReducer = combineReducers({
  auth: authReducer,
  sidebar: sidebarReducer,
});

export default rootReducer;
