import styles from "@/styles/Loader.module.css";
import { Box, CircularProgress } from "@mui/material";

const Loader = () => {
  return (
    <Box className={styles.container}>
      <CircularProgress size={60} />
    </Box>
  );
};

export default Loader;
