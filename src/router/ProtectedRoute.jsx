import { useUser } from "@clerk/clerk-react";
import { Navigate } from "react-router";

const ProtectedRoute = ({ children }) => {
  const { isLoaded, isSignedIn } = useUser();

  if (!isLoaded) return null;

  if (!isSignedIn) {
    return <Navigate to="/auth/sign-up" replace />;
  }

  return children;
};

export default ProtectedRoute;
