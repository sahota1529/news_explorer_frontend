import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ loggedIn, children }) => {
  if (!loggedIn) {
    // alert("You are not logged in, returning to home page.");
    return <Navigate to="/" replace />;
  }
  return children;
};

export default ProtectedRoute;
