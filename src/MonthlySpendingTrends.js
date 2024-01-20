import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Scatter } from 'react-chartjs-2';
import { useAuth } from './AuthContext';

const MonthlySpendingChart = () => {
  const { isAuthenticated, user } = useAuth();
  const [monthlySpendingData, setMonthlySpendingData] = useState({ labels: [], data: [] });

  useEffect(() => {
    if (isAuthenticated) {
      // Fetch monthly spending data from the backend with authentication
      axios
        .get('/api/analytics/monthly-trends', {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        })
        .then((response) => setMonthlySpendingData(response.data))
        .catch((error) => console.error('Error fetching monthly trends data:', error));
    }
  }, [isAuthenticated, user.token]);


  if (!Array.isArray(monthlySpendingData.labels) || !Array.isArray(monthlySpendingData.data)) {
    console.error('Invalid monthly spending data structure:', monthlySpendingData);
    return null;
  }

  const scatterData = {
    labels: monthlySpendingData.labels,
    datasets: [
      {
        label: 'Monthly Spending Trends',
        data: monthlySpendingData.data,
        backgroundColor: 'rgba(75, 192, 192, 0.7)', // Customize the scatter plot color
      },
    ],
  };

  const scatterOptions = {
    scales: {
      x: {
        type: 'linear',
        position: 'bottom',
        title: {
          display: true,
          text: 'Month',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Total Expense',
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <div>
      <h2>Monthly Spending Trends</h2>
      <Scatter data={scatterData} options={scatterOptions} />
    </div>
  );
};

export default MonthlySpendingChart;
