import React from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  IconButton,
  Typography,
  Box,
  Divider,
} from "@mui/material";

import { useDispatch } from "react-redux";
import {
  setActiveAccountId,
  setActiveUserId,
} from "../../store/actionCreators/modalAC";
import { deleteAccount } from "../../store/actionCreators/customerAC";

import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";

const CustomerElement = ({
  customer,
  handleOpenModal,
  setSubmitName,
  setModalFields,
}) => {
  const { id, name, email, age, accounts } = customer;

  const dispatch = useDispatch();

  const handleDeposit = (accountId) => {
    dispatch(setActiveAccountId(accountId));
    const text = "Enter deposit amount";
    const fields = [{ name: "deposit", label: "Deposit" }];
    setModalFields(fields);
    handleOpenModal(text, accountId);
    setSubmitName("deposit");
  };

  const handleWithdraw = (accountId) => {
    dispatch(setActiveAccountId(accountId));
    const text = "Enter withdraw amount";
    const fields = [{ name: "withdraw", label: "Withdraw" }];
    setModalFields(fields);
    handleOpenModal(text, accountId);
    setSubmitName("withdraw");
  };

  const handleAddAccount = () => {
    dispatch(setActiveUserId(id));
    const text = "Enter account initial details";
    const availableCurrencies = ["USD", "EUR", "UAH", "CHF", "GBP"];
    const fields = [
      {
        name: "currency",
        initialValue: "USD",
        label: "Currency",
        type: "select",
        options: availableCurrencies,
      },
      { name: "balance", label: "Balance" },
    ];
    setModalFields(fields);
    handleOpenModal(text, id);
    setSubmitName("add account");
  };

  const handleTransfer = (accountNumber) => {
    dispatch(setActiveAccountId(accountNumber));
    const text = "Enter number of account to transfer money to";
    const fields = [
      { name: "transferTo", label: "TransferTo" },
      { name: "amount", label: "Amount" },
    ];
    setModalFields(fields);
    handleOpenModal(text, accountNumber);
    setSubmitName("transfer");
  };

  const handleDeleteCustomer = () => {
    dispatch(setActiveUserId(id));
    const text = "Are you sure you want to delete this customer?";
    handleOpenModal(text, id);
    setSubmitName("delete customer");
  };

  const handleUpdateCustomer = () => {
    dispatch(setActiveUserId(id));
    const text = "Enter new customer details";
    const fields = [
      { name: "name", label: "Name", initialValue: name },
      { name: "email", label: "Email", initialValue: email },
      { name: "age", label: "Age", initialValue: age },
    ];
    setModalFields(fields);
    handleOpenModal(text, id);
    setSubmitName("update customer");
  };

  return (
    <div>
      <Box display="flex" justifyContent="space-between" mb={1}>
        <Box>
          <Typography>
            Customer: <strong>{name}</strong>
          </Typography>
          <Typography>Email: {email}</Typography>
          <Typography>Age: {age}</Typography>
        </Box>
        <Box display="flex" gap={1}>
          <Button
            onClick={handleAddAccount}
            variant="outlined"
            sx={{ height: "35px" }}>
            Add account
          </Button>

          <Button
            onClick={handleUpdateCustomer}
            variant="contained"
            color="warning"
            sx={{ height: "35px" }}>
            CHANGE
          </Button>
          <Button
            onClick={handleDeleteCustomer}
            variant="contained"
            color="error"
            sx={{ height: "35px" }}>
            DELETE
          </Button>
        </Box>
      </Box>
      <Typography variant="h6">Accounts:</Typography>
      <Divider />
      {accounts.length > 0 ? (
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Number</TableCell>
              <TableCell>Currency</TableCell>
              <TableCell>Balance</TableCell>
              <TableCell>Deposit</TableCell>
              <TableCell>Withdraw</TableCell>
              <TableCell>Transfer</TableCell>
              <TableCell>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {accounts.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.number}</TableCell>
                <TableCell>{row.currency}</TableCell>
                <TableCell>{row.balance.toFixed(2)}</TableCell>
                <TableCell>
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => handleDeposit(row.id)}>
                    <AddCircleIcon color="success" />
                  </IconButton>
                </TableCell>
                <TableCell>
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => handleWithdraw(row.id)}>
                    <RemoveCircleIcon color="error" />
                  </IconButton>
                </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={() => handleTransfer(row.number)}>
                    Transfer
                  </Button>
                </TableCell>
                <TableCell>
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => dispatch(deleteAccount(id, row.id))}>
                    <DeleteForeverIcon color="error" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <Typography>The customer has no accounts yet.</Typography>
      )}
    </div>
  );
};

export default CustomerElement;
