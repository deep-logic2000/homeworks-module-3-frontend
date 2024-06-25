import React from "react";
import { List, ListItem, ListItemText, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const CustomerList = ({ customers, onSelectCustomer, onDeleteCustomer }) => {
  return (
    <List>
      {customers.map((customer) => (
        <ListItem
          key={customer.id}
          button
          onClick={() => onSelectCustomer(customer)}>
          <ListItemText primary={customer.name} />
          <IconButton
            edge="end"
            aria-label="delete"
            onClick={() => onDeleteCustomer(customer.id)}>
            <DeleteIcon />
          </IconButton>
        </ListItem>
      ))}
    </List>
  );
};

export default CustomerList;
