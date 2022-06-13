import { useQuery } from "react-query";
import { sign, decode, verify, JWT_SECRET, JWT_EXPIRES_IN } from "./jwt";
import axios from "../utils/axios";
import { fetchUserLogged } from "../api/auth";
import { initialize, logout } from "../slices/auth";
import firebase from "./firebase";

export const setSession = (accessToken: string | null) => {
  if (accessToken) {
    localStorage.setItem("accessToken", accessToken);
    axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  } else {
    localStorage.removeItem("accessToken");
    delete axios.defaults.headers.common.Authorization;
  }
};

export const initializeAuth = (dispatch: any) => {
  const accessToken = window.localStorage.getItem("accessToken");
  if (accessToken && verify(accessToken, JWT_SECRET)) {
    setSession(accessToken);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return useQuery(["getUserLogged"], () => fetchUserLogged(), {
      onSuccess: async (data: any) => {
        const { user } = data;
        dispatch(initialize({ isAuthenticated: true, user }));
      },
      onError: async (data: any) => {
        dispatch(initialize({ isAuthenticated: false, user: null }));
      },
    });
  }

  return dispatch(initialize({ isAuthenticated: false, user: null }));
};

export const initializeAuthMock = (dispatch: any, users: any) => {
  const accessToken = window.localStorage.getItem("accessToken");
  if (accessToken && verify(accessToken, JWT_SECRET)) {
    setSession(accessToken);
    const { userId } = decode(accessToken);
    const user = users.find((_user: any) => _user.id === userId);
    if (!user) return logoutSession(dispatch);
    return dispatch(initialize({ isAuthenticated: true, user }));
  }
};
export const initializeFirebase = (dispatch: any) => {
  firebase.auth().onAuthStateChanged((user: any) => {
    if (user) {
      dispatch(
        initialize({
          isAuthenticated: true,
          user: {
            id: user.uid,
            email: user.email,
            name: user.displayName || user.email,
          },
        })
      );
    } else {
      dispatch(initialize({ isAuthenticated: false, user: null }));
    }
  });
};

export const logoutSession = (dispatch: any) => {
  setSession(null);
  return dispatch(logout());
};

export const signInWithEmailAndPassword = (email: string, password: string) => {
  return firebase.auth().signInWithEmailAndPassword(email, password);
};

export const signInWithGoogle = () => {
  const provider = new firebase.auth.GoogleAuthProvider();

  return firebase.auth().signInWithPopup(provider);
};

export const createUserWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  return firebase.auth().createUserWithEmailAndPassword(email, password);
};

export const logoutFirebase = () => {
  return firebase.auth().signOut();
};

export const createToken = (userId: number) => {
  const accessToken = sign({ userId }, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });

  return accessToken;
};

export const randomId = () => {
  const arr = new Uint8Array(12);
  window.crypto.getRandomValues(arr);
  return Array.from(arr, (v) => v.toString(16).padStart(2, "0")).join("");
};
