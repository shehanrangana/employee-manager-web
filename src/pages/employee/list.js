import EmployeeGrid from "@/components/EmployeeGrid";
import EmployeeList from "@/components/EmployeeList";
import RoundedButton from "@/components/RoundedButton";
import { wrapper } from "@/store";
import { getEmployees } from "@/store/slices/employeeSlice";
import { STORAGE_KEYS } from "@/utils/enums";
import AppsIcon from "@mui/icons-material/Apps";
import ViewListIcon from "@mui/icons-material/ViewList";
import { Fab } from "@mui/material";
import Box from "@mui/material/Box";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const EmployeeHome = () => {
  const router = useRouter();
  const employees = useSelector((state) => state.employees.all.data);

  const [isListView, setIsListView] = useState(false);

  const changeLayout = () => {
    setIsListView(!isListView);
    localStorage.setItem(STORAGE_KEYS.HOME_LAYOUT, !isListView);
  };

  const navigateToAddScreen = () => {
    router.push("/employee/add");
  };

  useEffect(() => {
    const layout = localStorage.getItem(STORAGE_KEYS.HOME_LAYOUT);
    const value = layout ? JSON.parse(layout) : false;
    setIsListView(value);
  }, []);

  return (
    <>
      <Head>
        <title>Employee Manager | Home</title>
      </Head>

      <Box display="flex" alignItems="center" justifyContent="end" mt={4} mb={3}>
        <RoundedButton variant="contained" sx={{ mr: 2 }} onClick={navigateToAddScreen}>
          Add Employee
        </RoundedButton>
        <Fab color="primary" size="small" onClick={changeLayout} title="Switch Layout">
          {isListView ? <AppsIcon /> : <ViewListIcon />}
        </Fab>
      </Box>

      {isListView ? <EmployeeList employees={employees} /> : <EmployeeGrid employees={employees} />}
    </>
  );
};

export const getServerSideProps = wrapper.getServerSideProps((store) => async () => {
  await store.dispatch(getEmployees());

  return {
    props: {},
  };
});

export default EmployeeHome;
