import { useQuery } from "@tanstack/react-query";
import { useReducer, createContext, useEffect } from "react";
import { makeRequest } from "../axios";

const INITIAL_STATE = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  isFetching: false,
  error: false,

};

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case "LOGIN_START":
        return {
          ...state,
          user: null,
          isFetching: true,
          error: false,
        };
      case "LOGIN_SUCCESS":
        localStorage.setItem("user", JSON.stringify(action.payload));
        return {
          ...state,
          user: action.payload,
          isFetching: false,
          error: false,
        };
      case "LOGIN_FAILURE":
        return {
          ...state,
          user: null,
          isFetching: false,
          error: action.payload,
        };
      case "LOGOUT":
        localStorage.removeItem("user");
        return {
          user: null,
          isFetching: false,
          error: false,
        };

      case "UPDATE_PROFILE":
        const updatedUser = { ...state.user };

        if (action.payload.savedposts !== undefined) {
          updatedUser.savedposts = action.payload.savedposts;
        }

        if (action.payload.followers !== undefined) {
          updatedUser.followers = action.payload.followers;
        }

        localStorage.setItem("user", JSON.stringify(updatedUser));

        return {
          ...state,
          user: updatedUser,
        };


      default:
        return state;
    }
  }, INITIAL_STATE);

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