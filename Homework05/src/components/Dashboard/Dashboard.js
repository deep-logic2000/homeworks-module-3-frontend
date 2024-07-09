import React, { useEffect, useState } from "react";
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
import TablePagination from "@mui/material/TablePagination";
import { mainListItems, secondaryListItems } from "./listItems";
import CustomerElement from "../CustomerElement";
import ModalComponent from "../Modal";

import { useDispatch, useSelector } from "react-redux";

import { openModal } from "../../store/actionCreators/modalAC";
import { useAuth } from "../AuthProvider";
import {
  createCustomer,
  deleteCustomer,
  updateCustomer,
  addAccountToUser,
  depositToAccount,
  withdrawFromAccount,
  transferMoney,
  setActivePage,
  setPageSize,
  getAllCustomersPageble,
} from "../../store/actionCreators/customerAC";
import { openWarnSnackBar } from "../../store/actionCreators/snackBarAC";
import SockJS from "sockjs-client";
import Stomp from "stompjs";

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

  const page = useSelector((state) => state.customers.currentPage);
  const rowsPerPage = useSelector((state) => state.customers.pageSize);

  const handleChangePage = (event, newPage) => {
    dispatch(setActivePage(newPage));
    dispatch(getAllCustomersPageble(newPage, rowsPerPage));
  };

  const handleChangeRowsPerPage = (event) => {
    dispatch(setPageSize(parseInt(event.target.value, 10)));
    dispatch(setActivePage(0));
    dispatch(getAllCustomersPageble(page, rowsPerPage));
  };

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const [modalFields, setModalFields] = useState([]);
  const [submitName, setSubmitName] = useState(() => {});
  const [connected, setConnected] = useState(false);

  const customerList = useSelector((state) => state.customers.customers);
  const activeId = useSelector((state) => state.modal.config.activeAccountId);
  const totalCustomers = useSelector((state) => state.customers.totalCustomers);

  const dispatch = useDispatch();
  const { logout } = useAuth();

  const handleOpenModal = (text, objId) => {
    dispatch(openModal({ modalText: text, activeAccountId: objId }));
  };

  const modalSubmitHandler = (values, resolve = null) => {
    switch (submitName) {
      case "create customer":
        dispatch(
          createCustomer(
            values.name,
            values.email,
            values.age,
            values.password,
            values.phoneNumber,
            resolve
          )
        );
        break;

      case "deposit":
        dispatch(depositToAccount(activeId, values.deposit, resolve));
        break;

      case "withdraw":
        dispatch(withdrawFromAccount(activeId, values.withdraw, resolve));
        break;

      case "add account":
        dispatch(addAccountToUser(activeId, values, resolve));
        break;

      case "transfer":
        dispatch(
          transferMoney(activeId, values.transferTo, values.amount, resolve)
        );
        break;

      case "delete customer":
        dispatch(deleteCustomer(activeId, resolve));
        break;

      case "update customer":
        dispatch(updateCustomer(activeId, values, resolve));
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
      { name: "password", label: "Password" },
      { name: "phoneNumber", label: "PhoneNumber" },
    ];
    setModalFields(fields);
    handleOpenModal(text, "");
    setSubmitName("create customer");
  };

  const handleLogout = () => {
    localStorage.clear();
    logout();
  };

  useEffect(() => {
    const socket2 = new SockJS("/ws");

    let stompClient;
    stompClient = Stomp.over(socket2);
    stompClient.connect(
      {},
      () => {
        setConnected(true);
        stompClient.subscribe("/topic/accountStatus", (message) => {
          dispatch(openWarnSnackBar(message.body));
        });
      },
      (error) => {
        setConnected(false);
      }
    );

    return () => {
      stompClient.disconnect();
      setConnected(false);
    };
  }, [dispatch]);

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
                marginRight: "10px",
                "&:hover": {
                  backgroundColor: "rgb(25, 62, 184)",
                },
              }}
              onClick={handleCreateCustomer}>
              Add customer
            </Button>
            <Button
              variant="contained"
              color="inherit"
              sx={{
                backgroundColor: "#5582ff",
                "&:hover": {
                  backgroundColor: "rgb(25, 62, 184)",
                },
              }}
              onClick={handleLogout}>
              Logout
            </Button>
            <Box
              variant="contained"
              color="inherit"
              sx={{
                color: connected ? "green" : "red",
                marginLeft: "10px",
                backgroundColor: "lightblue",
                padding: "5px",
                borderRadius: "5px",
              }}>
              WS Connected
            </Box>
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
            <Box sx={{ mt: 2, display: "flex", justifyContent: "center" }}>
              <TablePagination
                component="div"
                count={totalCustomers}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                rowsPerPageOptions={[5, 10, 15, 20, 30, 50, 100]}
              />
            </Box>
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
