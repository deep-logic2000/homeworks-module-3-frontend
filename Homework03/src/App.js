import { useEffect } from "react";

import SnackBar from "./components/SnackBar";

import AppRoutes from "./routes/AppRoutes";
import { useNavigate } from "react-router-dom";

import "./App.css";

function App() {
  let navigate = useNavigate();

  useEffect(() => {
    // if (navigate.pathname !== "/") {
    // navigate("/");
    // }
  }, []);

  return (
    <div className="App">
      <AppRoutes />
      <SnackBar />
    </div>
  );
}

export default App;
