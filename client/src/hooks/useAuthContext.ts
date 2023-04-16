import { useContext } from "react";
import { Context as AuthContext } from "../context/authContext";

const useAuthContext = () => useContext(AuthContext);

export default useAuthContext;
