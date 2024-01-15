// EditableTransaction.js

import React, { useState } from 'react';
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";

const EditableTransaction = ({ transaction, onEdit, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTransaction, setEditedTransaction] = useState({
    description: transaction.description,
    amount: transaction.amount,
    category: transaction.category,
    type: transaction.type,
  });

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    // Save the edited transaction and update the state
    onEdit({
      ...transaction,
      ...editedTransaction,
    });

    // Exit editing mode
    setIsEditing(false);
  };

  const handleCancelClick = () => {
    // Cancel editing and revert changes
    setEditedTransaction({
      description: transaction.description,
      amount: transaction.amount,
      category: transaction.category,
      type: transaction.type,
    });

    // Exit editing mode
    setIsEditing(false);
  };

  const handleChange = (e) => {
    // Update the editedTransaction state
    setEditedTransaction({
      ...editedTransaction,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <tr>
      <td>{transaction.date}</td>
      <td>{isEditing ? <input type="text" name="description" value={editedTransaction.description} onChange={handleChange} /> : transaction.description}</td>
      <td>{isEditing ? <input type="number" name="amount" value={editedTransaction.amount} onChange={handleChange} /> : transaction.amount}</td>
      <td>{isEditing ? <input type="text" name="category" value={editedTransaction.category} onChange={handleChange} /> : transaction.category}</td>
      <td>{isEditing ? <input type="text" name="type" value={editedTransaction.type} onChange={handleChange} /> : transaction.type}</td>
      <td>
        {isEditing ? (
          <>
            <button onClick={handleSaveClick}>Save</button>
            <button onClick={handleCancelClick}>Cancel</button>
          </>
        ) : (
          <button onClick={handleEditClick} className='action-buttons' id='edit-button'><MdEdit/>
</button>

        )}
        <button onClick={() => onDelete(transaction._id)} className='action-buttons' id='delete-button'><MdDelete />
</button>

      </td>
    </tr>
  );
};

export default EditableTransaction;

