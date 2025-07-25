// DepositForm.jsx - Handles adding deposits to goals
import React, { useState } from 'react';
import './DepositForm.css';

const DepositForm = ({ goals, deposits, setDeposits }) => {
  const [formData, setFormData] = useState({
    amount: '',
    goalId: goals.length > 0 ? goals[0].id : '',
    date: new Date().toISOString().split('T')[0]
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('https://goal-planner-kz4h.onrender.com/deposits', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          amount: Number(formData.amount)
        }),
      });
      
      const newDeposit = await response.json();
      setDeposits([...deposits, newDeposit]);
      
      // Reset form (keep the same goal selected)
      setFormData(prev => ({
        amount: '',
        goalId: prev.goalId,
        date: new Date().toISOString().split('T')[0]
      }));
    } catch (error) {
      console.error('Error adding deposit:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="deposit-form">
      <h2>Make a Deposit</h2>
      
      <div className="form-group">
        <label>Select Goal:</label>
        <select
          name="goalId"
          value={formData.goalId}
          onChange={handleChange}
          required
          disabled={goals.length === 0}
        >
          {goals.length === 0 ? (
            <option value="">No goals available</option>
          ) : (
            goals.map(goal => (
              <option key={goal.id} value={goal.id}>
                {goal.name} (Target: ${goal.targetAmount.toLocaleString()})
              </option>
            ))
          )}
        </select>
      </div>
      
      <div className="form-group">
        <label>Amount ($):</label>
        <input
          type="number"
          name="amount"
          value={formData.amount}
          onChange={handleChange}
          min="1"
          required
        />
      </div>
      
      <div className="form-group">
        <label>Date:</label>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
        />
      </div>
      
      <button 
        type="submit" 
        className="submit-btn"
        disabled={goals.length === 0}
      >
        Add Deposit
      </button>
    </form>
  );
};

export default DepositForm;