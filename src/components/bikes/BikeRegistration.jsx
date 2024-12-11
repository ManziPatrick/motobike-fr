import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const BikeRegistration = () => {
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState('');
  const [vin, setVin] = useState('');
  const [plaqueNumber, setPlaqueNumber] = useState('');
  const [registrationExpiry, setRegistrationExpiry] = useState('');
  const [dailyTaxRate, setDailyTaxRate] = useState('');

  const navigate = useNavigate();

  const handleBikeRegistration = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/bike/register', {
        make,
        model,
        year,
        vin,
        plaqueNumber,
        registrationExpiry,
        dailyTaxRate: parseFloat(dailyTaxRate)
      });
      
      toast.success('Bike registered successfully');
      navigate('/dashboard');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Bike registration failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Register Bike</h2>
        <form onSubmit={handleBikeRegistration}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Make</label>
            <input
              type="text"
              value={make}
              onChange={(e) => setMake(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Model</label>
            <input
              type="text"
              value={model}
              onChange={(e) => setModel(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Year</label>
            <input
              type="number"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">VIN Number</label>
            <input
              type="text"
              value={vin}
              onChange={(e) => setVin(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Plaque Number</label>
            <input
              type="text"
              value={plaqueNumber}
              onChange={(e) => setPlaqueNumber(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Registration Expiry</label>
            <input
              type="date"
              value={registrationExpiry}
              onChange={(e) => setRegistrationExpiry(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Daily Tax Rate</label>
            <input
              type="number"
              step="0.01"
              value={dailyTaxRate}
              onChange={(e) => setDailyTaxRate(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600"
          >
            Register Bike
          </button>
        </form>
      </div>
    </div>
  );
};

export default BikeRegistration;