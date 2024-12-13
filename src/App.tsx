import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Divider } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid2";
import SideBar from "./components/SideBar";
import UserPage from "./pages/UserPage";
import HomePage from "./pages/HomePage";
import AnalyticsPage from "./pages/AnalyticsPage";
import Header from "./components/Header";
import ConfirmDialog from "./components/ConfirmDialog";
import { DialogContextProvider } from "./contexts/DialogContext";
import "./styles/App.scss";

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
            <Grid size={2}>
              <SideBar />
            </Grid>
            <Grid size={10}>
              <Header />
              <Divider />
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
