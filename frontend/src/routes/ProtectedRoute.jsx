import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { authContext } from "../context/AuthContext";

const ProtectedRoute = ({ children, allowedRoles }) => {
    const { token, role } = useContext(authContext);

    if (!token) {
        return <Navigate to="/login" replace={true} />;
    }

    if (allowedRoles && !allowedRoles.includes(role)) {
        return <Navigate to="/" replace={true} />;
    }

    return children;
};

export default ProtectedRoute;