import React from "react";
import { useRouter } from "next/router";
import { useSelector } from "../../store/index";
import LoginCover from "../Auth/Login/Cover/Cover";
import RegisterCover from "../Auth/Register/Cover/RegisterCover";
import RecoveryPassword from "../Auth/RecoveryPassword/RecoveryPassword";
import { AppState } from "../../types/AppState";

interface AuthificatedInterface {
  children?: React.ReactNode;
}

const Authenticated = (props: AuthificatedInterface) => {
  const { children } = props;
  const router = useRouter();
  const { isAuthenticated, route } = useSelector(
    (state: AppState) => state.auth
  );

  if (!isAuthenticated && router.pathname !== "/recovery") {
    if (route === "login") return <LoginCover />;

    if (route === "recovery") return <RecoveryPassword />;

    return <RegisterCover />;
  }

  return <>{children}</>;
};

export default Authenticated;
