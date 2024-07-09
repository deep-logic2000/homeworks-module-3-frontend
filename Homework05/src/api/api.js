import axiosInstance from "./axiosInstance";

export const getAllCustomersApi = () => {
  return axiosInstance.get("/customers");
};

export const getAllCustomersApiPageble = (page, pageSize) => {
  return axiosInstance.get(`/customers?size=${pageSize}&pageNumber=${page}`);
};

export const createCustomerApi = (name, email, age, password, phoneNumber) => {
  const requestBody = { name, email, age, password, phoneNumber };
  return axiosInstance.post("/customers", requestBody);
};

export const updateCustomerApi = (customerId, newData) => {
  return axiosInstance.put(`/customers/${customerId}`, newData);
};

export const deleteCustomerApi = (customerId) => {
  return axiosInstance.delete(`/customers/${customerId}`);
};

export const depositToAccountApi = (accountId, depositAmount) => {
  const requestBody = { deposit: depositAmount };
  return axiosInstance.post(`/accounts/${accountId}/deposit`, requestBody);
};

export const withdrawFromAccountApi = (accountId, withdrawAmount) => {
  return axiosInstance.post(`/accounts/${accountId}/withdraw`, withdrawAmount);
};

export const addAccountToUserApi = (customerId, data) => {
  const requestBody = data;
  return axiosInstance.post(`/customers/${customerId}/accounts`, requestBody);
};

export const deleteAccountApi = (customerId, accountId) => {
  return axiosInstance.delete(`/customers/${customerId}/accounts/${accountId}`);
};

export const transferMoneyApi = (
  fromAccountNumber,
  toAccountNumber,
  amount
) => {
  const requestBody = amount;
  return axiosInstance.patch(
    `/accounts/transfer?fromAccountNumber=${fromAccountNumber}&toAccountNumber=${toAccountNumber}`,
    requestBody
  );
};

export const loginApi = (userCredentials) => {
  return axiosInstance.post("/api/auth/login", userCredentials);
};
