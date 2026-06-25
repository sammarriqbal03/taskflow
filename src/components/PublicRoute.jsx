// src/components/PublicRoute.jsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function PublicRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen app-gradient flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-white/20 border-t-white rounded-full animate-spin" />
      </div>
    );
  }

  // Agar user already logged in hai to Auth screens (Login/Signup/Forgot)
  // par jaane na do — seedha Dashboard bhej do
  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}
