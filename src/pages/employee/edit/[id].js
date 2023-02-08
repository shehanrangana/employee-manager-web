import EmployeeForm from "@/components/EmployeeForm";
import React from "react";

const EditForm = ({ defaultValues = {} }) => {
  const onSubmit = (data) => {
    console.log(data);
  };

  return <EmployeeForm title="Edit Employee" defaultValues={defaultValues} onSubmit={onSubmit} />;
};

export default EditForm;
