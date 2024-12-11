import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Typography,
  Button,
  Grid,
} from '@mui/material';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [bikes, setBikes] = useState([]);
  const [summary, setSummary] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await axios.get('/dashboard');
        setUser(response.data.user);
        setBikes(response.data.bikes);
        setSummary(response.data.summary);
      } catch (error) {
        toast.error('Failed to fetch dashboard data');
        navigate('/login');
      }
    };

    fetchDashboardData();
  }, [navigate]);

  const registerNewBike = () => {
    navigate('/bike/register');
  };

  const viewBikeDetails = (bikeId) => {
    navigate(`/bike/${bikeId}/history`);
  };

  return (
    <div style={{ maxWidth: '1200px', margin: 'auto', padding: '16px' }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Dashboard
      </Typography>

      {user && (
        <Grid container spacing={3}>
          {/* User Details */}
          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardHeader title="User Details" />
              <CardContent>
                <Typography>Username: {user.username}</Typography>
                <Typography>Email: {user.email}</Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Bike Summary */}
          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardHeader title="Bike Summary" />
              <CardContent>
                <Typography>Total Bikes: {summary.totalBikes || 0}</Typography>
                <Typography>
                  Total Distance: {summary.totalDistance?.toFixed(2) || 0} km
                </Typography>
                <Typography>
                  Total Tax Paid: ${summary.totalTaxPaid?.toFixed(2) || 0}
                </Typography>
                <Typography>
                  Total Income: ${summary.totalIncome?.toFixed(2) || 0}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Action Buttons */}
          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardHeader title="Actions" />
              <CardActions>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={registerNewBike}
                  fullWidth
                >
                  Register New Bike
                </Button>
              </CardActions>
            </Card>
          </Grid>

          {/* Registered Bikes */}
          <Grid item xs={12}>
            <Card>
              <CardHeader title="Registered Bikes" />
              <CardContent>
                {bikes.length === 0 ? (
                  <Typography>No bikes registered yet</Typography>
                ) : (
                  <Grid container spacing={2}>
                    {bikes.map((bike) => (
                      <Grid item xs={12} sm={6} md={4} key={bike._id}>
                        <Card
                          style={{ cursor: 'pointer' }}
                          onClick={() => viewBikeDetails(bike._id)}
                        >
                          <CardContent>
                            <Typography>Plaque Number: {bike.plaqueNumber}</Typography>
                            <Typography>
                              Total Distance: {bike.totalDistance?.toFixed(2)} km
                            </Typography>
                            <Typography>
                              Total Tax Paid: ${bike.totalTaxPaid?.toFixed(2)}
                            </Typography>
                          </CardContent>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}
    </div>
  );
};

export default Dashboard;
