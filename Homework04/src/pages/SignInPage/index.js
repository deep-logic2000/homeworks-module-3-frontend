import React, { useState, useEffect, useCallback } from "react";

import { useNavigate } from "react-router-dom";
// import { fetchAuth } from "../../store/reducers";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useDispatch } from "react-redux";

import { handleLogIn } from "../../store/actionCreators/authAC";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}>
      {"Copyright © "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function SignIn() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: "kirill44",
    password: "GID66PQa.",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const [touched, setTouched] = useState({
    email: false,
    password: false,
  });

  const dispatch = useDispatch();

  const isDirty = !!errors.email || !!errors.password;

  const handleChange = (name, value) => {
    setValues((current) => ({ ...current, [name]: value }));
  };

  const validateName = useCallback(
    (value) => {
      if (/[/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$]/.test(value)) {
        setErrors((current) => ({ ...current, email: "Only latins" }));
      } else if (values.email.length > 30) {
        setErrors((current) => ({
          ...current,
          username: "Name should be less then 30 symbols",
        }));
      } else {
        setErrors((current) => ({ ...current, username: "" }));
      }
    },
    [setErrors, values.email]
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    const signInData = {
      login: values.email,
      password: values.password,
    };

    dispatch(handleLogIn(signInData, navigate));
  };

  useEffect(() => {
    if (touched.username) {
      validateName(values.username);
    }
  }, [values.username, touched.username, validateName]);

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}>
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign In
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoFocus
            value={values.email}
            onChange={({ target }) => {
              handleChange(target.name, target.value);
              if (touched.username) {
                validateName(target.value);
              }
            }}
            onBlur={({ target }) => {
              if (!touched.username) {
                setTouched((current) => ({ ...current, username: true }));
                validateName(target.value);
              }
            }}
            error={!!errors.username}
            helperText={errors.username}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={values.password}
            onChange={({ target }) => {
              handleChange(target.name, target.value);
            }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={isDirty}>
            Login
          </Button>
        </Box>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
}
