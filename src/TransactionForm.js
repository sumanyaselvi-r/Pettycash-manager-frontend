import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faCoffee, 
  faShoppingCart, 
  faHome, 
  faCar, 
  faUtensils,
  faBook,
  faLaptop,
  faTshirt,
} from '@fortawesome/free-solid-svg-icons';
import { MdEmojiTransportation } from "react-icons/md";
const TransactionForm = ({ addTransaction, editTransaction, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    date: '',
    description: '',
    amount: '',
    category: '',
    type: 'expense',
  });

  const categoryIcons = {
    'Coffee': faCoffee,
    'Shopping': faShoppingCart,
    'Home': faHome,
    'Car': faCar,
    'Food': faUtensils,
    'Books': faBook,
    'Electronics': faLaptop,
    'Clothing': faTshirt,
    'Transport':<MdEmojiTransportation />
   
  };

  useEffect(() => {
    if (editTransaction) {
      setFormData({
        date: editTransaction.date,
        description: editTransaction.description,
        amount: editTransaction.amount,
        category: editTransaction.category,
        type: editTransaction.type || 'expense',
      });
    }
  }, [editTransaction]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    if (editTransaction) {
      onSave({ ...formData, _id: editTransaction._id });
    } else {
      const newTransaction = { ...formData, type: formData.type || 'expense' };
      addTransaction(newTransaction);
    }

    setFormData({
      date: '',
      description: '',
      amount: '',
      category: '',
      type: 'expense',
    });
  };

  const handleCancel = () => {
    onCancel();
    // Reset form data
    setFormData({
      date: '',
      description: '',
      amount: '',
      category: '',
      type: '',
    });
  };

  return (
    <div className='form-container'>
      <h2>{editTransaction ? 'Edit Transaction' : 'Add Transaction'}</h2>
      <form>
        <div>
          <label>Date:</label>
          <input type="date" name="date" value={formData.date} onChange={handleChange} required />
        </div>
        <div>
          <label>Description:</label>
          <input type="text" name="description" value={formData.description} onChange={handleChange} required />
        </div>
        <div>
          <label>Amount:</label>
          <input type="number" name="amount" value={formData.amount} onChange={handleChange} required />
        </div>
        <div>
          <label>Category:</label>
          <div>
            {Object.keys(categoryIcons).map((category) => (
              <label key={category}>
                <input
                  type="radio"
                  name="category"
                  value={category}
                  checked={formData.category === category}
                  onChange={handleChange}
                  required
                />
                <FontAwesomeIcon icon={categoryIcons[category]} />
                <span>{category}</span>
              </label>
            ))}
          </div>
        </div>
        <div>
          <label>Type:</label>
          <select name="type" value={formData.type} onChange={handleChange} required>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>
        <div>
          <button type="button" onClick={handleSave} className='form-button'>
            Save
          </button>
          <button type="button" onClick={handleCancel} className='form-button'>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default TransactionForm;
