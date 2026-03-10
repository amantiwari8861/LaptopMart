import { createContext, useState } from "react";
import type { ReactNode } from "react";

/* =========================
   1. Define User Type
========================= */
export interface User {
  name: string;
  email: string;
  image: string;
}

/* =========================
   2. Initial User Object
========================= */
const initUser: User = {
  name: "Aman Tiwari",
  email: "amantiwari@gmail.com",
  image:
    "https://media.licdn.com/dms/image/v2/D5603AQF6Jg0zTVWBzQ/profile-displayphoto-scale_200_200/B56ZjazRsiH8Ac-/0/1756017532600?e=2147483647&v=beta&t=ZjjwETYcdYZ464B7MlBjEaAzoNvkmWwalikR8gYsnUE",
};

/* =========================
   3. Context Type
========================= */
export interface AuthContextType {
  isLoggedIn: boolean;
  user: User;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

/* =========================
   4. Create Context
========================= */
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

/* =========================
   5. Wrapper Props Type
========================= */
interface AuthContextWrapperProps {
  children: ReactNode;
}

/* =========================
   6. Provider Component
========================= */
const AuthContextWrapper = ({
  children,
}: AuthContextWrapperProps) => {
  const [isLoggedIn, setLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState<User>(initUser);

  const login = async (
    email: string,
    password: string
  ): Promise<void> => {
    // Example authentication logic
    setUser({
      ...initUser,
      email,
    });

    setLoggedIn(true);
  };

  const logout = async (): Promise<void> => {
    setUser(initUser);
    setLoggedIn(false);
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, login, logout, user }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextWrapper;