import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ChartComponent from './Charts';
import AnalyticsPage from './AnalyticsPage';
import MonthlySpendingChart from './MonthlySpendingTrends';
import { useAuth } from './AuthContext';
import Header from './Header';
const DashboardPage = () => {
  const { isAuthenticated, user } = useAuth();
  
  const [topExpenses, setTopExpenses] = useState([]);
  const [summary, setSummary] = useState({
    totalIncome: 0,
    totalExpense: 0,
    balance: 0,
  });

    useEffect(() => {
   
    if (isAuthenticated) {
      // Fetch summary data from the backend with authentication
      axios
        .get('/api/transaction-summary', {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        })
        .then((response) => setSummary(response.data))
        .catch((error) => console.error('Error fetching summary:', error));

      // Fetch top expenses data from the backend with authentication
      axios
        .get('/api/top-expenses', {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        })
        .then((response) => setTopExpenses(response.data))
        .catch((error) => console.error('Error fetching top expenses:', error));
    }
  }, [isAuthenticated, user.token]);

  return (
    <>

     <Header/>

      <div >

        <div className="dashboard-container">
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
        </div>
        <div className='container'>
          <div className="left-column">
            <h2>Income Vs Expense</h2>
            <ChartComponent totalIncome={summary.totalIncome} totalExpense={summary.totalExpense} />
          </div>
          <div className="right-column">

            <AnalyticsPage />
          </div>
        </div>
        <div className='container'>

          <div className="left-column">
            <h2>Top Recent Transaction</h2>
            <ul>
              {topExpenses.map((expense, index) => (
                <li key={index}>
                  <span className="expense-date">{expense.date}</span>
                  <span className="expense-description">{expense.description}</span>
                  <span className="expense-amount">{expense.amount}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="right-column">
            <MonthlySpendingChart />
          </div>
        </div>
      </div>
    </>
  );
};
export default DashboardPage;
