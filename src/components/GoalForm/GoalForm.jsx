// GoalForm.jsx - Handles adding and editing financial goals
import React, { useState } from 'react';
import './GoalForm.css';

const GoalForm = ({ goals, setGoals }) => {
  const [formData, setFormData] = useState({
    name: '',
    targetAmount: '',
    category: 'General',
    deadline: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('http://localhost:3001/goals', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const newGoal = await response.json();
      setGoals([...goals, newGoal]);
      
      // Reset form
      setFormData({
        name: '',
        targetAmount: '',
        category: 'General',
        deadline: ''
      });
    } catch (error) {
      console.error('Error adding goal:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="goal-form">
      <h2>Add New Goal</h2>
      
      <div className="form-group">
        <label>Goal Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      
      <div className="form-group">
        <label>Target Amount ($):</label>
        <input
          type="number"
          name="targetAmount"
          value={formData.targetAmount}
          onChange={handleChange}
          min="1"
          required
        />
      </div>
      
      <div className="form-group">
        <label>Category:</label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
        >
          <option value="General">General</option>
          <option value="Travel">Travel</option>
          <option value="Emergency">Emergency</option>
          <option value="Education">Education</option>
          <option value="Home">Home</option>
          <option value="Vehicle">Vehicle</option>
        </select>
      </div>
      
      <div className="form-group">
        <label>Deadline:</label>
        <input
          type="date"
          name="deadline"
          value={formData.deadline}
          onChange={handleChange}
          required
        />
      </div>
      
      <button type="submit" className="submit-btn">Add Goal</button>
    </form>
  );
};

export default GoalForm;