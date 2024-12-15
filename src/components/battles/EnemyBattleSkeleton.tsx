import { Box, Card, Skeleton } from "@mui/material";

export default function EnemyBattleSketeton() {
  return (
    <Card
      variant="outlined"
      className="w-full p-4 flex flex-col gap-4 flex-shrink-0"
      sx={{ borderRadius: "1rem" }}
    >
      <Skeleton variant="text" width="50%" sx={{ fontSize: "1.5rem" }} />
      <Box className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <Box className="flex gap-2">
          <Skeleton variant="rounded" width={60} height={60} />
          <Skeleton variant="rounded" width={60} height={60} />
          <Skeleton variant="rounded" width={60} height={60} />
        </Box>

        <Box className="flex gap-2">
          <Skeleton variant="circular" width={60} height={60} />
          <Skeleton variant="circular" width={60} height={60} />
          <Skeleton variant="circular" width={60} height={60} />
        </Box>
      </Box>
      <Box className="flex justify-between gap-2">
        <Skeleton variant="rounded" width={160} height={40} />
        <Skeleton variant="rounded" width={144} height={40} />
      </Box>
    </Card>
  );
}
