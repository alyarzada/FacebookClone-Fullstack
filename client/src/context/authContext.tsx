import { ReactNode, createContext, useReducer } from "react";
import { getTokenCookie } from "../utils/auth";

interface ContextType {
  // define your context properties here
}

interface InitialStateTypes {
  token: null | string;
  isLoading: boolean;
  dispatch?: React.Dispatch<any>;
}

const initialState: InitialStateTypes = {
  token: null,
  isLoading: true,
};

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case "login":
      return {
        ...state,
        token: action.payload,
        isLoading: false,
      };
    case "logout":
      localStorage.removeItem("token");
      return { ...state, token: null, isLoading: false };
    case "loading":
      return { ...state, isLoading: true };
    default:
      return state;
  }
};

export const Context = createContext<ContextType | undefined>(undefined);

const Provider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <Context.Provider value={{ ...state, dispatch }}>
      {children}
    </Context.Provider>
  );
};

export default Provider;
