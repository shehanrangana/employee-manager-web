import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Container } from "@mui/material";
import React from "react";

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <Container maxWidth="lg">{children}</Container>

      {/* <Footer /> */}
    </>
  );
};

export default Layout;
