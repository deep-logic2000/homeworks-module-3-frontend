import React, { useState } from "react";
import {
  TextField,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";

const TransferForm = ({ customers, onTransferMoney }) => {
  const [fromCustomer, setFromCustomer] = useState("");
  const [fromAccount, setFromAccount] = useState("");
  const [toCustomer, setToCustomer] = useState("");
  const [toAccount, setToAccount] = useState("");
  const [amount, setAmount] = useState("");

  const handleTransfer = (e) => {
    e.preventDefault();
    onTransferMoney(
      fromCustomer,
      fromAccount,
      toCustomer,
      toAccount,
      parseFloat(amount)
    );
    setFromCustomer("");
    setFromAccount("");
    setToCustomer("");
    setToAccount("");
    setAmount("");
  };

  const handleCustomerChange = (setCustomer, setAccount) => (e) => {
    setCustomer(e.target.value);
    setAccount("");
  };

  const findCustomerAccounts = (customerId) => {
    const customer = customers.find((c) => c.id === customerId);
    return customer ? customer.accounts : [];
  };

  return (
    <form onSubmit={handleTransfer}>
      <FormControl fullWidth margin="normal">
        <InputLabel>From Customer</InputLabel>
        <Select
          value={fromCustomer}
          onChange={handleCustomerChange(setFromCustomer, setFromAccount)}>
          {customers.map((customer) => (
            <MenuItem key={customer.id} value={customer.id}>
              {customer.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth margin="normal">
        <InputLabel>From Account</InputLabel>
        <Select
          value={fromAccount}
          onChange={(e) => setFromAccount(e.target.value)}
          disabled={!fromCustomer}>
          {findCustomerAccounts(fromCustomer).map((account) => (
            <MenuItem key={account.id} value={account.id}>
              {account.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth margin="normal">
        <InputLabel>To Customer</InputLabel>
        <Select
          value={toCustomer}
          onChange={handleCustomerChange(setToCustomer, setToAccount)}>
          {customers.map((customer) => (
            <MenuItem key={customer.id} value={customer.id}>
              {customer.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth margin="normal">
        <InputLabel>To Account</InputLabel>
        <Select
          value={toAccount}
          onChange={(e) => setToAccount(e.target.value)}
          disabled={!toCustomer}>
          {findCustomerAccounts(toCustomer).map((account) => (
            <MenuItem key={account.id} value={account.id}>
              {account.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <TextField
        label="Amount"
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        fullWidth
        margin="normal"
      />

      <Button type="submit" variant="contained" color="primary">
        Transfer
      </Button>
    </form>
  );
};

export default TransferForm;
