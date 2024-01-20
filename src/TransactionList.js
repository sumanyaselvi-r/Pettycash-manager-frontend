import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TransactionForm from './TransactionForm';
import EditableTransaction from './EditableTransaction';
import { FaPlus } from "react-icons/fa";
import { useAuth } from './AuthContext';

const TransactionList = () => {
  const { isAuthenticated, user } = useAuth();

  const [transactions, setTransactions] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [sortBy, setSortBy] = useState('date');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (isAuthenticated) {
      axios
        .get(`https://pettycashbackend.onrender.com/api/transactions?userId=${user.userId}&sortBy=${sortBy}&searchTerm=${searchTerm}`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        })
        .then((response) => setTransactions(response.data))
        .catch((error) => console.error('Error fetching transactions:', error));
    }
  }, [isAuthenticated, user.userId, user.token, sortBy, searchTerm]);
  // Function to add a transaction
  const addTransaction = (newTransaction) => {

    console.log('Adding transaction:', newTransaction);
    console.log('userId:', user.userId)
    console.log('usertoken:', user.token)
    if (isAuthenticated) {
      console.log('Sending request:', newTransaction);
      axios.post('https://pettycashbackend.onrender.com/api/transactions', { ...newTransaction, userId: user.userId }, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
        .then((response) => {
          console.log('Response data:', response.data);
          setTransactions((prevTransactions) => [...prevTransactions, response.data]);
          setShowForm(false);
        })
        .catch((error) => console.error('Error adding transaction:', error));
    } else {
      console.log('Not authenticated, request not sent');
    }

  };
  // Function to edit a transaction
  const editTransaction = (editedTransaction) => {
    axios
      .put(`https://pettycashbackend.onrender.com/api/transactions/${editedTransaction._id}`, editedTransaction, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((response) => {
        const updatedTransactions = transactions.map((t) =>
          t._id === response.data._id ? response.data : t
        );
        setTransactions(updatedTransactions);
        setEditingTransaction(null);
      })
      .catch((error) => console.error('Error editing transaction:', error));
  };

  // Function to delete a transaction
  const deleteTransaction = (transactionId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this transaction?');
    if (confirmDelete) {
      axios
        .delete(`https://pettycashbackend.onrender.com/api/transactions/${transactionId}`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        })
        .then(() => setTransactions(transactions.filter((t) => t._id !== transactionId)))
        .catch((error) => console.error('Error deleting transaction:', error));
    }

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

    setTransactions([]);


    const sortOrder = sortBy === 'date' ? 'desc' : 'asc';

    axios
      .get(`https://pettycashbackend.onrender.com/api/transactions?sortBy=${sortBy}&sortOrder=${sortOrder}`)
      .then((response) => setTransactions(response.data))
      .catch((error) => console.error('Error fetching transactions:', error));
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
  const handleAddButtonClick = () => {

    setShowForm(true);
  };


  return (
    <>


      <header className='header'>
        <div className='menu-icon'>

        </div>
        <div className='header-left'>
          <h2 style={{ color: 'black' }}>Transaction History</h2>
        </div>
        <div className='header-center'>
          <div className='search-container'>

            <input type="text" id="search" value={searchTerm} onChange={handleSearchChange} placeholder='Search transaction...' className='input-field' />
          </div>
        </div>
        <div className='header-right'>


          <button onClick={handleAddButtonClick} className='button'><FaPlus /></button>




          <label htmlFor="sortBy" >Sort By:</label>
          <select id="sortBy" value={sortBy} onChange={handleSortChange} className='select-field' style={{ marginRight: '12px' }}>
            <option value="date">Date</option>
            <option value="amount">Amount</option>
          </select>


        </div>
      </header>
      <br></br><br></br>
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
        <p style={{fontFamily:'PT serif',fontSize:'20px',color:'red'}}>Transaction list empty click the + button add your transation....</p>
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
                key={transaction._id}
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



