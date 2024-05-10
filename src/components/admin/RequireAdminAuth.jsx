import { Outlet, Navigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import { useContext } from "react";

const RequireAdminAuth = () => {
  const { auth } = useContext(AuthContext);
  if (!auth.admin) {
    return <Navigate to="/" />;
  }
  return <Outlet />;
};

export default RequireAdminAuth;
