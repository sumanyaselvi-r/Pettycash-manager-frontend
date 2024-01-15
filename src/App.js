
import './App.css';
import Header from './Header';
import Sidebar from './Sidebar';
import Home from './Home'
import { useState } from 'react';
import { Routes,Route } from 'react-router-dom';
import TransactionList from './TransactionList';
import TransactionForm from './TransactionForm';
import DashboardPage from './Dashboard';
import Navbar from './Navbar';
import ReportPage from './Reportpage';
import BudgetManagement from './BudgetManagement';
import AnalyticsPage from './AnalyticsPage';
import BudgetList from './BudgetList';
import { Calendar } from 'react-big-calendar';
import MyCalendarPage from './Calendar';
import BudgetPage from './Budgetpage';

function App() {
  


  return (
   <>
      <div className="app-container">
        <Navbar />
        <div className="content-container">
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/transactionlist" element={<TransactionList />} />
          
            <Route path="/reports" element={<ReportPage/>} />
            <Route path="/budgets" element={<BudgetPage/>} />
            <Route path="/Calendar" element={<MyCalendarPage/>} />
          </Routes>
          </div>
      </div>
   
   </>
  );
}

export default App;
