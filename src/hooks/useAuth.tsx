import { useContext } from "react";
import { AuthContext, type AuthContextType } from "../context/AuthContextWrapper";

const useAuth = (): AuthContextType => {
  const authContextData = useContext(AuthContext);

  if (!authContextData) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return authContextData;
};

export default useAuth;