import {
  OPEN_SUCCESS_SNACK_BAR,
  OPEN_ERROR_SNACK_BAR,
} from "../actions/snackBarActions";

const initialValues = {
  isSnackBarOpen: false,
  severity: "error",
  message: "",
};

const snackBarReducer = (state = initialValues, { type, payload } = {}) => {
  switch (type) {
    case OPEN_SUCCESS_SNACK_BAR:
      return {
        ...state,
        severity: "success",
        isSnackBarOpen: true,
        message: payload,
      };
    case OPEN_ERROR_SNACK_BAR:
      return {
        ...state,
        severity: "error",
        isSnackBarOpen: true,
        message: payload,
      };
    case "CLOSE_SNACK_BAR":
      return {
        ...state,
        isSnackBarOpen: false,
      };

    default:
      return state;
  }
};

export default snackBarReducer;
