
import React from 'react';
import Navbar from './Navbar';
import { Route, Routes } from 'react-router-dom';
import DashboardPage from './Dashboard';
import TransactionList from './TransactionList';
import ReportPage from './Reportpage';
import MyCalendarPage from './Calendar';
import './App.css'
import LogoutButton from './Logout';

function Manager() {
  return (
    <>
      <div className="app-container">
        <Navbar />
        <div className="content-container">
          <Routes>
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="transactionlist" element={<TransactionList />} />
            <Route path="reports" element={<ReportPage />} />
            <Route path="calendar" element={<MyCalendarPage />} />
            <Route path="logout" element={<LogoutButton/>} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default Manager;
