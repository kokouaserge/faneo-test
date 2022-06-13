import { useMutation } from "react-query";
import { setSession, createToken, randomId } from "../utils/auth";
import { logginUser, registerUser } from "../api/auth";
import { register, login } from "../slices/auth";

export const useLogin = (dispatch: any) => {
  return useMutation(logginUser, {
    onSuccess: async (data, variables, context) => {
      const { accessToken, user } = data;
      setSession(accessToken);
      dispatch(login({ user }));
    },
    onError: async (data, variables, context) => {},
  });
};

export const loginMock = (
  params: { email: string; password: string },
  usersInitial: any,
  dispatch: any
) => {
  const { email, password } = params;

  const user = usersInitial.find(
    (user: any) => user.email === email && user.password === password
  );

  if (!!user) {
    const accessToken = createToken(user.id);

    setSession(accessToken);
    return dispatch(login({ user }));
  }
};

export const registerMock = (
  params: { email: string; password: string; name: string },
  usersInitial: any,
  dispatch: any
) => {
  const { email, password, name } = params;

  const indexOfUser = usersInitial.findIndex(
    (user: any) => user.email === email && user.password === password
  );

  if (indexOfUser === -1) {
    const user: any = {
      email,
      password,
      name,
      id: randomId(),
    };

    const accessToken = createToken(user.id);

    setSession(accessToken);
    return dispatch(login({ user }));
  }
};

export const useRegister = (dispatch: any) => {
  return useMutation(registerUser, {
    onSuccess: async (data, variables, context) => {
      const { accessToken, user } = data;

      window.localStorage.setItem("accessToken", accessToken);
      dispatch(register({ user }));
    },
    onError: async (data, variables, context) => {},
  });
};
