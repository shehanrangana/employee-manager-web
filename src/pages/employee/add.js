import EmployeeForm from "@/components/EmployeeForm";
import { createEmployee } from "@/store/slices/employeeSlice";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const defaultValues = {
  firstName: "",
  lastName: "",
  email: "",
  number: "",
  gender: "",
};

const AddForm = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const submitState = useSelector((state) => state.employees.submit);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = (data) => {
    setIsSubmitting(true);
    dispatch(createEmployee(data));
  };

  useEffect(() => {
    if (isSubmitting && !submitState.loading && submitState.success) {
      router.push("/employee/list");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [submitState]);

  return (
    <>
      <Head>
        <title>Employee Manager | Add Employee</title>
      </Head>
      <EmployeeForm isEdit={false} defaultValues={defaultValues} onSubmit={onSubmit} />
    </>
  );
};

export default AddForm;
