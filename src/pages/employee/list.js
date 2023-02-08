import EmployeeCard from "@/components/EmployeeCard";
import ViewListIcon from "@mui/icons-material/ViewList";
import AppsIcon from "@mui/icons-material/Apps";
import { Grid } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Head from "next/head";
import React, { useState } from "react";
import EmployeeList from "@/components/EmployeeList";
import EmployeeGrid from "@/components/EmployeeGrid";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  const [isListView, setIsListView] = useState(false);

  const changeLayout = () => {
    setIsListView(!isListView);
  };

  const navigateToAddEmployee = () => {
    router.push("/employee/add");
  };

  return (
    <>
      <Head>
        <title>Employee Manager | Home</title>
      </Head>

      <Box display="flex" justifyContent="end" mt={4} mb={3}>
        <Button variant="contained" sx={{ mr: 2 }} onClick={navigateToAddEmployee}>
          Add Employee
        </Button>
        <IconButton color="primary" onClick={changeLayout}>
          {isListView ? <AppsIcon /> : <ViewListIcon />}
        </IconButton>
      </Box>

      {isListView ? <EmployeeList employees={dummyData} /> : <EmployeeGrid employees={dummyData} />}
    </>
  );
}

const dummyData = [
  {
    id: "1",
    firstName: "Henri",
    lastName: "Rodriguez",
    email: "Darrin_Rippin@gmail.com",
    number: "+94771277218",
    gender: "M",
    photo: "https://randomuser.me/api/portraits/men/92.jpg",
  },
  {
    id: "2",
    firstName: "Lindsay",
    lastName: "Herman",
    email: "Ewald.Kunde@gmail.com",
    number: "+94771274218",
    gender: "F",
    photo: "https://randomuser.me/api/portraits/men/30.jpg",
  },
  {
    id: "3",
    firstName: "Gerda",
    lastName: "Trantow",
    email: "Mauricio.Stehr@yahoo.com",
    number: "+94771277681",
    gender: "M",
    photo: "https://randomuser.me/api/portraits/men/85.jpg",
  },
  {
    id: "4",
    firstName: "Skye",
    lastName: "Rolfson",
    email: "Angelita_Simonis@hotmail.com",
    number: "+94771277689",
    gender: "F",
    photo: "https://randomuser.me/api/portraits/men/75.jpg",
  },
  {
    id: "5",
    firstName: "Simeon",
    lastName: "Russel",
    email: "Fabiola_Heidenreich@yahoo.com",
    number: "+94771277682",
    gender: "M",
    photo: "https://randomuser.me/api/portraits/men/81.jpg",
  },
  {
    id: "6",
    firstName: "Kenyon",
    lastName: "Fahey",
    email: "Lia_Purdy@hotmail.com",
    number: "+94771277683",
    gender: "F",
    photo: "https://randomuser.me/api/portraits/men/31.jpg",
  },
  {
    id: "7",
    firstName: "Toni",
    lastName: "Boyle",
    email: "Vivien92@yahoo.com",
    number: "+94771277684",
    gender: "M",
    photo: "https://randomuser.me/api/portraits/men/88.jpg",
  },
  {
    id: "8",
    firstName: "Fredy",
    lastName: "Fritsch",
    email: "Christopher_Wisozk37@yahoo.com",
    number: "+94771277685",
    gender: "M",
    photo: "https://randomuser.me/api/portraits/men/61.jpg",
  },
  {
    id: "9",
    firstName: "Elvis",
    lastName: "Konopelski",
    email: "Mavis27@gmail.com",
    number: "+94771277686",
    gender: "M",
    photo: "https://randomuser.me/api/portraits/men/66.jpg",
  },
  {
    id: "10",
    firstName: "Lulu",
    lastName: "Reinger",
    email: "Melany_Rau70@gmail.com",
    number: "+94771277687",
    gender: "F",
    photo: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    id: "11",
    firstName: "Kelton",
    lastName: "Rau",
    email: "Patrick_Ratke@gmail.com",
    number: "+94771277688",
    gender: "F",
    photo: "https://randomuser.me/api/portraits/men/71.jpg",
  },
  {
    id: "12",
    firstName: "Adonis",
    lastName: "Schuppe",
    email: "Johann.Orn52@hotmail.com",
    number: "+94771277618",
    gender: "M",
    photo: "https://randomuser.me/api/portraits/men/36.jpg",
  },
];
