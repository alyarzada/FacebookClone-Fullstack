import { ReactNode, Fragment } from "react";
import { useLocation, Navigate } from "react-router-dom";
import useAuthContext from "../../hooks/useAuthContext";

const RequireAuth = ({ children }: { children: ReactNode }) => {
  const location = useLocation();
  const { token }: any = useAuthContext();

  return token ? (
    <Fragment>{children}</Fragment>
  ) : (
    <Navigate to="/auth/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
