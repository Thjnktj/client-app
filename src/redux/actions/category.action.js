import axiosClient from "../../api/axiosClient";
import { categoryConstants } from "./constants";

export const getAllCategory = () => {
  return async (dispatch) => {
    dispatch({ type: categoryConstants.GET_ALL_REQUEST });
    const res = await axiosClient.get("/category/");
    if (res.status === 200) {
      const { categories } = res.data;
      dispatch({
        type: categoryConstants.GET_ALL_SUCCESS,
        payload: { categories: categories },
      });
    } else {
      dispatch({
        type: categoryConstants.GET_ALL_FAILURE,
        payload: { error: res.data.error },
      });
    }
  };
};
