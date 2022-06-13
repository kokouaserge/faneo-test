import { initialAuthState } from "./initalAuthState";
import { initialSideBarState } from "./initialSideBarState";

export type AppState = {
  auth: initialAuthState;
  sidebar: initialSideBarState;
};
