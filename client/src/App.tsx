import { useEffect } from "react";
import { useRoutes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { getTokenCookie } from "./utils/auth";
import useAuthContext from "./hooks/useAuthContext";
import routes from "./routes";
import { ScaleLoader } from "react-spinners";

function App() {
  const { dispatch, isLoading } = useAuthContext();
  const routing = useRoutes(routes);

  useEffect(() => {
    const token = getTokenCookie();
    if (token) {
      dispatch({ type: "login", payload: token });
    } else {
      dispatch({ type: "logout" });
    }
  }, [dispatch]);

  return (
    <div className="App">
      {isLoading ? <ScaleLoader color="#22D3EE" /> : <>{routing}</>}
      <Toaster position="top-center" />
    </div>
  );
}

export default App;
