import { Outlet } from "react-router-dom";
import Header from "./Component/Header";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { refreshTokenThunk } from "./features/users/userSlice";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    // On every refresh, try to get new access token
    const tryRefresh = async () => {
      dispatch(refreshTokenThunk());
    };
    tryRefresh();
  }, []);

  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

export default App;
