import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const ReportPage = () => {
  const [reportType, setReportType] = useState('all');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    // Fetch transactions based on the selected report type and date range
    const fetchTransactions = async () => {
      try {
        let url = `/api/transactions/report?type=${reportType}`;

        if (reportType === 'custom' && startDate && endDate) {
          url += `&startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`;
        }

        const response = await axios.get(url);
        setTransactions(response.data);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };

    fetchTransactions();
  }, [reportType, startDate, endDate]);

  const handleExport = async (format) => {
    try {
      let url = `/api/transactions/export?type=${reportType}&format=${format}`;

      if (reportType === 'custom' && startDate && endDate) {
        url += `&startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`;
      }

      const response = await axios.get(url, { responseType: 'blob' });
      const blob = new Blob([response.data], { type: `application/${format === 'pdf' ? 'pdf' : 'csv'}` });

      // Download the file
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = `transactions_report_${reportType}.${format}`;
      link.click();
    } catch (error) {
      console.error(`Error exporting transactions as ${format}:`, error);
      // Handle error as needed
    }
  };

  const handlePrint = () => {
    // Open a new window for printing
    const printWindow = window.open('', '_blank');

    // Add content to the new window
    printWindow.document.write('<html><head><title>Print</title></head><body>');
    printWindow.document.write('<h1>Transactions Report</h1>');

    // Add transactions to the print window
    printWindow.document.write('<table border="1">');
    printWindow.document.write('<thead><tr><th>Date</th><th>Description</th><th>Amount</th></tr></thead><tbody>');

    transactions.forEach((transaction) => {
      printWindow.document.write(`<tr><td>${transaction.date}</td><td>${transaction.description}</td><td>${transaction.amount}</td></tr>`);
    });

    printWindow.document.write('</tbody></table>');
    printWindow.document.write('</body></html>');

    // Trigger the print operation
    printWindow.print();
    printWindow.document.close();
  };

  return (
    <div style={styles.container}>
    <h1 style={{textAlign:'center',fontFamily:'PT serif'}}>Transaction Report</h1><br></br><br></br>
    <label style={styles.label}>Select Date Range:</label>
      {/* Dropdown to select report type */}
      <select style={styles.select} value={reportType} onChange={(e) => setReportType(e.target.value)}>
        <option value="all">All</option>
        <option value="monthly">Monthly</option>
        <option value="yearly">Yearly</option>
        <option value="custom">Custom</option>
      </select>

      {/* Date pickers for custom date range */}
      {reportType === 'custom' && (
        <div>
          <label style={styles.label}>Start Date:</label>
          <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} /><br></br><br></br>

          <label style={styles.label}>End Date:</label>
          <DatePicker selected={endDate} onChange={(date) => setEndDate(date)} />
        </div>
      )}

      {/* Transaction list table */}
      <table style={styles.table}>
        {/* Your table header */}
        <thead>
          <tr>
            <th>Date</th>
            <th>Description</th>
            <th>Amount</th>
            {/* Add more columns as needed */}
          </tr>
        </thead>
        {/* Your table body */}
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction._id}>
              <td>{transaction.date}</td>
              <td>{transaction.description}</td>
              <td>{transaction.amount}</td>
              {/* Add more cells as needed */}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Buttons for export and print */}
      <button  style={styles.button} onClick={() => handleExport('pdf')}>Export as PDF</button>
      <button   style={styles.button} onClick={() => handleExport('csv')}>Export as CSV</button>
      <button  style={styles.button} onClick={handlePrint}>Print</button>
    </div>
  );
};

export default ReportPage;
const styles = {
  container: {
    maxWidth: '800px',
    margin: 'auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
  },
  select: {
    width: '15%',
    padding: '10px',
    marginBottom: '10px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    fontSize: '16px',
  },
  label: {
   
    marginTop: '10px',
    marginRight:'12px'
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '20px',
  },
  button: {
    backgroundColor: '#3498db',
    color: '#fff',
    padding: '10px',
    margin: '10px 5px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
  },
};

