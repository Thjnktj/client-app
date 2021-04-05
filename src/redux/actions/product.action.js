import axiosClient from "../../api/axiosClient";
import { productConstants } from "./constants";

export const getAllData = () => {
  return async (dispatch) => {
    dispatch({ type: productConstants.GET_ALL_DATA_REQUEST });
    const res = await axiosClient.get("/product/");
    if (res.status === 200) {
      const { products, cheap, midrange, luxury } = res.data;
      const find = { cheap, midrange, luxury };
      dispatch({
        type: productConstants.GET_ALL_DATA_SUCCESS,
        payload: { products, find },
      });
    }
  };
};

export const getProductBySlug = (slug) => {
  return async (dispatch) => {
    const res = await axiosClient.get(`/product/${slug}`);
    if (res.status === 200) {
      const { products } = res.data;
      dispatch({
        type: productConstants.GET_SLUG_SUCCESS,
        payload: { productBySlug: products },
      });
    }
  };
};

export const findProductByPrice = (params) => {
  return async (dispatch) => {
    const slug = params.split("/")[2].split("?")[0];
    const find = params.split("/")[2].split("?")[1];
    const q = find.split("&");
    let h = [];
    for (let i of q) {
      let a = i.split("=");
      let e = `$${a[0].split("_")[1]}`;
      let n = +a[1];
      h.push({ price: { [e]: n } });
    }

    let result = h[1]
      ? { price: h[0].price, price1: h[1].price }
      : { price: h[0].price };
    const query = { slug, result };
    console.log(query);
  };
};
