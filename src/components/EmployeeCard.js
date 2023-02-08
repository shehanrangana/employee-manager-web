import { GENDER } from "@/utils/enums";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Card, CardContent, CardMedia, Fab, Typography } from "@mui/material";
import { Box } from "@mui/system";

const EmployeeCard = ({ firstName, lastName, email, number, gender, photo }) => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia sx={{ height: 180 }} image={photo} />
      <CardContent>
        <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>{`${firstName} ${lastName}`}</Typography>
        <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
          {email}
        </Typography>
        <Box display="flex" justifyContent="space-between" alignItems="end">
          <div>
            <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
              {number}
            </Typography>
            <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
              {GENDER[gender]}
            </Typography>
          </div>
          <div>
            <Fab color="error" size="small" sx={{ mr: 1 }}>
              <DeleteIcon />
            </Fab>
            <Fab color="success" size="small">
              <EditIcon />
            </Fab>
          </div>
        </Box>
      </CardContent>
    </Card>
  );
};

export default EmployeeCard;
