// Assuming you have already set up state and useEffect in your component
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TopSpendingCategories = () => {
  const [topCategories, setTopCategories] = useState([]);

  useEffect(() => {
    // Fetch top spending categories when the component mounts or when the time range changes
    fetchTopSpendingCategories('yourTimeRange'); // Replace 'yourTimeRange' with the actual time range parameter
  }, []); // Make sure to include any dependencies if needed

  const fetchTopSpendingCategories = async (timeRange) => {
    try {
      const response = await axios.get(`/api/analytics/top-spending-categories?timeRange=${timeRange}`);
      setTopCategories(response.data);
    } catch (error) {
      console.error('Error fetching top spending categories:', error);
    }
  };

  return (
    <div>
      <h2>Top Spending Categories</h2>
      <ul>
        {topCategories.map((category) => (
          <li key={category._id}>
            {category._id}: {category.totalSpending}
          </li>
        ))}
      </ul>

      {/* Example: Bar chart using Chart.js */}
      {/* Make sure to install Chart.js and react-chartjs-2 package */}
      {/* npm install chart.js react-chartjs-2 */}
      {/* Import necessary components from react-chartjs-2 */}
      {/* import { Bar } from 'react-chartjs-2'; */}

      {/* Use Bar chart to visualize top spending categories */}
      {/* <Bar
        data={{
          labels: topCategories.map((category) => category._id),
          datasets: [
            {
              label: 'Total Spending',
              data: topCategories.map((category) => category.totalSpending),
              backgroundColor: 'rgba(75,192,192,0.2)',
              borderColor: 'rgba(75,192,192,1)',
              borderWidth: 1,
            },
          ],
        }}
        options={{
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        }}
      /> */}
    </div>
  );
};

export default TopSpendingCategories;
