import {
  SET_LOGED_IN,
  SET_ACCESS_TOKEN,
  SET_REFRESH_TOKEN,
} from "../actions/authActions";

const initialState = {
  isLoggedIn: false,
  accessToken: null,
  refreshToken: null,
};

const authReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_LOGED_IN:
      return {
        ...state,
        isLoggedIn: payload,
      };

    case SET_ACCESS_TOKEN:
      return {
        ...state,
        accessToken: payload,
      };

      case SET_REFRESH_TOKEN:
        return {
          ...state,
          refreshToken: payload,
        };

    default:
      return state;
  }
};

export default authReducer;
