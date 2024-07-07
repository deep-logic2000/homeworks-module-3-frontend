import React, { useEffect } from "react";

import Dashboard from "../../components/Dashboard/Dashboard";
// import Dashboard from "../../components/Dashboard/Dashboard";

import { useDispatch, useSelector } from "react-redux";
import { getAllCustomersPageble } from "../../store/actionCreators/customerAC";

const HomePage = () => {
  // const customers = useSelector((state) => state.customers.customers);
  const pageSize = useSelector((state) => state.customers.pageSize);
  const page = useSelector((state) => state.customers.currentPage);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCustomersPageble(page, pageSize));
  }, []);

  return (
    <div>
      <Dashboard />
    </div>
  );
};

export default HomePage;
