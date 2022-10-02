import { createContext, useEffect, useReducer } from "react";
import AuthReducer from "./AuthReducer";
// context AuthContext here you can set user in local storage;
const INITIAL_STATE = {
  currentUser: JSON.parse(localStorage.getItem("user")) || null,
};
// here we export authContext
export const AuthContext = createContext(INITIAL_STATE);
// thats the provider auth and manager
export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.currentUser));
  }, [state.currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser: state.currentUser, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
