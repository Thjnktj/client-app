import axios from "../../api/axiosClient";
import { authConstants, cartConstants } from "./constants";

export const login = (user) => {
  return async (dispatch) => {
    const res = await axios.post("/auth/signin", user);

    if (res.status === 200) {
      const { token, user, message } = res.data;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      dispatch({
        type: authConstants.SIGNIN_SUCCESS,
        payload: {
          token,
          user,
          message,
        },
      });
      return true;
    } else {
      if (res.status === 400) {
        dispatch({
          type: authConstants.SIGNIN_FAILURE,
          payload: {
            error: res.data.error,
          },
        });
        return false;
      }
    }
  };
};

export const logout = (user) => {
  return async (dispatch) => {
    const res = await axios.post("/auth/signup", user);
    if (res.status === 201) {
      return true;
    }
  };
};

export const isLogin = () => {
  return async (dispatch) => {
    window.localStorage.clear();
    dispatch({ type: authConstants.SIGNUP_SUCCESS });
    dispatch({ type: cartConstants.REMOVE_CART_SUCCESS });
  };
};

export const isUserLogin = () => {
  return async (dispatch) => {
    const token = localStorage.getItem("token");
    if (token) {
      const user = JSON.parse(localStorage.getItem("user"));
      dispatch({
        type: authConstants.SIGNIN_SUCCESS,
        payload: {
          token,
          user,
        },
      });
    } else {
      dispatch({
        type: authConstants.SIGNIN_FAILURE,
        payload: {
          error: "Khách vãn lai",
        },
      });
    }
  };
};

export const updateUser = (user) => {
  return async (dispatch) => {
    const res = await axios.post("/auth/user", user);
    if (res.status === 201) {
      dispatch({
        type: authConstants.UPDATE_USER_SUCCESS,
        payload: { user },
      });
      return true;
    }
  };
};
