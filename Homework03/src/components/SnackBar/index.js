import React, { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";

import { closeSnackBar } from "../../store/actionCreators/snackBarAC";

import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function SnackbarComponent() {
  const { isSnackBarOpen, severity, message } = useSelector(
    (state) => state.snackBar
  );
  const dispatch = useDispatch();

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch(closeSnackBar());
  };

  useEffect(() => {
    if (isSnackBarOpen) {
      setTimeout(() => {
        dispatch(closeSnackBar());
      }, 3000);
    }
  }, [isSnackBarOpen, dispatch]);

  return (
    <div>
      <Snackbar
        open={isSnackBarOpen}
        autoHideDuration={3000}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        style={{ top: "70px" }}>
        <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}
