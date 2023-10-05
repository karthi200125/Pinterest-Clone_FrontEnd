import { makeRequest } from './axios';
import { errorToast, successToast } from './toasts';


export const LoginCall = async (userCredentials, dispatch) => {
    
  dispatch({ type: "LOGIN_START" });
  try {
    const res = await makeRequest.post("/auth/login", userCredentials);
    dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
    successToast("Login SuccessFully")
  } catch (error) {
    dispatch({ type: "LOGIN_FAILURE", payload: error.response.data });
    errorToast(error.response.data)
  }
}