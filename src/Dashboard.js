import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';

import ChartComponent from './Charts';

import AnalyticsPage from './AnalyticsPage';



const DashboardPage = () => {
 
  const [summary, setSummary] = useState({
    totalIncome: 0,
    totalExpense: 0,
    balance: 0,
  });
  const [categoryData, setCategoryData] = useState({});
  const [monthlyExpenseData, setMonthlyExpenseData] = useState({});
  useEffect(() => {
    // Fetch summary data from the backend
    axios.get('/api/transaction-summary')
      .then((response) => setSummary(response.data))
      .catch((error) => console.error('Error fetching summary:', error));
      // Fetch category-wise analysis data from the backend
      axios.get('/api/category-wise-analysis')
      .then((response) => setCategoryData(response.data))
      .catch((error) => console.error('Error fetching category-wise analysis data:', error));
 
  }, []);
  const labels = Object.keys(monthlyExpenseData);
  const dataValues = Object.values(monthlyExpenseData);

  // Define the chart data
  const chartData = {
    labels: labels,
    datasets: [
      {
        label: 'Monthly Expenses',
        data: dataValues,
        
        borderColor: 'rgba(75, 192, 192, 1)', // Customize the line color
        borderWidth: 2,
      },
    ],
  };

  // Define the chart options
  const chartOptions = {
    scales: {
      x: {
        title: {
          display: true,
          text: 'Month',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Expense Amount',
        },
        beginAtZero: true,
      },
    }
  }
 


  return (
    <div className="dashboard-container">
      <h2>Dashboard</h2>
      <div className="summary-container">
        <div className="summary-item">
          <h3>Total Income</h3>
          <p className="amount">{summary.totalIncome}</p>
        </div>
        <div className="summary-item">
          <h3>Total Expense</h3>
          <p className="amount">{summary.totalExpense}</p>
        </div>
        <div className="summary-item">
          <h3>Balance</h3>
          <p className="amount">{summary.balance}</p>
        </div>
      </div>
     
     <div >
      <h2>Income Vs Expense</h2>
      <ChartComponent totalIncome={summary.totalIncome} totalExpense={summary.totalExpense} />
     </div>
     
    
    <AnalyticsPage/>
    <div className="monthly-expense-chart">
      <Line data={chartData} options={chartOptions} />
    </div>
      
    
    </div>
  );
};
export default DashboardPage;
