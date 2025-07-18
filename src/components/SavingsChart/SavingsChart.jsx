// SavingsChart.jsx - Visualizes savings by category using a pie chart
import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import './SavingsChart.css';

ChartJS.register(ArcElement, Tooltip, Legend);

const SavingsChart = ({ goals }) => {
  // Group savings by category
  const categories = [...new Set(goals.map(goal => goal.category))];
  
  const data = {
    labels: categories,
    datasets: [
      {
        data: categories.map(category => 
          goals
            .filter(goal => goal.category === category)
            .reduce((sum, goal) => sum + goal.targetAmount, 0)
        ),
        backgroundColor: [
          '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        position: 'right',
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            const label = context.label || '';
            const value = context.raw || 0;
            return `${label}: $${value.toLocaleString()}`;
          }
        }
      }
    },
  };

  return (
    <div className="savings-chart">
      <h2>Savings by Category</h2>
      {goals.length > 0 ? (
        <Pie data={data} options={options} />
      ) : (
        <p>No goals to display</p>
      )}
    </div>
  );
};

export default SavingsChart;