import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function UserProtectedRoute({ children }) {
  const { login } = useSelector((state) => state.userState);

  const navigate = useNavigate();

  useEffect(() => {
    if (login) {
      navigate("/", { replace: true });
    }
  }, [login]);

  if (login) {
    return null;
  }

  return children;
}

export default UserProtectedRoute;
