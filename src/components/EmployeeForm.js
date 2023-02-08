import { GENDER, VALIDATION_RULES } from "@/utils/enums";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Button,
  Container,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import PropTypes from "prop-types";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";

const schema = yup.object().shape({
  firstName: yup
    .string()
    .required("First Name is required")
    .matches(VALIDATION_RULES.ALPHABETS_ONLY, "First name must contains only alphabets")
    .min(6, "First Name must be at least 6 characters")
    .max(10, "First Name must be at most 10 characters"),
  lastName: yup
    .string()
    .required("Last Name is required")
    .matches(VALIDATION_RULES.ALPHABETS_ONLY, "Last name must contains only alphabets")
    .min(6, "Last Name must be at least 6 characters")
    .max(10, "Last Name must be at most 10 characters"),
  email: yup.string().email("Invalid email address"),
  number: yup
    .string()
    .matches(VALIDATION_RULES.LK_PHONE_NUMBERS, { message: "Invalid phone number", excludeEmptyString: true }),
  gender: yup.string().required("Gender is required"),
});

const EmployeeForm = ({ title, defaultValues, onSubmit }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
    resolver: yupResolver(schema),
  });

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          {title}
        </Typography>

        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
          <Controller
            name="firstName"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="First Name"
                autoFocus
                variant="filled"
                error={!!errors.firstName?.message}
                helperText={errors.firstName?.message}
                sx={{ mb: 2 }}
              />
            )}
          />
          <Controller
            name="lastName"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="Last Name"
                variant="filled"
                error={!!errors.lastName?.message}
                helperText={errors.lastName?.message}
                sx={{ mb: 2 }}
              />
            )}
          />
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="Email"
                variant="filled"
                error={!!errors.email?.message}
                helperText={errors.email?.message}
                sx={{ mb: 2 }}
              />
            )}
          />
          <Controller
            name="number"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="Phone"
                variant="filled"
                error={!!errors.number?.message}
                helperText={errors.number?.message}
                sx={{ mb: 2 }}
              />
            )}
          />
          <Controller
            name="gender"
            control={control}
            render={({ field }) => (
              <FormControl fullWidth label="Gender" variant="filled">
                <InputLabel id="gender-label">Gender</InputLabel>
                <Select {...field} labelId="gender-label" error={!!errors.gender?.message}>
                  {Object.entries(GENDER).map(([value, label]) => (
                    <MenuItem key={value} value={value}>
                      {label}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>{errors.gender?.message}</FormHelperText>
              </FormControl>
            )}
          />

          <Box display="flex" justifyContent="flex-end">
            <Button type="submit" variant="outlined" sx={{ mt: 3, mb: 2 }}>
              Add
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

EmployeeForm.propTypes = {
  title: PropTypes.string.isRequired,
  defaultValues: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
};

export default EmployeeForm;
