import React from "react";
import { useRouter } from "next/router";
import { useSelector } from "../../store/index";
import LoginCover from "../Auth/Login/Cover/Cover";
import RegisterCover from "../Auth/Register/Cover/RegisterCover";
import { AppState } from "../../types/AppState";

interface AuthificatedInterface {
  children?: React.ReactNode;
}

const Authenticated = (props: AuthificatedInterface) => {
  const { children } = props;
  const { isAuthenticated, route } = useSelector(
    (state: AppState) => state.auth
  );

  if (!isAuthenticated) {
    if (route === "login") return <LoginCover />;

    return <RegisterCover />;
  }

  return <>{children}</>;
};

export default Authenticated;
