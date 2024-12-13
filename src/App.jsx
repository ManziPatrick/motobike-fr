import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Toaster } from 'sonner';
import axios from 'axios';

// Import Components
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Dashboard from './components/dashboard/Dashboard';
import BikeRegistration from './components/bikes/BikeRegistration';
import BikeDetails from './components/bikes/BikeDetails';
import BikeActivityTracking from './components/bikes/BikeActivityTracking.jsx';
import PrivateRoute from './components/auth/PrivateRoute';
import Navbar from './components/common/Navbar';

// Axios Configuration
axios.defaults.baseURL = 'https://motobikebn-2c6r.vercel.app/api/v1';
axios.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Create MUI Theme
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Navbar />
        <Toaster position="top-right" richColors />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Protected Routes */}
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/bike/register" element={<BikeRegistration />} />
            <Route path="/bike/activity" element={<BikeActivityTracking />} />
            <Route path="/bike/:bikeId/history" element={<BikeDetails />} />
          </Route>
          
          {/* Redirect to login by default */}
          <Route path="*" element={<Login />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;