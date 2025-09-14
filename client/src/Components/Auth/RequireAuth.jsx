// we are making this component to allow selective access to certain pages based on the roles

//to use this we will pass the required component within this created component along with the allowed roles passed as parameters

//if according to the conditions, the Outlet should be rendered, then the child components passed inside this component in App.jsx file will be rendered

import { useSelector } from "react-redux";
import { Navigate, useLocation, Outlet } from "react-router-dom";

function RequireAuth({ allowedRoles }) {
  const { isLoggedIn, role } = useSelector((state) => state.auth);
  const location = useLocation();

  return isLoggedIn && allowedRoles.find((myRole) => myRole === role) ? (
    <Outlet />
  ) : isLoggedIn ? (
    <Navigate to="/denied" />
  ) : (
    <Navigate to="login" />
  );
}

export default RequireAuth;
