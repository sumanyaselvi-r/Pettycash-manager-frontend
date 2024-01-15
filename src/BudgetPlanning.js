import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BudgetPage = () => {
  const [budget, setBudget] = useState({
    totalIncome: 0,
    totalExpenses: 0,
    remainingBudget: 0,
  });

  const [categoryBudgets, setCategoryBudgets] = useState([]);
  const [newCategory, setNewCategory] = useState('');
  const [newBudgetAmount, setNewBudgetAmount] = useState(0);
  const [editedCategory, setEditedCategory] = useState('');

  useEffect(() => {
    // Fetch overall budget data
    axios.get('/api/budget')
      .then(response => {
        setBudget(response.data);
      })
      .catch(error => {
        console.error('Error fetching budget data:', error);
      });

    // Fetch category budgets
    axios.get('/api/category-budgets')
      .then(response => {
        setCategoryBudgets(response.data);
      })
      .catch(error => {
        console.error('Error fetching category budgets:', error);
      });

  }, []); // Empty dependency array to fetch data only once on component mount

  const handleAddCategoryBudget = async () => {
    // Ensure category name and budget amount are provided
    if (newCategory.trim() === '' || newBudgetAmount <= 0) {
      return;
    }

    try {
      // Add or update the category budget on the server
      await axios.post('/api/category-budgets', { category: newCategory, budget: newBudgetAmount });

      // Update the category budgets state
      setCategoryBudgets(prevBudgets => {
        const existingCategory = prevBudgets.find(category => category.category === newCategory);
        if (existingCategory) {
          // Update existing category budget
          return prevBudgets.map(category => {
            if (category.category === newCategory) {
              return { ...category, budget: newBudgetAmount };
            }
            return category;
          });
        } else {
          // Add new category budget
          return [...prevBudgets, { category: newCategory, budget: newBudgetAmount }];
        }
      });

      // Clear the form fields
      setNewCategory('');
      setNewBudgetAmount(0);
    } catch (error) {
      console.error('Error adding category budget:', error);
    }
  };

  const handleEditCategoryBudget = (category) => {
    setEditedCategory(category);
    setNewCategory(category.category);
    setNewBudgetAmount(category.budget);
  };

  const handleDeleteCategoryBudget = async (category) => {
    try {
      // Delete the category budget on the server
      await axios.delete(`/api/category-budgets/${category.category}`);

      // Update the category budgets state
      setCategoryBudgets(prevBudgets => prevBudgets.filter(c => c.category !== category.category));

      // Clear the form fields
      setNewCategory('');
      setNewBudgetAmount(0);
    } catch (error) {
      console.error('Error deleting category budget:', error);
    }
  };

  return (
    <div>
      <h2>Budget Overview</h2>
      <div>
        <p>Total Income: {budget.totalIncome}</p>
        <p>Total Expenses: {budget.totalExpenses}</p>
        <p>Remaining Budget: {budget.remainingBudget}</p>
      </div>

      <h2>Budget Planning</h2>
      <div>
        <h3>Add/Edit Category Budget</h3>
        <label>
          Category:
          <input type="text" value={newCategory} onChange={(e) => setNewCategory(e.target.value)} />
        </label>
        <label>
          Budget Amount:
          <input type="number" value={newBudgetAmount} onChange={(e) => setNewBudgetAmount(Number(e.target.value))} />
        </label>
        <button onClick={handleAddCategoryBudget}>Add/Edit Category Budget</button>
      </div>

      <div>
        <h3>Existing Category Budgets</h3>
        <ul>
          {categoryBudgets.map(category => (
            <li key={category.category}>
              {category.category} - Budget: {category.budget}
              <button onClick={() => handleEditCategoryBudget(category)}>Edit</button>
              <button onClick={() => handleDeleteCategoryBudget(category)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default BudgetPage;
