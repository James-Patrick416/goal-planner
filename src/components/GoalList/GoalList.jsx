// src/components/GoalList/GoalList.jsx
import React from 'react';
import ProgressBar from '../ProgressBar/ProgressBar';
import { formatDistanceToNow } from 'date-fns';
import './GoalList.css';

const GoalList = ({ goals, setGoals, deposits }) => {
  // Calculate progress for each goal
  const getProgressData = (goal) => {
    const goalDeposits = deposits.filter(d => d.goalId === goal.id);
    const totalSaved = goalDeposits.reduce((sum, deposit) => sum + deposit.amount, 0);
    const progress = (totalSaved / goal.targetAmount) * 100;
    const remaining = goal.targetAmount - totalSaved;
    
    return { totalSaved, progress, remaining };
  };

  // Check if goal is overdue or nearing deadline
  const getGoalStatus = (goal) => {
    const today = new Date();
    const deadline = new Date(goal.deadline);
    const daysLeft = Math.ceil((deadline - today) / (1000 * 60 * 60 * 24));
    const { progress } = getProgressData(goal);
    
    if (progress >= 100) return 'Completed';
    if (daysLeft < 0) return 'Overdue';
    if (daysLeft <= 30) return 'Warning';
    return 'On Track';
  };

  const handleDelete = async (goalId) => {
    try {
      await fetch(`https://goal-planner-kz4h.onrender.com/goals/${goalId}`, {
        method: 'DELETE',
      });
      setGoals(goals.filter(goal => goal.id !== goalId));
    } catch (error) {
      console.error('Error deleting goal:', error);
    }
  };

  return (
    <div className="goal-list">
      <h2>Your Goals</h2>
      
      {goals.length === 0 ? (
        <p>No goals yet. Add your first goal above!</p>
      ) : (
        <ul>
          {goals.map(goal => {
            const { totalSaved, progress, remaining } = getProgressData(goal);
            const status = getGoalStatus(goal);
            const deadlineDate = new Date(goal.deadline);
            
            return (
              <li key={goal.id} className={`goal-item ${status.toLowerCase()}`}>
                <div className="goal-header">
                  <h3>{goal.name}</h3>
                  <span className="category">{goal.category}</span>
                  <button 
                    onClick={() => handleDelete(goal.id)}
                    className="delete-btn"
                  >
                    Delete
                  </button>
                </div>
                
                <div className="goal-details">
                  <p>Target: ${goal.targetAmount.toLocaleString()}</p>
                  <p>Saved: ${totalSaved.toLocaleString()}</p>
                  <p>Remaining: ${remaining.toLocaleString()}</p>
                  <p>
                    Deadline: {deadlineDate.toLocaleDateString()}
                    ({formatDistanceToNow(deadlineDate, { addSuffix: true })})
                  </p>
                </div>
                
                <ProgressBar progress={progress} status={status} />
                
                {status === 'Warning' && (
                  <p className="warning-text">
                    ⚠️ Deadline is approaching! Only {formatDistanceToNow(deadlineDate)} left.
                  </p>
                )}
                
                {status === 'Overdue' && (
                  <p className="overdue-text">
                    ⚠️ Deadline has passed! Consider adjusting your goal.
                  </p>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default GoalList;