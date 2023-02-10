import useConfirm from "@/hooks/useConfirm";
import { deleteEmployee } from "@/store/slices/employeeSlice";
import { DEFAULT_IMAGE, GENDER } from "@/utils/enums";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Button,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";

const EmployeeList = ({ employees }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { confirm } = useConfirm();

  const confirmDelete = async (id) => {
    const isConfirmed = await confirm("Are you sure you want to delete this record ?");

    if (isConfirmed) {
      dispatch(deleteEmployee(id));
    }
  };

  const navigateToEditScreen = (id) => {
    router.push(`/employee/edit/${id}`);
  };

  if (employees?.length) {
    return (
      <TableContainer component={Paper} elevation={3} aria-label="employee-table">
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Image</TableCell>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Gender</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
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

export default EmployeeList;
