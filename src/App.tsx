import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid2";
import UserPage from "./pages/UserPage";
import HomePage from "./pages/HomePage";
import AnalyticsPage from "./pages/AnalyticsPage";
import ConfirmDialog from "./components/ConfirmDialog";
import { DialogContextProvider } from "./contexts/DialogContext";
import "./styles/App.scss";
import DrawerAppBar from "./components/DrawerAppBar";

const theme = createTheme({
  colorSchemes: {
    dark: true,
  },
});

function App() {
  const [dialogOptions, setDialogOptions] = useState({
    open: false,
    title: "",
    message: "",
    btns: [],
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <DialogContextProvider
        dialogOptions={dialogOptions}
        setDialogOptions={setDialogOptions}
      >
        <Container className="app-container" maxWidth={false}>
          <Grid container spacing={0} columns={12}>
            <Grid size={12}>
              <DrawerAppBar />
            </Grid>
            <Grid size={12}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/users" element={<UserPage />} />
                <Route path="/analytics" element={<AnalyticsPage />} />
              </Routes>
            </Grid>
          </Grid>
          {dialogOptions && dialogOptions.open && (
            <ConfirmDialog
              open={dialogOptions.open}
              title={dialogOptions.title}
              message={dialogOptions.message}
              btns={dialogOptions.btns}
            />
          )}
        </Container>
      </DialogContextProvider>
    </ThemeProvider>
  );
}

export default App;
