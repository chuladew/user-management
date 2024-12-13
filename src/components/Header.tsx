import Stack from "@mui/material/Stack";
import ColorThemeSelector from "./ColorThemeSelector";

export default function Header() {
  return (
    <Stack
      direction="row"
      className="app-header-container"
      sx={{
        display: { xs: "none", md: "flex" },
        alignItems: { xs: "flex-start", md: "center" },
        maxWidth: { sm: "100%", md: "100%" },
      }}
      spacing={2}
    >
      <ColorThemeSelector />
    </Stack>
  );
}
