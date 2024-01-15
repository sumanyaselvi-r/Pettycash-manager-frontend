// src/components/AnalyticsPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Doughnut, Line } from 'react-chartjs-2';
import TopSpendingCategories from './Topspending';
import SpendingTrendsChart from './MonthlySpendingTrends';

const AnalyticsPage = () => {
  const [expenseData, setExpenseData] = useState({
    labels: [],
    data: [],
    colors: [],
  });

  const [monthlyTrends, setMonthlyTrends] = useState({
    labels: [],
    data: [],
  });

  const [topSpendingCategories, setTopSpendingCategories] = useState([]);

  useEffect(() => {
    // Fetch expense distribution data
    axios.get('/api/analytics/expense-distribution')
      .then(response => {
        setExpenseData(response.data);
      })
      .catch(error => {
        console.error('Error fetching expense distribution data:', error);
      });

    // Fetch monthly spending trends data
    axios.get('/api/analytics/monthly-trends')
      .then(response => {
        setMonthlyTrends(response.data);
      })
      .catch(error => {
        console.error('Error fetching monthly spending trends data:', error);
      });

    // Fetch top spending categories
    axios.get('/api/analytics/top-spending-categories')
      .then(response => {
        setTopSpendingCategories(response.data);
      })
      .catch(error => {
        console.error('Error fetching top spending categories:', error);
      });
  }, []);

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

  const monthlyTrendsChart = {
    labels: monthlyTrends.labels,
    datasets: [
      {
        label: 'Monthly Spending Trends',
        data: monthlyTrends.data,
        borderColor: 'rgba(255,99,132,1)',
        backgroundColor: 'rgba(255,99,132,0.2)',
        fill: true,
      },
    ],
  };

  return (
    <div>
      <h2>Expense Distribution Chart</h2>
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
