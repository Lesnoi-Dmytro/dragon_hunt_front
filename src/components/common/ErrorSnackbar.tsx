import CloseIcon from "@mui/icons-material/Close";

import { IconButton, Snackbar } from "@mui/material";

type Props = {
  open: boolean;
  onClose: () => void;
  message: string;
};

export default function ErrorSnackbar({ open, onClose, message }: Props) {
  return (
    <Snackbar
      open={open}
      onClose={onClose}
      message={message}
      action={
        <IconButton
          size="small"
          aria-label="close"
          color="inherit"
          onClick={onClose}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      }
      ContentProps={{
        sx: {
          backgroundColor: "error.main",
          fontSize: "1rem",
          color: "white",
        },
      }}
    />
  );
}
