import React, { useState, useEffect } from "react";
import { TextField, Button } from "@mui/material";

const CustomerForm = ({
  onAddCustomer,
  onUpdateCustomer,
  selectedCustomer,
}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (selectedCustomer) {
      setName(selectedCustomer.name);
      setEmail(selectedCustomer.email);
    } else {
      setName("");
      setEmail("");
    }
  }, [selectedCustomer]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedCustomer) {
      onUpdateCustomer({ ...selectedCustomer, name, email });
    } else {
      onAddCustomer({ name, email });
    }
    setName("");
    setEmail("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button type="submit" variant="contained" color="primary">
        {selectedCustomer ? "Update Customer" : "Add Customer"}
      </Button>
    </form>
  );
};

export default CustomerForm;
