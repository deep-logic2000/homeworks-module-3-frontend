import React, { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Select,
  MenuItem,
} from "@mui/material";

import { useDispatch, useSelector } from "react-redux";

import { closeModal } from "../../store/actionCreators/modalAC";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const ModalComponent = ({ onSubmit, fields, setModalFields }) => {
  const initialState = () => {
    const state = {};
    fields.forEach((el) => (state[el.name] = el.initialValue || ""));
    return state;
  };

  const [formValues, setFormValues] = useState({});

  const isModalOpen = useSelector((state) => state.modal.isModalOpen);
  const text = useSelector((state) => state.modal.config.modalText);

  const dispatch = useDispatch();

  const handleModalClose = () => {
    dispatch(closeModal());
    setFormValues({});
    setModalFields([]);
  };

  const handleChange = (field) => (event) => {
    setFormValues({ ...formValues, [field.name]: event.target.value });
  };

  const handleSelectChange = (event) => {
    setFormValues({ ...formValues, [event.target.name]: event.target.value });
  };

  const handleSubmit = () => {
    const values = initialState();
    for (let key in formValues) {
      if (formValues[key] !== "" && formValues[key] !== undefined) {
        values[key] = formValues[key];
      }
    }
    new Promise((resolve) => {
      onSubmit(values, resolve);
    }).then(() => {
      handleModalClose();
    });
  };

  return (
    <Modal
      open={isModalOpen}
      onClose={handleModalClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description">
      <Box sx={style}>
        <Typography id="modal-title" variant="h6" component="h2">
          {text}
        </Typography>
        <form>
          {fields.map((field, index) => {
            if (!field.type) {
              return (
                <TextField
                  key={index}
                  margin="normal"
                  fullWidth
                  label={field.label}
                  type="text"
                  value={formValues[field.name]}
                  defaultValue={field.initialValue}
                  onChange={handleChange(field)}
                />
              );
            }
            if (field.type === "select") {
              return (
                <Select
                  labelId={field.name}
                  id={field.name}
                  name={field.name}
                  value={formValues[field.name]}
                  label={field.name}
                  onChange={handleSelectChange}
                  key={index}>
                  {field.options.map((option) => (
                    <MenuItem value={option} key={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              );
            }
            return null;
          })}
          <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid item xs={6}>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={handleSubmit}>
                Submit
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                fullWidth
                variant="outlined"
                color="secondary"
                onClick={handleModalClose}>
                Cancel
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Modal>
  );
};

export default ModalComponent;
