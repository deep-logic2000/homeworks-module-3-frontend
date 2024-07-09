import { loginApi } from "../../api/api";

import {
  SET_LOGED_IN,
  SET_ACCESS_TOKEN,
  SET_REFRESH_TOKEN,
} from "../actions/authActions";

import { openErrorSnackBar } from "./snackBarAC";

export const setLoggedIn = () => ({ type: SET_LOGED_IN, payload: true });
export const setLoggedOut = () => ({ type: SET_LOGED_IN, payload: false });

export const setAccessToken = (token) => ({
  type: SET_ACCESS_TOKEN,
  payload: token,
});
export const setRefreshToken = (token) => ({
  type: SET_REFRESH_TOKEN,
  payload: token,
});

export const handleLogIn = (credentials, navigate) => async (dispatch) => {
  await loginApi(credentials)
    .then((rsp) => {
      if (rsp.status === 200) {
        dispatch(setLoggedIn());
        dispatch(setAccessToken(rsp.data.accessToken));
        dispatch(setRefreshToken(rsp.data.refreshToken));
        navigate("/");
        // dispatch(getAllCustomersPageble(0, 10));
      }
    })
    .catch((err) => {
      dispatch(openErrorSnackBar(err.response.data.message));
      dispatch(setLoggedOut());
    });
};
