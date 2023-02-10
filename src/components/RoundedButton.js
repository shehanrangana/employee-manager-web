import { Button } from "@mui/material";
import React from "react";

const RoundedButton = ({ children, sx, ...otherProps }) => {
  return (
    <Button {...otherProps} sx={{ ...sx, borderRadius: 50 }}>
      {children}
    </Button>
  );
};

export default RoundedButton;
