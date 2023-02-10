import { Grid } from "@mui/material";
import EmployeeCard from "./EmployeeCard";
import PropTypes from "prop-types";

const EmployeeGrid = ({ employees }) => {
  if (employees?.length) {
    return (
      <Grid container spacing={4} data-testid="employee-grid">
        {employees.map((emp, i) => (
          <Grid key={i} item xs={12} sm={6} md={4} lg={3}>
            <EmployeeCard
              id={emp._id}
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
  } else {
    return null;
  }
};

EmployeeGrid.propTypes = {
  employees: PropTypes.array,
};

export default EmployeeGrid;
