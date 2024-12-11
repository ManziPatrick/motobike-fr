import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Typography, 
  TextField, 
  Button, 
  Select, 
  MenuItem, 
  FormControl, 
  InputLabel,
  Box,
  Paper
} from '@mui/material';
import axios from 'axios';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

const BikeActivityTracking = () => {
  const [bikes, setBikes] = useState([]);
  const [selectedBike, setSelectedBike] = useState('');
  const [distance, setDistance] = useState('');
  const [income, setIncome] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBikes = async () => {
      try {
        const response = await axios.get('/bikes');
        setBikes(response.data.bikes);
      } catch (error) {
        toast.error('Failed to fetch bikes');
        navigate('/dashboard');
      }
    };

    fetchBikes();
  }, [navigate]);

  const handleActivitySubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/bike/activity', {
        bikeId: selectedBike,
        distance: parseFloat(distance),
        income: parseFloat(income)
      });
      
      toast.success('Bike activity tracked successfully');
      navigate('/dashboard');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to track bike activity');
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 3, marginTop: 4 }}>
        <Typography variant="h4" gutterBottom>
          Track Bike Activity
        </Typography>
        <form onSubmit={handleActivitySubmit}>
          <FormControl fullWidth margin="normal">
            <InputLabel>Select Bike</InputLabel>
            <Select
              value={selectedBike}
              label="Select Bike"
              onChange={(e) => setSelectedBike(e.target.value)}
              required
            >
              {bikes.map((bike) => (
                <MenuItem key={bike._id} value={bike._id}>
                  {bike.plaqueNumber} - {bike.make} {bike.model}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          
          <TextField
            fullWidth
            margin="normal"
            label="Distance Traveled (km)"
            type="number"
            value={distance}
            onChange={(e) => setDistance(e.target.value)}
            required
            inputProps={{ step: "0.01" }}
          />
          
          <TextField
            fullWidth
            margin="normal"
            label="Income Generated"
            type="number"
            value={income}
            onChange={(e) => setIncome(e.target.value)}
            required
            inputProps={{ step: "0.01" }}
          />
          
          <Box mt={2}>
            <Button 
              type="submit" 
              variant="contained" 
              color="primary" 
              fullWidth
            >
              Track Activity
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

export default BikeActivityTracking;