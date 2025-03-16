import React, { useState } from "react";
import { Alert, Snackbar } from "@mui/material";

interface CustomSnackBarProps {
  message: string;
  severity: "success" | "error";
  open: boolean;
  onClose: () => void;
}

const CustomSnackBar: React.FC<CustomSnackBarProps> = ({
  message,
  severity,
  open,
  onClose,
}) => {
  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={onClose}>
      <Alert onClose={onClose} severity={severity} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default React.memo(CustomSnackBar);
