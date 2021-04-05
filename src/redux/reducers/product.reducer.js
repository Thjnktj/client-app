import { productConstants } from "../actions/constants";

const initialState = {
  products: [],
  find: [],
  productBySlug: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case productConstants.GET_ALL_DATA_SUCCESS:
      state = {
        ...state,
        products: action.payload.products,
        find: action.payload.find,
      };
      break;
    case productConstants.GET_SLUG_SUCCESS:
      state = {
        ...state,
        productBySlug: action.payload.productBySlug,
      };
      break;
    default:
      return state;
  }
  return state;
};

export default reducer;
