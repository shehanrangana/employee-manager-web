import useConfirm from "@/hooks/useConfirm";
import { deleteEmployee, getEmployees } from "@/store/slices/employeeSlice";
import { DEFAULT_IMAGE, GENDER } from "@/utils/enums";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableRow } from "@mui/material";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import EnhancedTableHead from "./EnhancedTableHead";

const headCells = [
  {
    id: "image",
    label: "Image",
    disableSort: true,
  },
  {
    id: "firstName",
    label: "First Name",
  },
  {
    id: "lastName",
    label: "Last Name",
  },
  {
    id: "email",
    label: "Email",
  },
  {
    id: "number",
    label: "Phone",
  },
  {
    id: "gender",
    label: "Gender",
  },
  {
    id: "actions",
    label: "Actions",
    disableSort: true,
  },
];

const EmployeeList = ({ employees }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { confirm } = useConfirm();

  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("");

  const confirmDelete = async (id) => {
    const isConfirmed = await confirm("Are you sure you want to delete this record ?");

    if (isConfirmed) {
      dispatch(deleteEmployee(id));
    }
  };

  const navigateToEditScreen = (id) => {
    router.push(`/employee/edit/${id}`);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  useEffect(() => {
    // If changed sorting parameters, fetch sorted data from the server
    if (orderBy && order) {
      dispatch(getEmployees({ orderBy, order }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderBy, order]);

  if (employees?.length) {
    return (
      <TableContainer component={Paper} elevation={3} aria-label="employee-table">
        <Table sx={{ minHeight: 200 }} aria-label="simple table">
          <EnhancedTableHead headCells={headCells} order={order} orderBy={orderBy} onRequestSort={handleRequestSort} />

          <TableBody>
            {employees.map((row) => (
              <TableRow key={row._id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <TableCell>
                  <img src={row.photo || DEFAULT_IMAGE} alt="profile photo" loading="lazy" height={60} width={60} />
                </TableCell>
                <TableCell>{row.firstName}</TableCell>
                <TableCell>{row.lastName}</TableCell>
                <TableCell>{row.email || "-"}</TableCell>
                <TableCell>{row.number || "-"}</TableCell>
                <TableCell>{GENDER[row.gender] || "-"}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="success"
                    size="small"
                    sx={{ mr: 1 }}
                    onClick={() => navigateToEditScreen(row._id)}
                  >
                    Edit
                  </Button>
                  <IconButton color="error" onClick={() => confirmDelete(row._id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  } else {
    return null;
  }
};

EmployeeList.propTypes = {
  employees: PropTypes.array,
};

export default EmployeeList;
