import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import {
  Card,
  CardHeader,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Grid,
} from '@mui/material';

const BikeDetails = () => {
  const { bikeId } = useParams();
  const [bike, setBike] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBikeData = async () => {
      try {
        // Fetch the bike details along with its history
        const response = await axios.get(`/bike/${bikeId}/history`);
        setBike(response.data.bike || {}); // Ensure bike is an object
        setHistory(response.data.history || []); // Default to empty array
      } catch (error) {
        toast.error('Failed to fetch bike details or history');
        navigate('/dashboard'); // Redirect on failure
      } finally {
        setLoading(false);
      }
    };

    fetchBikeData();
  }, [bikeId, navigate]);

  if (loading) {
    return <Typography>Loading bike details...</Typography>;
  }

  return (
    <div style={{ maxWidth: '1200px', margin: 'auto', padding: '16px' }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Bike Details
      </Typography>

      {bike && (
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardHeader title="Bike Information" />
              <CardContent>
                <Typography>Plaque Number: {bike.plaqueNumber || 'N/A'}</Typography>
                <Typography>Total Distance: {(bike.totalDistance || 0).toFixed(2)} km</Typography>
                <Typography>Total Tax Paid: ${(bike.totalTaxPaid || 0).toFixed(2)}</Typography>
                <Typography>Total Income: ${(bike.totalIncome || 0).toFixed(2)}</Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12}>
            <Card>
              <CardHeader title="Bike Activity History" />
              <CardContent>
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Date</TableCell>
                        <TableCell>Distance (km)</TableCell>
                        <TableCell>Tax Paid ($)</TableCell>
                        <TableCell>Income ($)</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {history.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={4}>No activity history available</TableCell>
                        </TableRow>
                      ) : (
                        history.map((activity, index) => (
                          <TableRow key={index}>
                            <TableCell>{new Date(activity.date).toLocaleDateString()}</TableCell>
                            <TableCell>{(activity.distance || 0).toFixed(2)}</TableCell>
                            <TableCell>{(activity.taxPaid || 0).toFixed(2)}</TableCell>
                            <TableCell>{(activity.income || 0).toFixed(2)}</TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}
    </div>
  );
};

export default BikeDetails;
