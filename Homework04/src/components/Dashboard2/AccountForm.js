import React, { useState } from "react";
import { TextField, Button } from "@mui/material";

const AccountForm = ({ customerId, onAddAccount }) => {
  const [accountName, setAccountName] = useState("");
  const [initialBalance, setInitialBalance] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddAccount(customerId, {
      name: accountName,
      balance: parseFloat(initialBalance),
    });
    setAccountName("");
    setInitialBalance("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Account Name"
        value={accountName}
        onChange={(e) => setAccountName(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Initial Balance"
        type="number"
        value={initialBalance}
        onChange={(e) => setInitialBalance(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button type="submit" variant="contained" color="primary">
        Add Account
      </Button>
    </form>
  );
};

export default AccountForm;
