import { GENDER, VALIDATION_RULES } from "@/utils/enums";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Button,
  Card,
  CardContent,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import { useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import RoundedButton from "./RoundedButton";

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
  gender: yup.string(),
});

const EmployeeForm = ({ isEdit, defaultValues, onSubmit }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
    resolver: yupResolver(schema),
  });

  const router = useRouter();

  const navigateToHomeScreen = () => {
    router.push("/employee/list");
  };

  const [title, buttonLabel] = useMemo(() => {
    if (isEdit) {
      return ["Edit Employee", "Save"];
    } else {
      return ["Add Employee", "Add"];
    }
  }, [isEdit]);

  return (
    <Box mt={5} m="auto" py={4} display="flex" flexDirection="column" alignItems="center" maxWidth={500}>
      <RoundedButton variant="contained" sx={{ ml: "auto", mb: 3 }} onClick={navigateToHomeScreen}>
        List View
      </RoundedButton>

      <Card elevation={3} sx={{ borderRadius: 6 }}>
        <CardContent sx={{ p: 3 }}>
          <Typography variant="h5" align="center">
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
                  type="email"
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
                  <Select {...field} labelId="gender-label" defaultValue="" error={!!errors.gender?.message}>
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
              <Button type="submit" variant="outlined" sx={{ mt: 3 }}>
                {buttonLabel}
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

EmployeeForm.propTypes = {
  isEdit: PropTypes.bool.isRequired,
  defaultValues: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
};

export default EmployeeForm;
