import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Container } from "@mui/material";

import styles from "@/styles/Layout.module.css";

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <Container className={styles.container} maxWidth="lg">
        {children}
      </Container>
      <Footer />
    </>
  );
};

export default Layout;
