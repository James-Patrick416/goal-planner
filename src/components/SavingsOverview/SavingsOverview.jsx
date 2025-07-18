// SavingsOverview.jsx - Shows summary statistics of all goals
import React from 'react';
import './SavingsOverview.css';

const SavingsOverview = ({ goals, deposits }) => {
  // Calculate total saved across all goals
  const totalSaved = goals.reduce((sum, goal) => {
    const goalDeposits = deposits.filter(d => d.goalId === goal.id);
    return sum + goalDeposits.reduce((sum, deposit) => sum + deposit.amount, 0);
  }, 0);

  // Count completed goals
  const completedGoals = goals.filter(goal => {
    const goalDeposits = deposits.filter(d => d.goalId === goal.id);
    const totalSaved = goalDeposits.reduce((sum, deposit) => sum + deposit.amount, 0);
    return totalSaved >= goal.targetAmount;
  }).length;

  return (
    <div className="savings-overview">
      <h2>Savings Overview</h2>
      
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Goals</h3>
          <p>{goals.length}</p>
        </div>
        
        <div className="stat-card">
          <h3>Completed Goals</h3>
          <p>{completedGoals}</p>
        </div>
        
        <div className="stat-card">
          <h3>Total Saved</h3>
          <p>${totalSaved.toLocaleString()}</p>
        </div>
        
        <div className="stat-card">
          <h3>Active Goals</h3>
          <p>{goals.length - completedGoals}</p>
        </div>
      </div>
    </div>
  );
};

export default SavingsOverview;