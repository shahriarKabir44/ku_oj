import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import React from "react";
import ToastManager from "../../EventsManager/ToastManager";

function Toast() {
  const [toast, setToast] = React.useState({
    open: false,
    message: "",
    severity: "info",
  });

  React.useEffect(() => {
    ToastManager.subscribe({
      showToast: (message, severity = "info") => {
        setToast({
          open: true,
          message,
          severity,
        });
      },
    });
  }, []);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setToast((prev) => ({ ...prev, open: false }));
  };

  return (
    <Snackbar
      open={toast.open}
      autoHideDuration={6000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <Alert
        onClose={handleClose}
        severity={toast.severity}
        variant="filled"
        sx={{ width: "100%" }}
      >
        {toast.message}
      </Alert>
    </Snackbar>
  );
}

export default Toast;
