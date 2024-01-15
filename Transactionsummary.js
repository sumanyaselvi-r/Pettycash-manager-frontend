// TransactionSummary.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TransactionSummary = () => {
  const [summary, setSummary] = useState({});

  useEffect(() => {
    // Fetch transaction summary from the backend
    axios.get('/api/summary')
      .then((response) => setSummary(response.data))
      .catch((error) => console.error('Error fetching summary:', error));
  }, []);

  return (
    <div>
      <h2>Transaction Summary</h2>
      <p>Total Income: {summary.totalIncome}</p>
      <p>Total Expense: {summary.totalExpense}</p>
      {/* Add more summary details as needed */}
    </div>
  );
};

export default TransactionSummary;
