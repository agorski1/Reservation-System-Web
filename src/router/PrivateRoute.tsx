import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
import type {JSX} from "react";

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
    const { token } = useAuth();

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default PrivateRoute;