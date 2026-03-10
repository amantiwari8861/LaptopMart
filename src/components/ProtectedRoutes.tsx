import { Navigate } from "react-router";
import useAuth from "../hooks/useAuth"
import type { ReactNode } from "react";

const ProtectedRoutes = ({ children }: { children: ReactNode }) => {
    const {isLoggedIn} = useAuth();
    console.log(isLoggedIn);

    return isLoggedIn ? children : <Navigate to={"/login"} />
}

export default ProtectedRoutes