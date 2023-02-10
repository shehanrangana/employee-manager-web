import EmployeeForm from "@/components/EmployeeForm";
import { wrapper } from "@/store";
import { getEmployeeById, updateEmployee } from "@/store/slices/employeeSlice";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const EditForm = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const employee = useSelector((state) => state.employees.selected.data);
  const submitState = useSelector((state) => state.employees.submit);

  const { _id, firstName, lastName, email, number, gender } = employee;
  const defaultValues = { firstName, lastName, email, number, gender };

  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = (data) => {
    setIsSubmitting(true);
    dispatch(updateEmployee({ id: _id, data }));
  };

  useEffect(() => {
    if (isSubmitting && !submitState.loading && submitState.success) {
      router.push("/employee/list");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [submitState, isSubmitting]);

  return (
    <>
      <Head>
        <title>Employee Manager | Edit Employee</title>
      </Head>
      <EmployeeForm isEdit={true} defaultValues={defaultValues} onSubmit={onSubmit} />
    </>
  );
};

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ params }) => {
  await store.dispatch(getEmployeeById(params.id));

  return {
    props: {},
  };
});

export default EditForm;
