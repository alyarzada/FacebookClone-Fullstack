import { Link } from "react-router-dom";
import useAuthContext from "../hooks/useAuthContext";

const Header = () => {
  const { dispatch } = useAuthContext();

  return (
    <header className="p-4">
      <nav className="flex gap-x-4">
        <div className="flex-1">
          <h4>Logo</h4>
        </div>

        <div>
          <ul className="flex gap-x-4">
            <li>
              <h5>user</h5>
            </li>
            <li>
              <button onClick={() => dispatch({ type: "logout" })}>
                Log out
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
