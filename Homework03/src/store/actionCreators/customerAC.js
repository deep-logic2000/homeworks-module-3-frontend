import {
  SET_CUSTOMERS,
  ADD_CUSTOMER,
  UPDATE_ACCOUNT,
  UPDATE_CUSTOMER,
  DELETE_CUSTOMER,
  ADD_ACCOUNT_TO_CUSTOMER,
  DELETE_ACCOUNT_FROM_CUSTOMER,
  SET_ACTIVE_PAGE,
  SET_PAGE_SIZE,
  SET_TOTAL_ELEMENTS,
} from "../actions/customerActions";
import {
  getAllCustomersApi,
  getAllCustomersApiPageble,
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
import { closeModal } from "./modalAC";

// export const setLoggedIn = () => ({ type: SET_LOG_IN, payload: true });
// export const setLoggedOut = () => ({ type: SET_LOG_OUT, payload: false });

// export const getAllCustomers = () => async (dispatch) => {
//   await getAllCustomersApi()
//     .then((rsp) => {
//       if (rsp.status === 200) {
//         dispatch({ type: SET_CUSTOMERS, payload: rsp.data });
//       }
//     })
//     .catch((err) => {
//       dispatch(openErrorSnackBar("Error during fetching customers!"));
//     });
// };

export const getAllCustomersPageble = (page, pageSize) => async (dispatch) => {
  await getAllCustomersApiPageble(page, pageSize)
    .then((rsp) => {
      if (rsp.status === 200) {
        dispatch({ type: SET_CUSTOMERS, payload: rsp.data[0] });
        dispatch({ type: SET_TOTAL_ELEMENTS, payload: rsp.data[1] });
      }
    })
    .catch((err) => {
      dispatch(openErrorSnackBar("Error during fetching customers!"));
    });
};

export const createCustomer =
  (name, email, age, password, phoneNumber, resolve) =>
  async (dispatch, getState) => {
    if (!name || !email || !age || !password || !phoneNumber) {
      dispatch(openErrorSnackBar("Please fill all fields!"));
      return;
    }
    if (!Number.isInteger(Number(age)) || isNaN(Number(age))) {
      dispatch(openErrorSnackBar("Age must be a number!"));
      return;
    }
    if (Number(age) < 0 || Number(age) > 150) {
      dispatch(openErrorSnackBar("Age must be between 0 and 150!"));
      return;
    }

    const regExEmail = new RegExp("^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$");
    const regExPhone = new RegExp("^(\\+\\d{1,3}( )?)?\\d{10}$");

    if (email.length < 5 || !regExEmail.test(email)) {
      dispatch(openErrorSnackBar("Invalid email!"));
      return;
    }

    if (!regExPhone.test(phoneNumber)) {
      dispatch(
        openErrorSnackBar(
          "Invalid phone! Please enter phone number in format +1234567890!"
        )
      );
      return;
    }

    const currentPage = getState().customers.currentPage;
    const pageSize = getState().customers.pageSize;
    await createCustomerApi(name, email, age, password, phoneNumber)
      .then((rsp) => {
        if (rsp.status === 200) {
          console.log("response in createCustomerApi:", rsp);
          const newCustomer = rsp.data;
          dispatch({
            type: ADD_CUSTOMER,
            payload: newCustomer,
          });

          dispatch(openSuccessSnackBar("Customer created!"));
          dispatch(getAllCustomersPageble(currentPage, pageSize));
          resolve();
        }
      })
      .catch((err) => {
        console.log("error:", err);
        dispatch(openErrorSnackBar(err.response.data.errors[0].defaultMessage));
      });
  };

export const deleteCustomer =
  (customerId, resolve) => async (dispatch, getState) => {
    await deleteCustomerApi(customerId)
      .then((rsp) => {
        if (rsp.status === 200) {
          dispatch({
            type: DELETE_CUSTOMER,
            payload: customerId,
          });

          dispatch(openSuccessSnackBar("Customer deleted successfully!"));
          const currentPage = getState().customer.currentPage;
          const pageSize = getState().customers.pageSize;
          dispatch(getAllCustomersPageble(currentPage, pageSize));
          resolve();
        }
      })
      .catch((err) => {
        dispatch(openErrorSnackBar(err.response.data));
      });
  };

export const updateCustomer =
  (customerId, newData, resolve) => async (dispatch) => {
    const { name, email, age } = newData;
    if (!name || !email || !age) {
      dispatch(openErrorSnackBar("Please fill all fields!"));
      return;
    }
    if (
      !Number.isInteger(Number(age)) ||
      isNaN(Number(age) || Number(age) < 0)
    ) {
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

          console.log("response in updateCustomerApi:", rsp.data);

          dispatch(openSuccessSnackBar("Customer updated successfully!"));
          resolve();
        }
      })
      .catch((err) => {
        dispatch(openErrorSnackBar(err.response.data));
      });
  };

export const depositToAccount =
  (accountId, depositAmount, resolve) => async (dispatch) => {
    await depositToAccountApi(accountId, depositAmount)
      .then((rsp) => {
        if (rsp.status === 200) {
          const updatedAccount = rsp.data;
          dispatch({ type: UPDATE_ACCOUNT, payload: updatedAccount });
        }
        dispatch(openSuccessSnackBar("Money was deposited successfully!"));
        resolve();
      })
      .catch((err) => {
        dispatch(openErrorSnackBar(err.response.data));
      });
  };

export const withdrawFromAccount =
  (accountId, withdrawAmount, resolve) => async (dispatch) => {
    await withdrawFromAccountApi(accountId, withdrawAmount)
      .then((rsp) => {
        if (rsp.status === 200) {
          const updatedAccount = rsp.data;
          dispatch({ type: UPDATE_ACCOUNT, payload: updatedAccount });
        }
        dispatch(openSuccessSnackBar("Money was withdrawn successfully!"));
        resolve();
      })
      .catch((err) => {
        dispatch(openErrorSnackBar(err.response.data));
      });
  };

export const transferMoney =
  (fromAccountNumber, toAccountNumber, amount, resolve) => async (dispatch) => {
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
        resolve();
      })
      .catch((err) => {
        dispatch(openErrorSnackBar(err.response.data));
      });
  };

export const addAccountToUser = (userId, data, resolve) => async (dispatch) => {
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
      resolve();
    })
    .catch((err) => {
      dispatch(openErrorSnackBar(err.response.data.message));
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

export const setActivePage = (page) => {
  return {
    type: SET_ACTIVE_PAGE,
    payload: page,
  };
};

export const setPageSize = (pageSize) => {
  return {
    type: SET_PAGE_SIZE,
    payload: pageSize,
  };
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
