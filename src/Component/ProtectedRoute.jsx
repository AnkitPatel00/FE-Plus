import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const { login } = useSelector((state) => state.userState);
  const navigate = useNavigate();

  useEffect(() => {
    if (!login) {
      navigate("/login", { replace: true });
    }
  }, [login]);

  if (!login) {
    return null;
  }

  return children;
}
export default ProtectedRoute;
