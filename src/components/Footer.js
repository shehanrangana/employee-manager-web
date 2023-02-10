import { Paper, Typography } from "@mui/material";
import styles from "@/styles/Footer.module.css";

const Footer = () => {
  return (
    <Paper className={styles.container} elevation={0} square>
      <Typography textAlign="center">
        {new Date().getFullYear()} — <strong>Employee Manager</strong>
      </Typography>
    </Paper>
  );
};

export default Footer;
