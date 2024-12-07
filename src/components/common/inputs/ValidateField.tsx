import { Check, Close } from "@mui/icons-material";
import {
  Box,
  CircularProgress,
  TextField,
  TextFieldProps,
} from "@mui/material";

type Props = {
  valid: boolean;
  loading: boolean;
} & TextFieldProps;

export default function ValidateField({ valid, loading, ...props }: Props) {
  return (
    <TextField
      {...props}
      slotProps={{
        input: {
          endAdornment: loading ? (
            <Box className="flex items-center justify-center w-6 h-6">
              <CircularProgress size={24} />
            </Box>
          ) : valid ? (
            <Check />
          ) : (
            <Close />
          ),
        },
      }}
    />
  );
}
