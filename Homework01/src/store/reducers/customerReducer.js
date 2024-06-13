import {
  SET_CUSTOMERS,
  ADD_CUSTOMER,
  UPDATE_ACCOUNT,
  UPDATE_CUSTOMER,
  DELETE_CUSTOMER,
  ADD_ACCOUNT_TO_CUSTOMER,
  DELETE_ACCOUNT_FROM_CUSTOMER,
  SET_ACTIVE_CUSTOMER,
} from "../actions/customerActions";

const initialValues = {
  customers: [],
  activeCustomer: {},
};

const userReducer = (state = initialValues, { type, payload } = {}) => {
  switch (type) {
    case SET_CUSTOMERS:
      return {
        ...state,
        customers: payload,
      };
    case SET_ACTIVE_CUSTOMER:
      return {
        ...state,
        activeCustomer: payload,
      };
    case ADD_CUSTOMER:
      return {
        ...state,
        customers: [...state.customers, payload],
      };
    case UPDATE_CUSTOMER:
      const updatedCustomer = payload;
      return {
        ...state,
        customers: state.customers.map((customer) =>
          customer.id === updatedCustomer.id ? updatedCustomer : customer
        ),
      };
    case DELETE_CUSTOMER:
      return {
        ...state,
        customers: state.customers.filter(
          (customer) => customer.id !== payload
        ),
      };
    case UPDATE_ACCOUNT:
      const updatedAccount = payload;
      return {
        ...state,
        customers: state.customers.map((customer) => ({
          ...customer,
          accounts: customer.accounts.map((account) =>
            account.id === updatedAccount.id
              ? { ...account, ...updatedAccount }
              : account
          ),
        })),
      };

    case ADD_ACCOUNT_TO_CUSTOMER:
      const { userId, newAccount } = payload;
      return {
        ...state,
        customers: state.customers.map((customer) => ({
          ...customer,
          accounts:
            customer.id === userId
              ? [...customer.accounts, newAccount]
              : [...customer.accounts],
        })),
      };

    case DELETE_ACCOUNT_FROM_CUSTOMER:
      const { accountId } = payload;
      return {
        ...state,
        customers: state.customers.map((customer) => ({
          ...customer,
          accounts: customer.accounts.filter((acc) => acc.id !== accountId),
        })),
      };

    default:
      return state;
  }
};

export default userReducer;
