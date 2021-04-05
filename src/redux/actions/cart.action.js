import axiosClient from "../../api/axiosClient";
import { cartConstants } from "./constants";

export const getCart = () => {
  return async (dispatch) => {
    dispatch({ type: cartConstants.GET_CART_REQUEST });
    const res = await axiosClient.get("/cart");
    if (res.status === 200) {
      const { basketNumber, products, cartCost } = res.data.carts;
      dispatch({
        type: cartConstants.GET_CART_SUCCESS,
        payload: { basketNumber, products, cartCost },
      });
    } else {
      if (res.status === 400) {
        dispatch({ type: cartConstants.REMOVE_CART_SUCCESS });
      }
    }
  };
};

export const addBasket = (product) => {
  return async (dispatch) => {
    const token = window.localStorage.getItem("token");
    if (token) {
      const cartItems = { product: product._id, quantity: 1 };
      const res = await axiosClient.post("/cart", { cartItems });
      if (res.status === 201) {
        return true;
      }
    } else {
      dispatch({
        type: cartConstants.ADD_PRODUCT_BASKET,
        payload: { product },
      });
      return false;
    }
  };
};

export const productQuantity = (action, name) => {
  return async (dispatch) => {
    const token = window.localStorage.getItem("token");
    if (token) {
      const prod = { product: name };
      action === "increase" ? (prod.quantity = 1) : (prod.quantity = -1);
      const res = await axiosClient.post("/cart", { cartItems: prod });
      if (res.status === 201) {
        return true;
      }
    } else {
      dispatch({
        type:
          action === "increase"
            ? cartConstants.INCREASE_QUANTITY
            : cartConstants.DECREASE_QUANTITY,
        payload: { name },
      });
      return false;
    }
  };
};

export const clearProduct = (name) => {
  return async (dispatch) => {
    const token = window.localStorage.getItem("token");
    if (token) {
      const res = await axiosClient.post("/cart", {
        cartItems: { product: name._id, quantity: -name.numbers },
      });
      if (res.status === 201) {
        return true;
      }
    } else {
      dispatch({
        type: cartConstants.CLEAR_PRODUCT,
        payload: { name: name._id },
      });
      return false;
    }
  };
};

export const checkOut = () => {
  return async (dispatch) => {
    const res = await axiosClient.post("/order");
    if (res.status === 201) {
      dispatch({ type: cartConstants.REMOVE_CART_SUCCESS });
      return true;
    }
  };
};
