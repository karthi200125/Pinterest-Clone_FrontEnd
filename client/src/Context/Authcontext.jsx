import { createContext, useEffect, useReducer } from "react";

const INITIAL_STATE = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  isFetching: false,
  error: false,
};

export const AuthContext = createContext();

const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return { ...state, user: null, isFetching: true, error: false };
    case "LOGIN_SUCCESS":
      localStorage.setItem("user", JSON.stringify(action.payload));
      return { ...state, user: action.payload, isFetching: false, error: false };
    case "LOGIN_FAILURE":
      return { ...state, user: null, isFetching: false, error: action.payload };
    case "LOGOUT":
      localStorage.removeItem("user");
      return { user: null, isFetching: false, error: false };
    case "UPDATE_PROFILE":
      const currentUser = JSON.parse(localStorage.getItem("user"));
      const updatedUser = { ...currentUser, ...action.payload };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      return { ...state, user: updatedUser, isFetching: false, error: false };
    
    case "SAVEDPOSTS":
      return {
        ...state,
        user: { ...state.user, savedposts: action.payload.savedposts },
        isFetching: false,
        error: false,
      };
    
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, INITIAL_STATE);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      dispatch({ type: "LOGIN_SUCCESS", payload: storedUser });
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
