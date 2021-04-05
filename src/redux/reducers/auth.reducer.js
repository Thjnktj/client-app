import { authConstants } from "../actions/constants";

const token = window.localStorage.getItem("token");
const user = window.localStorage.getItem("user");

const initState = {
  token: token ? token : null,
  user: user ? JSON.parse(user.toString()) : {},
  authenticate: token ? true : false,
  authenticating: false,
  loading: false,
  message: "",
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case authConstants.SIGNIN_SUCCESS:
      state = {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        message: action.payload.message ? action.payload.message : "",
        authenticate: true,
        authenticating: false,
      };
      break;
    case authConstants.SIGNUP_SUCCESS:
      state = {
        token: null,
        user: {},
        authenticate: false,
        authenticating: false,
        loading: false,
        message: "",
      };
      break;
    case authConstants.UPDATE_USER_SUCCESS:
      const {
        firstName,
        lastName,
        phone,
        address,
        email,
      } = action.payload.user;
      state = {
        ...state,
        user: {
          ...state.user,
          fullName: `${firstName} ${lastName}`,
          phone,
          address,
          email,
          firstName,
          lastName,
        },
      };
      break;
    default:
      return state;
  }
  return state;
};

export default reducer;
