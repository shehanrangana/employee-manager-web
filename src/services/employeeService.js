import apiService from "./apiService";

const PREFIX = "/employee";

export const employeeService = {
  getEmployees,
  createEmployee,
  deleteEmployee,
  getEmployeeById,
  updateEmployee,
};

function getEmployees() {
  return apiService.get(`${PREFIX}`);
}

function createEmployee(data) {
  return apiService.post(`${PREFIX}`, data);
}

function deleteEmployee(id) {
  return apiService.delete(`${PREFIX}/${id}`);
}

function getEmployeeById(id) {
  return apiService.get(`${PREFIX}/${id}`);
}

function updateEmployee(id, data) {
  return apiService.put(`${PREFIX}/${id}`, data);
}
