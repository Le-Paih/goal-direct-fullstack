import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import Account from "./Account";
import { Navigate } from "react-router-dom";

function Profile() {
  const { isLoggedIn } = useContext(AuthContext);

  if (!isLoggedIn) {
    return <Navigate to="/notloggedin" replace />;
  }

  return <Account />;
}

export default Profile;
