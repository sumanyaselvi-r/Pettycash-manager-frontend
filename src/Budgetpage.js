// BudgetPage.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BudgetPage = () => {
  const [income, setIncome] = useState(0);
  const [expenseCategory, setExpenseCategory] = useState('');
  const [expenseAmount, setExpenseAmount] = useState(0);
  const [expenses, setExpenses] = useState([]);
  const [totalExpense, setTotalExpense] = useState(0);
  const [budgetBalance, setBudgetBalance] = useState(0);
  const [budgetLimits, setBudgetLimits] = useState({});

  // Fetch total expenses, budget balance, and budget limits on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [transactionSummary, budgetLimitsResponse] = await Promise.all([
          axios.get('/api/transaction-summary'),
          axios.get('/api/budget-limits'),
        ]);

        setTotalExpense(transactionSummary.data.totalExpense);
        setBudgetBalance(transactionSummary.data.balance);
        setIncome(transactionSummary.data.totalIncome);
        setBudgetLimits(budgetLimitsResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures that this effect runs once on mount

  const addExpense = async () => {
    if (expenseCategory && expenseAmount > 0) {
      try {
        // Send the new expense to the server
        const response = await axios.post('/api/transactions', {
          type: 'expense',
          category: expenseCategory,
          amount: expenseAmount,
          date: new Date().toISOString(),
        });

        // Update local state with the new expense
        setExpenses([...expenses, response.data]);
        setTotalExpense(totalExpense + expenseAmount);
        setBudgetBalance(income - (totalExpense + expenseAmount));

        // Clear expense input fields
        setExpenseCategory('');
        setExpenseAmount(0);
      } catch (error) {
        console.error('Error adding expense:', error);
      }
    }
  };

  const setBudgetLimit = async (category, limit) => {
    try {
      // Send the new budget limit to the server
      await axios.post('/api/budget-limits', { category, limit });

      // Update local state with the new budget limit
      setBudgetLimits({ ...budgetLimits, [category]: limit });
    } catch (error) {
      console.error('Error setting budget limit:', error);
    }
  };

  const calculateRemainingBudget = () => {
    return income - totalExpense;
  };

  return (
    <div>
      <h2>Budget Page</h2>

      {/* Budget Management */}
      <div>
        <h3>Budget Management</h3>
        <table>
          <thead>
            <tr>
              <th>Category</th>
              <th>Current Limit</th>
              <th>Set Limit</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(budgetLimits).map((category) => (
              <tr key={category}>
                <td>{category}</td>
                <td>${budgetLimits[category]}</td>
                <td>
                  <input
                    type="number"
                    value={budgetLimits[category]}
                    onChange={(e) => setBudgetLimit(category, parseFloat(e.target.value))}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Budget Summary */}
      <div>
        <h3>Budget Summary</h3>
        <p>Total Income: ${income}</p>
        <p>Total Expenses: ${totalExpense}</p>
        <p>Remaining Budget: ${calculateRemainingBudget()}</p>
      </div>
    </div>
  );
};

export default BudgetPage;
