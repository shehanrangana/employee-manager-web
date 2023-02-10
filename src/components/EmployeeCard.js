import useConfirm from "@/hooks/useConfirm";
import { deleteEmployee } from "@/store/slices/employeeSlice";
import { DEFAULT_IMAGE, GENDER } from "@/utils/enums";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Card, CardContent, CardMedia, Fab, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";

const EmployeeCard = ({ id, firstName, lastName, email, number, gender, photo }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { confirm } = useConfirm();

  const confirmDelete = async () => {
    const isConfirmed = await confirm("Are you sure you want to delete this record ?");

    if (isConfirmed) {
      dispatch(deleteEmployee(id));
    }
  };

  const navigateToEditScreen = () => {
    router.push(`/employee/edit/${id}`);
  };

  return (
    <Card elevation={3}>
      <CardMedia sx={{ height: 180 }} image={photo || DEFAULT_IMAGE} />
      <CardContent>
        <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>{`${firstName} ${lastName}`}</Typography>
        <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
          {email || "-"}
        </Typography>
        <Box display="flex" justifyContent="space-between" alignItems="end">
          <div>
            <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
              {number || "-"}
            </Typography>
            <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
              {GENDER[gender] || "-"}
            </Typography>
          </div>
          <div>
            <Fab color="error" size="small" sx={{ mr: 1 }} onClick={confirmDelete}>
              <DeleteIcon />
            </Fab>
            <Fab color="success" size="small" onClick={navigateToEditScreen}>
              <EditIcon />
            </Fab>
          </div>
        </Box>
      </CardContent>
    </Card>
  );
};

export default EmployeeCard;
