import {
  OPEN_SUCCESS_SNACK_BAR,
  OPEN_ERROR_SNACK_BAR,
  CLOSE_SNACK_BAR,
} from "../actions/snackBarActions";

export const openSuccessSnackBar = (message) => ({
  type: OPEN_SUCCESS_SNACK_BAR,
  payload: message,
});

export const openErrorSnackBar = (message) => ({
  type: OPEN_ERROR_SNACK_BAR,
  payload: message,
});

export const closeSnackBar = () => ({
  type: CLOSE_SNACK_BAR,
});
