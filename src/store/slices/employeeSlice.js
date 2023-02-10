import { employeeService } from "@/services";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

const initialState = {
  all: {
    data: [],
    loading: false,
  },
  submit: {
    loading: false,
    success: false,
  },
  selected: {
    data: {},
    loading: false,
  },
};

export const getEmployees = createAsyncThunk("employees/getEmployees", async (queryParams = {}) => {
  try {
    const { orderBy, order } = queryParams;
    const response = await employeeService.getEmployees(orderBy, order);
    return response.data;
  } catch (error) {
    throw error;
  }
});

export const createEmployee = createAsyncThunk("employees/createEmployee", async (data) => {
  try {
    const response = await employeeService.createEmployee(data);
    return response.data;
  } catch (error) {
    throw error;
  }
});

export const deleteEmployee = createAsyncThunk("employees/deleteEmployee", async (id) => {
  try {
    await employeeService.deleteEmployee(id);
    return id;
  } catch (error) {
    throw error;
  }
});

export const getEmployeeById = createAsyncThunk("employees/getEmployeeById", async (id) => {
  try {
    const response = await employeeService.getEmployeeById(id);
    return response.data;
  } catch (error) {
    throw error;
  }
});

export const updateEmployee = createAsyncThunk("employees/updateEmployee", async ({ id, data }) => {
  try {
    const response = await employeeService.updateEmployee(id, data);
    return response.data;
  } catch (error) {
    throw error;
  }
});

const employeeSlice = createSlice({
  name: "employees",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(HYDRATE, (state, action) => {
      state.all = action.payload.employees?.all;
      state.selected = action.payload.employees?.selected;
    });

    builder.addCase(getEmployees.pending, (state) => {
      state.all.loading = true;
    });
    builder.addCase(getEmployees.fulfilled, (state, { payload }) => {
      state.all.data = payload;
      state.all.loading = false;
    });
    builder.addCase(getEmployees.rejected, (state, action) => {
      state.all.loading = false;
    });

    builder.addCase(createEmployee.pending, (state) => {
      state.submit.loading = true;
      state.submit.success = false;
    });
    builder.addCase(createEmployee.fulfilled, (state, { payload }) => {
      state.all.data.push(payload);
      state.submit.loading = false;
      state.submit.success = true;
    });
    builder.addCase(createEmployee.rejected, (state) => {
      state.submit.loading = false;
      state.submit.success = false;
    });

    builder.addCase(deleteEmployee.fulfilled, (state, { payload }) => {
      state.all.data = state.all.data.filter((el) => el._id !== payload);
    });

    builder.addCase(getEmployeeById.pending, (state) => {
      state.selected.loading = true;
    });
    builder.addCase(getEmployeeById.fulfilled, (state, { payload }) => {
      state.selected.data = payload;
      state.selected.loading = false;
    });
    builder.addCase(getEmployeeById.rejected, (state) => {
      state.selected.loading = false;
    });

    builder.addCase(updateEmployee.pending, (state) => {
      state.submit.loading = true;
      state.submit.success = false;
    });
    builder.addCase(updateEmployee.fulfilled, (state, { payload }) => {
      const index = state.all.data.findIndex((el) => el._id === payload._id);
      if (index >= 0) {
        state.all.data[index] = payload;
      }

      state.submit.loading = false;
      state.submit.success = true;
    });
    builder.addCase(updateEmployee.rejected, (state) => {
      state.submit.loading = false;
      state.submit.success = false;
    });
  },
});

const { reducer } = employeeSlice;

export default reducer;
