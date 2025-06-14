import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const { login, authLoaded } = useSelector((state) => state.userState);
  const navigate = useNavigate();

  useEffect(() => {
    if (authLoaded && !login) {
      navigate("/login", { replace: true });
    }
  }, [login, authLoaded]);

  // Wait for auth to load before deciding
  if (!authLoaded) {
    return <div>Loading...</div>; // or return null
  }

  if (!login) {
    return null;
  }

  return children;
}

export default ProtectedRoute;
