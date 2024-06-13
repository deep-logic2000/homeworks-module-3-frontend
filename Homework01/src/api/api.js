import axios from "axios";

const BASE_URL = "http://localhost:9000";

// const credentials = `${USERNAME}:${PASSWORD}`;
// const base64Credentials = btoa(credentials);

export const getAllCustomersApi = () => {
  return axios.get(`${BASE_URL}/customers`, {
    headers: {
      //   Authorization: `Basic ${base64Credentials}`,
      "Content-Type": "application/json",
    },
  });
};

export const createCustomerApi = (name, email, age) => {
  const requestBody = { name, email, age };
  return axios.post(`${BASE_URL}/customers`, requestBody, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const updateCustomerApi = (customerId, newData) => {
  return axios.put(`${BASE_URL}/customers/${customerId}`, newData, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const deleteCustomerApi = (customerId) => {
  return axios.delete(`${BASE_URL}/customers/${customerId}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const depositToAccountApi = (accountId, depositAmount) => {
  const requestBody = { deposit: depositAmount };
  return axios.post(`${BASE_URL}/accounts/${accountId}/deposit`, requestBody, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const withdrawFromAccountApi = (accountId, withdrawAmount) => {
  return axios.post(
    `${BASE_URL}/accounts/${accountId}/withdraw`,
    withdrawAmount,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};

export const addAccountToUserApi = (customerId, data) => {
  const requestBody = data;
  return axios.post(
    `${BASE_URL}/customers/${customerId}/accounts`,
    requestBody,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};

export const deleteAccountApi = (customerId, accountId) => {
  return axios.delete(
    `${BASE_URL}/customers/${customerId}/accounts/${accountId}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};

export const transferMoneyApi = (
  fromAccountNumber,
  toAccountNumber,
  amount
) => {
  return axios.patch(
    `${BASE_URL}/accounts/transfer?fromAccountNumber=${fromAccountNumber}&toAccountNumber=${toAccountNumber}`,
    amount,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};

// export const createUserApi = (userData) => {
//   return axios.post(`${BASE_URL}/users/`, userData, {
//     headers: {
//       "Content-Type": "application/json",
//     },
//   });
// };
