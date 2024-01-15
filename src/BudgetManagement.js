// BudgetPage.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BudgetPage = () => {
  const [budget, setBudget] = useState(0);
  const [expenses, setExpenses] = useState([]);
  const [category, setCategory] = useState('');
  const [expenseAmount, setExpenseAmount] = useState('');
  const [budgetAmountInput, setBudgetAmountInput] = useState('');

  useEffect(() => {
    // Fetch budget and expenses data from the backend when the page loads
    fetchBudgetAndExpenses();
  }, []);

  const fetchBudgetAndExpenses = async () => {
    try {
      // Fetch budget data from the backend using Axios
      const budgetResponse = await axios.get('/api/budget');
      setBudget(budgetResponse.data.amount);

      // Fetch expenses data from the backend using Axios
      const expensesResponse = await axios.get('/api/expenses');
      setExpenses(expensesResponse.data);
    } catch (error) {
      console.error('Error fetching data:', error.message);
    }
  };

  const handleSaveBudget = async () => {
    try {
      // Send a request to save the budget using Axios
      const response = await axios.post('/api/budget', { amount: budgetAmountInput });

      if (response.status === 201) {
        setBudget(budgetAmountInput);
        setBudgetAmountInput('');
      }
    } catch (error) {
      console.error('Error saving budget:', error.message);
    }
  };

  const handleAddExpense = async () => {
    try {
      // Send a request to add an expense using Axios
      const response = await axios.post('/api/expenses', { category, amount: expenseAmount });

      if (response.status === 201) {
        // Refresh the expenses data
        fetchBudgetAndExpenses();
        setCategory('');
        setExpenseAmount('');
      }
    } catch (error) {
      console.error('Error adding expense:', error.message);
    }
  };

  return (
    <div>
      <h2>Budget Page</h2>
      
      {/* Budget Form */}
      <form onSubmit={(e) => { e.preventDefault(); handleSaveBudget(); }}>
        <label>
          Budget Amount:
          <input
            type="number"
            value={budgetAmountInput}
            onChange={(e) => setBudgetAmountInput(e.target.value)}
          />
        </label>
        <button type="submit">Set Budget</button>
      </form>
      
      {/* Expenses Form */}
      <div>
        <h3>Expenses</h3>
        <label>
          Category:
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </label>
        <label>
          Amount:
          <input
            type="number"
            value={expenseAmount}
            onChange={(e) => setExpenseAmount(e.target.value)}
          />
        </label>
        <button type="button" onClick={handleAddExpense}>
          Add Expense
        </button>
        <ul>
          {expenses.map((expense) => (
            <li key={expense._id}>
              {expense.category}: ${expense.amount}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default BudgetPage;
