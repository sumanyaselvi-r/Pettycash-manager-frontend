// TransactionList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TransactionForm from './TransactionForm';
import EditableTransaction from './EditableTransaction';
import { FaPlus } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";


const TransactionList = () => {
  const [transactions, setTransactions] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [sortBy, setSortBy] = useState('date');
  const [searchTerm, setSearchTerm] = useState('');
  
 
  useEffect(() => {
    axios
      .get(`/api/transactions?sortBy=${sortBy}&searchTerm=${searchTerm}`)
      .then((response) => setTransactions(response.data))
      .catch((error) => console.error('Error fetching transactions:', error));
  }, [sortBy, searchTerm]);


  const addTransaction = (newTransaction) => {
    axios
    .post('/api/transactions', newTransaction)
    .then((response) => {
      setTransactions((prevTransactions) => [...prevTransactions, response.data]);
      setShowForm(false);
    })
    .catch((error) => console.error('Error adding transaction:', error));
  };
  const editTransaction = (editedTransaction) => {
    axios
      .put(`/api/transactions/${editedTransaction._id}?${Math.random()}`, editedTransaction)
      .then((response) => {
        console.log('Response data:', response.data);
        const updatedTransactions = transactions.map((t) =>
          t._id === response.data._id ? response.data : t
        );
        setTransactions(updatedTransactions);
        setEditingTransaction(null);
      })
      .catch((error) => console.error('Error editing transaction:', error));
  };
  
  
  
  

  const deleteTransaction = (transactionId) => {
    // Show a confirmation dialog
    const confirmDelete = window.confirm('Are you sure you want to delete this transaction?');

    if (confirmDelete) {
      // If the user confirms, proceed with the deletion
      axios
        .delete(`/api/transactions/${transactionId}`)
        .then(() => setTransactions(transactions.filter((t) => t._id !== transactionId)))
        .catch((error) => console.error('Error deleting transaction:', error));
    }
    // If the user cancels, do nothing
  };
  const startEdit = (transaction) => {
    setEditingTransaction(transaction);
    setShowForm(true);
  };

  const cancelEdit = () => {
    setEditingTransaction(null);
    setShowForm(false);
  };

  
  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const handleSort = () => {
    // Trigger sorting by updating the sortBy state
    setTransactions([]);
    
    // The useEffect will then fetch the updated sorted data
    const sortOrder = sortBy === 'date' ? 'desc' : 'asc';
    
    axios
      .get(`/api/transactions?sortBy=${sortBy}&sortOrder=${sortOrder}`)
      .then((response) => setTransactions(response.data))
      .catch((error) => console.error('Error fetching transactions:', error));
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
  const handleAddButtonClick = () => {
    // Show the form when the "Add" button is clicked
    setShowForm(true);
  };



  return (
    <>

       
<header  className='header'>
    <div className='menu-icon'>
 
    </div>
    <div className='header-left'>
    <h2 style={{color:'black'}}>Transaction History</h2>
    </div>
    <div className='header-center'>
    <div className='search-container'>
    <CiSearch  className='search-icon'/>
    <input type="text" id="search" value={searchTerm} onChange={handleSearchChange}placeholder='Search transaction...' className='input-field' />
</div>
    </div>
    <div className='header-right'>
    
  
      <button onClick={handleAddButtonClick}  className='button'><FaPlus /></button>
   
 
      
      
        <label htmlFor="sortBy" >Sort By:</label>
        <select id="sortBy" value={sortBy} onChange={handleSortChange} className='select-field' style={{marginRight:'12px'}}>
          <option value="date">Date</option>
          <option value="amount">Amount</option>
        </select>

   
    </div>
</header>
{/* Popup Container */}
{showForm && (
        <div className="popup-container">
          <div className="popup">
            <TransactionForm
              addTransaction={addTransaction}
              editTransaction={editingTransaction}
              onSave={(editedTransaction) => {
                editTransaction(editedTransaction);
                cancelEdit();
              }}
              onCancel={cancelEdit}
            />
          </div>
        </div>
      )}
  
      {transactions.length === 0 ? (
      <p>Loading...</p>
    ) : (

      <table className="table">
        <thead>
          <tr>
            <th scope="col">Date</th>
            <th scope="col">Description</th>
            <th scope="col">Amount</th>
            <th scope="col">Category</th>
            <th scope="col">Type</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
        
        {transactions.map((transaction) => (
  <EditableTransaction
    key={transaction._id}  // Add this line to provide a unique key
    transaction={transaction}
    onEdit={startEdit}
    onDelete={deleteTransaction}
  />
))}
        </tbody>
      </table>
      )}
    </>
  );
};

export default TransactionList;
