import EntityChip from "@/components/common/EntityChip";
import { Box, Card } from "@mui/material";

export default async function Combat() {
  return (
    <Box className=" overflow-auto flex items-center justify-center gap-2">
      <Card variant="outlined" className="p-2" sx={{ borderRadius: "1rem" }}>
        <Box className="flex">
          <EntityChip imageId={1} size={40} />
          <EntityChip imageId={1} />
          <EntityChip imageId={1} />
          <EntityChip imageId={1} />
        </Box>
      </Card>
    </Box>
  );
}
