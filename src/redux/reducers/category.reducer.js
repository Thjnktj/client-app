import { categoryConstants } from "../actions/constants";

const initState = {
  categories: [],
  loading: false,
  error: null,
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case categoryConstants.GET_ALL_SUCCESS:
      state = {
        ...state,
        categories: action.payload.categories,
      };
      break;
    default:
      return state;
  }
  return state;
};

export default reducer;
