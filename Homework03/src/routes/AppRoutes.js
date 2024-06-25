import { Route, Routes } from "react-router-dom";

import HomePage from "../pages/HomePage";

// import SignInPage from "./SignInPage";
// import SignUpPage from "./SignUpPage";
import PrivateRoute from "./PrivateRoute";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      {/* <Route path="/" element={<PrivateRoute />}> */}
      {/* <Route path="/*" element={<HomePage />} /> */}
      {/* <Route path="/cabinet" element={<SendEmailPage />} /> */}
      {/* </Route> */}
    </Routes>
  );
};

export default AppRoutes;
