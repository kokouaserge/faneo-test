export type initialAuthState = {
  isAuthenticated: boolean;
  isInitialized: boolean;
  user: object | null;
  method: string;
  users: userLog[];
  route: string;
};

export type userLog = {
  email: string;
  id: string;
  password: string;
  name: string;
};
