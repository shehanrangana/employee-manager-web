import { Grid } from "@mui/material";
import React from "react";
import EmployeeCard from "./EmployeeCard";

const EmployeeGrid = ({ employees }) => {
  return (
    <Grid container spacing={4}>
      {employees.map((emp, i) => (
        <Grid key={i} item xs={8} lg={3}>
          <EmployeeCard
            firstName={emp.firstName}
            lastName={emp.lastName}
            email={emp.email}
            number={emp.number}
            gender={emp.gender}
            photo={emp.photo}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default EmployeeGrid;
