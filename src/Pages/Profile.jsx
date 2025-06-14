import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userProfileThunk } from "../features/users/userSlice";

function Profile() {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.userState);

  useEffect(() => {
    dispatch(userProfileThunk());
  }, []);

  return (
    <div className="container py-4">
      <h3>Profile</h3>
      {
        <div>
          <h1 className="display-5">
            {user.firstname} {user.lastname}
          </h1>
          <p>{user.email}</p>
          <p>{user.phonenumber}</p>
        </div>
      }
    </div>
  );
}

export default Profile;
