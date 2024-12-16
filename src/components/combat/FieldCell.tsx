import { Box } from "@mui/material";

export enum CellVariant {
  MOVE,
  DAHSABLE,
  UNREACHABLE,
  ENEMY_TARGET,
  ALLY_TARGET,
}

type Props = {
  variant: CellVariant;
};

const CellColors = {
  [CellVariant.MOVE]: {
    backgroundColor: "primary.dark",
  },
  [CellVariant.DAHSABLE]: {
    backgroundColor: "primary.main",
  },
  [CellVariant.UNREACHABLE]: {
    backgroundColor: "secondary.light",
  },
  [CellVariant.ENEMY_TARGET]: {
    backgroundColor: "error.dark",
  },
  [CellVariant.ALLY_TARGET]: {
    backgroundColor: "primary.light",
  },
};

export function FieldCell({ variant }: Props) {
  const { backgroundColor } = CellColors[variant];

  return (
    <Box
      className="w-[44px] h-[44px] border-2 border-solid cursor-pointer opacity-75 hover:opacity-50"
      borderColor={"secondary.main"}
      sx={{ backgroundColor }}
    />
  );
}
