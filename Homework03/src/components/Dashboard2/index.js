import React, { useState } from "react";
import { Container, Grid, Typography, Button, Box } from "@mui/material";
import CustomerList from "./CustomerList";
import CustomerForm from "./CustomerForm";
import AccountForm from "./AccountForm";
import TransferForm from "./TransferForm";

const Dashboard = () => {
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const addCustomer = (customer) => {
    setCustomers([...customers, { ...customer, id: Date.now(), accounts: [] }]);
  };

  const updateCustomer = (updatedCustomer) => {
    setCustomers(
      customers.map((c) => (c.id === updatedCustomer.id ? updatedCustomer : c))
    );
  };

  const deleteCustomer = (customerId) => {
    setCustomers(customers.filter((c) => c.id !== customerId));
  };

  const addAccount = (customerId, account) => {
    setCustomers(
      customers.map((c) => {
        if (c.id === customerId) {
          return {
            ...c,
            accounts: [...c.accounts, { ...account, id: Date.now() }],
          };
        }
        return c;
      })
    );
  };

  const deleteAccount = (customerId, accountId) => {
    setCustomers(
      customers.map((c) => {
        if (c.id === customerId) {
          return {
            ...c,
            accounts: c.accounts.filter((a) => a.id !== accountId),
          };
        }
        return c;
      })
    );
  };

  const transferMoney = (
    fromCustomerId,
    fromAccountId,
    toCustomerId,
    toAccountId,
    amount
  ) => {
    setCustomers(
      customers.map((c) => {
        if (c.id === fromCustomerId) {
          return {
            ...c,
            accounts: c.accounts.map((a) => {
              if (a.id === fromAccountId) {
                return { ...a, balance: a.balance - amount };
              }
              return a;
            }),
          };
        }
        if (c.id === toCustomerId) {
          return {
            ...c,
            accounts: c.accounts.map((a) => {
              if (a.id === toAccountId) {
                return { ...a, balance: a.balance + amount };
              }
              return a;
            }),
          };
        }
        return c;
      })
    );
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Bank Dashboard
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <CustomerList
            customers={customers}
            onSelectCustomer={setSelectedCustomer}
            onDeleteCustomer={deleteCustomer}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Box mb={2}>
            <CustomerForm
              onAddCustomer={addCustomer}
              onUpdateCustomer={updateCustomer}
              selectedCustomer={selectedCustomer}
            />
          </Box>
          {selectedCustomer && (
            <>
              <Box mb={2}>
                <AccountForm
                  customerId={selectedCustomer.id}
                  onAddAccount={addAccount}
                />
              </Box>
              <TransferForm
                customers={customers}
                onTransferMoney={transferMoney}
              />
            </>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
