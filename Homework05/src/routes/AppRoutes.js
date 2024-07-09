import { Route, Routes } from "react-router-dom";

import HomePage from "../pages/HomePage";
import SignInPage from "../pages/SignInPage";
import { AuthProvider } from "../components/AuthProvider";

import PrivateRoute from "./PrivateRoute";

const AppRoutes = () => {
  return (
    <AuthProvider>
      <Routes>
        {/* <Route path="/" element={<HomePage />} /> */}
        <Route path="/login" element={<SignInPage />} />
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<HomePage />} />
          {/* <Route path="/customers" element={<HomePage />} /> */}
          <Route path="/*" element={<HomePage />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
};

export default AppRoutes;
