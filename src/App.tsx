import { useState } from 'react';
import { Routes, Route } from 'react-router-dom'
import { Divider } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid2';
import SideBar from './components/SideBar';
import UserPage from './pages/UserPage';
import HomePage from './pages/HomePage';
import AnalyticsPage from './pages/AnalyticsPage';
import Header from './components/Header';

const theme = createTheme({
  colorSchemes: {
    dark: true,
  },
});

function App() {
  const [ searchQuery, setSearchQuery ] = useState('');
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container sx={{ width: '100%', padding: 0, margin: 0 }} maxWidth={false}>
        <Grid container spacing={0.5}>
          <Grid size={2}>
            <SideBar />
          </Grid>
          <Grid size={10}>
            <Header setSearchQuery={setSearchQuery} />
            <Divider />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/users" element={<UserPage searchQuery={searchQuery} />} />
              <Route path="/users/:userId" element={<UserPage searchQuery={searchQuery}  />} />
              <Route path="/analytics" element={<AnalyticsPage />} />
            </Routes>
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  )
}

export default App
