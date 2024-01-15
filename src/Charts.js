// ChartComponent.js
import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const ChartComponent = ({ totalIncome, totalExpense }) => {
  const chartRef = useRef();
  const chartInstance = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');

    // Destroy existing chart if it exists
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    // Create a new chart
    chartInstance.current = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Total Income', 'Total Expense'],
        datasets: [{
          label: 'Amount',
          data: [totalIncome, totalExpense],
          backgroundColor: ['#36A2EB', '#FF6384'],
          borderColor: ['#36A2EB', '#FF6384'],
          borderWidth: 1,
        },{
          label: 'Expenses',
          backgroundColor: '#FF6384',
          borderColor: '#FF6384',
          borderWidth: 1,}],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });

    // Clean up on component unmount
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [totalIncome, totalExpense]);

  return (
    <div>
      <canvas ref={chartRef} width={400} height={300} />
    </div>
  );
};

export default ChartComponent;
