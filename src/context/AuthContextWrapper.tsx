import { createContext, useState } from "react";
import type { ReactNode } from "react";
import { apiService } from "../hooks/apiService";
import { toast } from "react-toastify";
import type { AxiosError } from "axios";

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
  name: "",
  email: "",
  image: "https://media.licdn.com/dms/image/v2/D5603AQF6Jg0zTVWBzQ/profile-displayphoto-scale_200_200/B56ZjazRsiH8Ac-/0/1756017532600?e=2147483647&v=beta&t=ZjjwETYcdYZ464B7MlBjEaAzoNvkmWwalikR8gYsnUE",
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

type LoginResponse = {
  token: string;
};
type UserResponse = {
  name: string;
  email: string;
};

/* =========================
   6. Provider Component
========================= */
const AuthContextWrapper = ({
  children,
}: AuthContextWrapperProps) => {
  const [isLoggedIn, setLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState<User>(initUser);

  const login = async (email: string, password: string): Promise<void> => {
    try {
      // 1️⃣ Authenticate user
      const loginData = await apiService.post<LoginResponse>(
        "/auth/login",
        { email, password }
      );

      // Optional: store token if not using cookies
      // localStorage.setItem("token", loginData.token);

      // 2️⃣ Fetch user details
      const userData = await apiService.get<UserResponse>(
        `/api/v1/users/email/${email}`
      );

      // 3️⃣ Update state safely
      setUser((prev) => ({
        ...prev,
        ...userData,
      }));

      setLoggedIn(true);
      toast.success("logged in succesfully!");

    } catch (err) {
      const error = err as AxiosError<{ message?: string }>;
      console.log(error.response);

      // Centralized error handling
      const message =
        error.response?.data?.error ||
        error.message ||
        "Login failed. Please try again.";

      // Handle specific status codes if needed
      if (error.response?.status === 401) {
        toast.error("Invalid credentials");
      } else if (error.response?.status === 404) {
        toast.error("User not found");
      } else {
        toast.error(message);
      }

      setLoggedIn(false);
    }
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