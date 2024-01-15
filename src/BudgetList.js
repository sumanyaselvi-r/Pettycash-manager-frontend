// BudgetPage.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BudgetPage = () => {
  const [budgets, setBudgets] = useState([]);
  const [newBudget, setNewBudget] = useState('');
  const [editedBudget, setEditedBudget] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(null);

  useEffect(() => {
    // Fetch budgets from the server on component mount
    fetchBudgets();
  }, []);

  const fetchBudgets = () => {
    axios.get('/api/budgets')
      .then((response) => setBudgets(response.data))
      .catch((error) => console.error('Error fetching budgets:', error));
  };

  const handleAddBudget = () => {
    axios.post('/api/budgets', { amount: newBudget })
      .then(() => {
        setNewBudget('');
        fetchBudgets();
      })
      .catch((error) => console.error('Error adding budget:', error));
  };

  const handleEditBudget = (budget) => {
    setEditedBudget(budget);
  };

  const handleSaveEdit = () => {
    axios.put(`/api/budgets/${editedBudget._id}`, { amount: editedBudget.amount })
      .then(() => {
        setEditedBudget(null);
        fetchBudgets();
      })
      .catch((error) => console.error('Error editing budget:', error));
  };

  const handleDeleteBudget = (budgetId) => {
    axios.delete(`your-api-url/api/budgets/${budgetId}`)
      .then(() => {
        setShowDeleteModal(null);
        fetchBudgets();
      })
      .catch((error) => console.error('Error deleting budget:', error));
  };

  return (
    <div>
      <h1>Budget Page</h1>
      
      {/* Add Budget Form */}
      <div>
        <label>
          Budget Amount:
          <input
            type="number"
            value={newBudget}
            onChange={(e) => setNewBudget(e.target.value)}
            required
          />
        </label>
        <button onClick={handleAddBudget}>Add Budget</button>
      </div>

      {/* Display Budgets */}
      <ul>
        {Array.isArray(budgets) ? (
          budgets.map((budget) => (
            <li key={budget._id}>
              {editedBudget === budget ? (
                <>
                  <label>
                    New Amount:
                    <input
                      type="number"
                      value={editedBudget.amount}
                      onChange={(e) => setEditedBudget({ ...editedBudget, amount: e.target.value })}
                      required
                    />
                  </label>
                  <button onClick={handleSaveEdit}>Save</button>
                </>
              ) : (
                <>
                  {budget.amount} {' | '}
                  <button onClick={() => handleEditBudget(budget)}>Edit</button>
                  <button onClick={() => setShowDeleteModal(budget)}>Delete</button>
                </>
              )}
            </li>
          ))
        ) : (
          <p>No budgets available</p>
        )}
      </ul>

      {/* Confirm Delete Modal */}
      {showDeleteModal && (
        <div>
          <h2>Confirm Delete</h2>
          <p>Are you sure you want to delete this budget?</p>
          <button onClick={() => handleDeleteBudget(showDeleteModal._id)}>Delete</button>
          <button onClick={() => setShowDeleteModal(null)}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default BudgetPage;
