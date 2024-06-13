import {
  SET_CUSTOMERS,
  ADD_CUSTOMER,
  UPDATE_ACCOUNT,
  UPDATE_CUSTOMER,
  DELETE_CUSTOMER,
  ADD_ACCOUNT_TO_CUSTOMER,
  DELETE_ACCOUNT_FROM_CUSTOMER,
} from "../actions/customerActions";
import {
  getAllCustomersApi,
  createCustomerApi,
  updateCustomerApi,
  deleteCustomerApi,
  depositToAccountApi,
  withdrawFromAccountApi,
  addAccountToUserApi,
  deleteAccountApi,
  transferMoneyApi,
} from "../../api/api";

import { openSuccessSnackBar, openErrorSnackBar } from "./snackBarAC";

// export const setLoggedIn = () => ({ type: SET_LOG_IN, payload: true });
// export const setLoggedOut = () => ({ type: SET_LOG_OUT, payload: false });

export const getAllCustomers = () => async (dispatch) => {
  await getAllCustomersApi()
    .then((rsp) => {
      if (rsp.status === 200) {
        dispatch({ type: SET_CUSTOMERS, payload: rsp.data });
      }
    })
    .catch((err) => {
      dispatch(openErrorSnackBar("Error during fetching customers!"));
    });
};

export const createCustomer = (name, email, age) => async (dispatch) => {
  if (!name || !email || !age || Number(age) < 0 || Number(age) > 150) {
    dispatch(openErrorSnackBar("Please fill all fields!"));
    return;
  }
  if (!Number.isInteger(Number(age)) || isNaN(Number(age) || Number(age) < 0)) {
    dispatch(openErrorSnackBar("Age must be a number!"));
    return;
  }

  if (email.length < 5 || email.indexOf("@") === -1) {
    dispatch(openErrorSnackBar("Invalid email!"));
    return;
  }

  await createCustomerApi(name, email, age)
    .then((rsp) => {
      if (rsp.status === 200) {
        const newCustomer = rsp.data;
        dispatch({
          type: ADD_CUSTOMER,
          payload: newCustomer,
        });

        dispatch(openSuccessSnackBar("Customer created!"));
      }
    })
    .catch((err) => {
      dispatch(openErrorSnackBar(err.response.data));
    });
};

export const deleteCustomer = (customerId) => async (dispatch) => {
  await deleteCustomerApi(customerId)
    .then((rsp) => {
      if (rsp.status === 200) {
        dispatch({
          type: DELETE_CUSTOMER,
          payload: customerId,
        });

        dispatch(openSuccessSnackBar("Customer deleted successfully!"));
      }
    })
    .catch((err) => {
      dispatch(openErrorSnackBar(err.response.data));
    });
};

export const updateCustomer = (customerId, newData) => async (dispatch) => {
  const { name, email, age } = newData;
  if (!name || !email || !age) {
    dispatch(openErrorSnackBar("Please fill all fields!"));
    return;
  }
  if (!Number.isInteger(Number(age)) || isNaN(Number(age) || Number(age) < 0)) {
    dispatch(openErrorSnackBar("Age must be a number!"));
    return;
  }

  if (age < 0 || age > 150) {
    dispatch(openErrorSnackBar("Enter correct age!"));
    return;
  }

  if (email.length < 5 || email.indexOf("@") === -1) {
    dispatch(openErrorSnackBar("Invalid email!"));
    return;
  }
  await updateCustomerApi(customerId, newData)
    .then((rsp) => {
      if (rsp.status === 200) {
        dispatch({
          type: UPDATE_CUSTOMER,
          payload: rsp.data,
        });

        dispatch(openSuccessSnackBar("Customer updated successfully!"));
      }
    })
    .catch((err) => {
      dispatch(openErrorSnackBar(err.response.data));
    });
};

export const depositToAccount =
  (accountId, depositAmount) => async (dispatch) => {
    await depositToAccountApi(accountId, depositAmount)
      .then((rsp) => {
        if (rsp.status === 200) {
          const updatedAccount = rsp.data;
          dispatch({ type: UPDATE_ACCOUNT, payload: updatedAccount });
        }
        dispatch(openSuccessSnackBar("Money was deposited successfully!"));
      })
      .catch((err) => {
        dispatch(openErrorSnackBar(err.response.data));
      });
  };

export const withdrawFromAccount =
  (accountId, withdrawAmount) => async (dispatch) => {
    await withdrawFromAccountApi(accountId, withdrawAmount)
      .then((rsp) => {
        if (rsp.status === 200) {
          const updatedAccount = rsp.data;
          dispatch({ type: UPDATE_ACCOUNT, payload: updatedAccount });
        }
        dispatch(openSuccessSnackBar("Money was withdrawn successfully!"));
      })
      .catch((err) => {
        dispatch(openErrorSnackBar(err.response.data));
      });
  };

export const transferMoney =
  (fromAccountNumber, toAccountNumber, amount) => async (dispatch) => {
    await transferMoneyApi(fromAccountNumber, toAccountNumber, amount)
      .then((rsp) => {
        console.log("response:", rsp);
        if (rsp.status === 200) {
          const updatedAccounts = rsp.data;
          for (let i = 0; i < updatedAccounts.length; i++) {
            dispatch({ type: UPDATE_ACCOUNT, payload: updatedAccounts[i] });
          }
        }
        dispatch(openSuccessSnackBar("Money was transferred successfully!"));
      })
      .catch((err) => {
        dispatch(openErrorSnackBar(err.response.data));
      });
  };

export const addAccountToUser = (userId, data) => async (dispatch) => {
  await addAccountToUserApi(userId, data)
    .then((rsp) => {
      if (rsp.status === 200) {
        const newAccount = rsp.data;
        dispatch({
          type: ADD_ACCOUNT_TO_CUSTOMER,
          payload: { userId, newAccount },
        });
      }
      dispatch(openSuccessSnackBar("Account was added successfully!"));
    })
    .catch((err) => {
      console.log("error:", err.response.data);
      dispatch(openErrorSnackBar(err.response.data));
    });
};

export const deleteAccount = (customerId, accountId) => async (dispatch) => {
  await deleteAccountApi(customerId, accountId)
    .then((rsp) => {
      if (rsp.status === 200) {
        dispatch({
          type: DELETE_ACCOUNT_FROM_CUSTOMER,
          payload: { customerId, accountId },
        });
      }
      dispatch(openSuccessSnackBar("Account was deleted successfully!"));
    })
    .catch((err) => {
      dispatch(openErrorSnackBar(err.response.data));
    });
};

// export const setLoggedOut = () => ({ type: SET_LOG_OUT, payload: false });

// export const handleLogIn = (credentials, resolve) => async (dispatch) => {
//   if (
//     credentials.username === userValidData.username &&
//     credentials.password === userValidData.password
//   ) {
//     localStorage.setItem("isLoggedInEmailService", "true");
//     resolve();
//     dispatch(setLoggedIn());
//     dispatch(getCurrentUser());
//   } else {
//     dispatch(setLoggedOut());
//   }
// };

// export const createUser = (userData, resolve) => async (dispatch) => {
//   await createUserApi(userData)
//     .then((rsp) => {
//       if (rsp.status === 200 || rsp.status === 201) {
//         dispatch(getCurrentUser());
//         dispatch(getAllEmails());
//         resolve();
//       }
//     })
//     .catch((err) => {
//       dispatch(addNewError(err));
//     });
// };
