import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: "#6200ED",
    },
    error: {
      main: red[500],
    },
    // success: {
    //   main: "#07EE7F",
    // },
  },
});

export default theme;
