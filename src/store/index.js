import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import employeeReducer from "./slices/employeeSlice";

const store = () =>
  configureStore({
    reducer: {
      employees: employeeReducer,
    },
  });

export const wrapper = createWrapper(store);
