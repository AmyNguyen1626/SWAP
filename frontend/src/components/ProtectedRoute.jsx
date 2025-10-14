import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/useAuth";

export default function ProtectedRoute({ children }) {
    const { currentUser } = useAuth();

    if (!currentUser) {
        alert("Please login first to access this page!");
        return <Navigate to="/login" replace />;
    }

    return children;
}