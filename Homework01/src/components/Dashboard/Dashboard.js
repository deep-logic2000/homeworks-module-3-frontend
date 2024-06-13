import React, { useState } from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { mainListItems, secondaryListItems } from "./listItems";
import CustomerElement from "../CustomerElement";
import ModalComponent from "../Modal";

import { useDispatch, useSelector } from "react-redux";

import { openModal } from "../../store/actionCreators/modalAC";
import {
  createCustomer,
  deleteCustomer,
  updateCustomer,
  addAccountToUser,
  depositToAccount,
  withdrawFromAccount,
  transferMoney,
} from "../../store/actionCreators/customerAC";

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Dashboard() {
  const [open, setOpen] = useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const [modalFields, setModalFields] = useState([]);
  const [submitName, setSubmitName] = useState(() => {});

  const customerList = useSelector((state) => state.customers.customers);
  const activeId = useSelector((state) => state.modal.config.activeAccountId);

  const dispatch = useDispatch();

  const handleOpenModal = (text, objId) => {
    dispatch(openModal({ modalText: text, activeAccountId: objId }));
  };

  const modalSubmitHandler = (values) => {
    switch (submitName) {
      case "create customer":
        dispatch(createCustomer(values.name, values.email, values.age));
        break;

      case "deposit":
        dispatch(depositToAccount(activeId, values.deposit));
        break;

      case "withdraw":
        dispatch(withdrawFromAccount(activeId, values.withdraw));
        break;

      case "add account":
        dispatch(addAccountToUser(activeId, values));
        break;

      case "transfer":
        dispatch(transferMoney(activeId, values.transferTo, values.amount));
        break;

      case "delete customer":
        dispatch(deleteCustomer(activeId));
        break;

      case "update customer":
        dispatch(updateCustomer(activeId, values));
        break;

      default:
        console.log("---");
    }
  };

  const handleCreateCustomer = () => {
    const text = "Enter initial details of new customer:";
    const fields = [
      { name: "name", label: "Name" },
      { name: "email", label: "Email" },
      { name: "age", label: "Age" },
    ];
    setModalFields(fields);
    handleOpenModal(text, "");
    setSubmitName("create customer");
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: "24px", // keep right padding when drawer closed
            }}>
            <IconButton
              edge1="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: "36px",
                ...(open && { display: "none" }),
              }}>
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}>
              Dashboard
            </Typography>
            <Button
              variant="contained"
              color="inherit"
              sx={{
                backgroundColor: "blue",
                "&:hover": {
                  backgroundColor: "rgb(25, 62, 184)",
                },
              }}
              onClick={handleCreateCustomer}>
              Add customer
            </Button>
            <IconButton color="inherit">
              <Badge badgeContent={4} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              px: [1],
            }}>
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
            {mainListItems}
            <Divider sx={{ my: 1 }} />
            {secondaryListItems}
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}>
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              {/* Chart */}
              {customerList.map((customer) => (
                <Grid item xs={12} key={customer.id}>
                  <Paper
                    sx={{
                      p: 2,
                      display: "flex",
                      flexDirection: "column",
                    }}>
                    <CustomerElement
                      customer={customer}
                      setSubmitName={setSubmitName}
                      setModalFields={setModalFields}
                      handleOpenModal={handleOpenModal}
                    />
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>
      </Box>
      <ModalComponent
        onSubmit={modalSubmitHandler}
        fields={modalFields}
        setModalFields={setModalFields}
      />
    </ThemeProvider>
  );
}
