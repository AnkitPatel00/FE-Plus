import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function UserProtectedRoute({ children }) {
  const { login, authLoaded } = useSelector((state) => state.userState);
  const navigate = useNavigate();

  useEffect(() => {
    if (authLoaded && login) {
      navigate("/", { replace: true });
    }
  }, [login, authLoaded]);

  if (!authLoaded) {
    // Still verifying auth → show loading or nothing
    return <div>Authentication...</div>; // or return null
  }

  if (login) {
    return null;
  }

  return children;
}

export default UserProtectedRoute;
