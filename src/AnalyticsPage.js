import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Doughnut, Line } from 'react-chartjs-2';

import { useAuth } from './AuthContext';

const AnalyticsPage = () => {
  const { isAuthenticated, user } = useAuth(); 

  const [expenseData, setExpenseData] = useState({
    labels: [],
    data: [],
    colors: [],
  });

  const [monthlyTrends, setMonthlyTrends] = useState({
    labels: [],
    data: [],
  });

  

  useEffect(() => {
    if (isAuthenticated) {
      // Fetch expense distribution data with authentication
      axios
        .get('/api/analytics/expense-distribution', {
          headers: {
            Authorization: `Bearer ${user.token}`, // Make sure to include the authentication token
          },
        })
        .then((response) => setExpenseData(response.data))
        .catch((error) => console.error('Error fetching expense-distribution:', error));
      }
    
  

  }, [isAuthenticated]);

  const expenseChart = {
    labels: expenseData.labels,
    datasets: [{
      data: expenseData.data,
      backgroundColor: expenseData.colors,
    }],
  };

  const expenseChartOptions = {
    plugins: {
      legend: {
        display: true,
        position: 'right',
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const label = context.label || '';
            const value = context.parsed || 0;
            const total = expenseData.data.reduce((acc, curr) => acc + curr, 0);
            const percentage = total > 0 ? ((value / total) * 100).toFixed(2) + '%' : '0%';
            return `${label}: ${value} (${percentage})`;
          },
        },
      },
    },
  };

  

  return (
    <div>
      <h2>Expense Distribution </h2>
      {expenseData.labels.length > 0 && (
        <Doughnut
          data={expenseChart}
          options={expenseChartOptions}
        />
      )}

    
    </div>
  );
};

export default AnalyticsPage;
