import React, { useEffect } from "react";

import Dashboard from "../../components/Dashboard/Dashboard";
// import Dashboard from "../../components/Dashboard/Dashboard";

import { useDispatch, useSelector } from "react-redux";
import { getAllCustomers } from "../../store/actionCreators/customerAC";

const HomePage = () => {
  const customers = useSelector((state) => state.customers.customers);

  console.log(customers);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCustomers());
  }, []);

  return (
    <div>
      <Dashboard />
    </div>
  );
};

export default HomePage;
