import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";
import useConfirm from "../hooks/useConfirm";

const ConfirmationDialog = () => {
  const { onConfirm, onCancel, show, message } = useConfirm();

  return (
    <Dialog open={show} onClose={onCancel}>
      <DialogTitle>{message}</DialogTitle>

      <DialogActions>
        <Button onClick={onCancel} color="secondary">
          No
        </Button>
        <Button onClick={onConfirm} color="error">
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default ConfirmationDialog;
