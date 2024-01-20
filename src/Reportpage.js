import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useAuth } from './AuthContext';

const ReportPage = () => {
  const [reportType, setReportType] = useState('all');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const { user } = useAuth(); 

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        let url = `https://pettycashbackend.onrender.com/api/transactions/report?type=${reportType}`;

        if (reportType === 'custom' && startDate && endDate) {
          url += `&startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`;
        }

        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${user.token}`, // Include the authentication token in the headers
          },
        });
        setTransactions(response.data);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };

    fetchTransactions();
  }, [reportType, startDate, endDate, user.token]);

  const handleExport = async (format) => {
    try {
      let url = `https://pettycashbackend.onrender.com/api/transactions/export?type=${reportType}&format=${format}`;

      if (reportType === 'custom' && startDate && endDate) {
        url += `&startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`;
      }

      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${user.token}`, // Include the authentication token in the headers
        },
        responseType: 'blob',
      });

      const blob = new Blob([response.data], { type: `application/${format === 'pdf' ? 'pdf' : 'csv'}` });

      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = `transactions_report_${reportType}.${format}`;
      link.click();
    } catch (error) {
      console.error(`Error exporting transactions as ${format}:`, error);
    }
  };

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    printWindow.document.write('<html><head><title>Print</title></head><body>');
    printWindow.document.write('<h1>Transactions Report</h1>');

    printWindow.document.write('<table border="1">');
    printWindow.document.write('<thead><tr><th>Date</th><th>Description</th><th>Amount</th></tr></thead><tbody>');

    transactions.forEach((transaction) => {
      printWindow.document.write(`<tr><td>${transaction.date}</td><td>${transaction.description}</td><td>${transaction.amount}</td></tr>`);
    });

    printWindow.document.write('</tbody></table>');
    printWindow.document.write('</body></html>');

    printWindow.print();
    printWindow.document.close();
  };

  return (
    <>
    <h1 style={styles.h1}>Transaction Report</h1><br/><br/>
    <div style={styles.container}>
     
      <label style={styles.label}>Select Date Range:</label>
      <select style={styles.select} value={reportType} onChange={(e) => setReportType(e.target.value)}>
        <option value="all">All</option>
        <option value="monthly">Monthly</option>
        <option value="yearly">Yearly</option>
        <option value="custom">Custom</option>
      </select>

      {reportType === 'custom' && (
        <div>
          <label style={styles.label}>Start Date:</label>
          <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} style={styles.datePicker} /><br/><br/>

          <label style={styles.label}>End Date:</label>
          <DatePicker selected={endDate} onChange={(date) => setEndDate(date)} style={styles.datePicker} />
        </div>
      )}

      <table style={styles.table}>
        <thead>
          <tr>
            <th>Date</th>
            <th>Description</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction._id}>
              <td>{transaction.date}</td>
              <td>{transaction.description}</td>
              <td>{transaction.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <button style={styles.button} onClick={() => handleExport('pdf')}>Export as PDF</button>
      <button style={styles.button} onClick={() => handleExport('csv')}>Export as CSV</button>
      <button style={styles.button} onClick={handlePrint}>Print</button>
    </div>
    </>
  );
};

const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    maxWidth: '800px',
    margin: 'auto',
    padding: '20px',
    backgroundColor: '#f8f8f8',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  },
  h1: {
    textAlign: 'center',
    fontFamily: 'PT Serif, serif',
    color: '#333',
  },
  label: {
    display: 'block',
    margin: '10px 0',
    color: '#555',
  },
  select: {
    width: '100%',
    padding: '8px',
    margin: '10px 0',
    borderRadius: '5px',
    border: '1px solid #ccc',
    backgroundColor: '#fff',
  },
  datePicker: {
    width: '100%',
    padding: '8px',
    margin: '5px 0',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '20px',
  },
  button: {
    backgroundColor: '#2ecc71',
    color: '#fff',
    padding: '10px 20px',
    borderRadius: '5px',
    cursor: 'pointer',
    margin: '10px 5px',
    border: 'none',
  },
};

export default ReportPage;
