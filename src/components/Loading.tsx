import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

export default function CircularIndeterminate() {
  return (
    <Box className="loading-spinner-wrapper">
      <CircularProgress />
    </Box>
  );
}
