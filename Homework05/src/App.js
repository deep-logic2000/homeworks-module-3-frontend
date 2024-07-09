import AppRoutes from "./routes/AppRoutes";

import SnackBar from "./components/SnackBar";

import "./App.css";

function App() {

  return (
    <div className="App">
      <AppRoutes />
      <SnackBar />
    </div>
  );
}

export default App;
