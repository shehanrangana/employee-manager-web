import EmployeeForm from "@/components/EmployeeForm";

const defaultValues = {
  firstName: "",
  lastName: "",
  email: "",
  number: "",
  gender: "",
};

const AddForm = () => {
  const onSubmit = (data) => {
    console.log(data);
  };

  return <EmployeeForm title="Add Employee" defaultValues={defaultValues} onSubmit={onSubmit} />;
};

export default AddForm;
