import Cookies from "js-cookie";
import { createContext, useContext, useEffect, useReducer } from "react";

const initialState = {
  loading: false,
  user: JSON.parse(localStorage.getItem("user")) || null,
  error: null,
};
export const AuthContext = createContext({ ...initialState, dispatch: () => {} });

const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return { user: action.payload, loading: false, error: null };
    case "REGISTER_FAILED":
      return { user: null, loading: false, error: action.payload };
    case "LOGOUT": {
      Cookies.remove("access_token");
      return {
        user: null,
        loading: false,
        error: null,
      };
    }
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.user));
  }, [state.user]);
  return (
    <AuthContext.Provider value={{ user: state.user, loading: state.loading, error: state.error, dispatch: dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
