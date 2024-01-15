// src/components/SpendingTrendsChart.js (or your component file)

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';

const SpendingTrendsChart = () => {
  const [monthlyTrends, setMonthlyTrends] = useState({ labels: [], data: [] });

  useEffect(() => {
    // Fetch monthly spending trends data from the server
    axios.get('/api/analytics/monthly-trends')
      .then(response => {
        setMonthlyTrends(response.data);
      })
      .catch(error => {
        console.error('Error fetching monthly spending trends:', error);
      });
  }, []); // Empty dependency array ensures the effect runs once on component mount

  const chartData = {
    labels: monthlyTrends.labels,
    datasets: [
      {
        label: 'Monthly Spending Trends',
        data: monthlyTrends.data,
        fill: false,
        borderColor: 'rgba(75,192,192,1)',
      },
    ],
  };
  return (
    <div>
      <h2>Monthly Spending Trends</h2>
      {monthlyTrends.labels.length > 0 ? (
        <Line
          data={chartData}
          options={{
            plugins: {
              legend: {
                display: true,
                position: 'bottom',
              },
            },
            scales: {
              x: {
                type: 'time',
                time: {
                  unit: 'month',
                },
              },
              y: {
                beginAtZero: true,
              },
            },
          }}
        />
      ) : (
        <p>No data available for spending trends.</p>
      )}
    </div>
  );
};

export default SpendingTrendsChart;
