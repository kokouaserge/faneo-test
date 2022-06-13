import React, { useState, useEffect } from "react";
import { ThemeProvider } from "@mui/material";
import { StylesProvider } from "@mui/styles";
import { themeCreator } from "./base";
import { initializeAuthMock } from "../utils/auth";
import { useDispatch, useSelector } from "../store/index";

interface ThemeProps {
  children: React.ReactNode;
}

export const ThemeContext = React.createContext<any>(null);

const ThemeProviderWrapper = function (props: ThemeProps) {
  let defaultTheme = "PureLightTheme";

  if (typeof window !== "undefined") {
    defaultTheme = localStorage.getItem("appTheme") || "PureLightTheme";
  }
  const [themeName, _setThemeName] = useState(defaultTheme);
  const theme = themeCreator(themeName);
  const setThemeName = (themeName: string) => {
    localStorage.setItem("appTheme", themeName);
    return _setThemeName(themeName);
  };
  const dispatch = useDispatch();
  const { users } = useSelector((state: any) => state.auth);

  useEffect(() => {
    initializeAuthMock(dispatch, users);
  }, []);

  return (
    <>
      <StylesProvider injectFirst>
        <ThemeContext.Provider value={setThemeName}>
          <ThemeProvider theme={theme}>{props.children}</ThemeProvider>
        </ThemeContext.Provider>
      </StylesProvider>
    </>
  );
};

export default ThemeProviderWrapper;
