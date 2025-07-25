// Dashboard.jsx - The main dashboard page that brings all components together
import React, { useState, useEffect } from 'react';
import GoalList from '../components/GoalList/GoalList';
import GoalForm from '../components/GoalForm/GoalForm';
import DepositForm from '../components/DepositForm/DepositForm';
import SavingsOverview from '../components/SavingsOverview/SavingsOverview';
import SavingsChart from '../components/SavingsChart/SavingsChart';
import './Dashboard.css';

const Dashboard = () => {
  // State for goals and deposits
  const [goals, setGoals] = useState([]);
  const [deposits, setDeposits] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch data when component mounts
  useEffect(() => {
    // Fetch goals and deposits from json-server
    const fetchData = async () => {
      try {
        const [goalsRes, depositsRes] = await Promise.all([
          fetch('https://goal-planner-kz4h.onrender.com/goals'),
          fetch('https://goal-planner-kz4h.onrender.com/deposits')
        ]);
        
        const goalsData = await goalsRes.json();
        const depositsData = await depositsRes.json();
        
        setGoals(goalsData);
        setDeposits(depositsData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="dashboard">
      <h1>Smart Goal Planner</h1>
      
      <div className="dashboard-grid">
        <div className="goals-section">
          <GoalForm goals={goals} setGoals={setGoals} />
          <GoalList 
            goals={goals} 
            setGoals={setGoals} 
            deposits={deposits} 
          />
        </div>
        
        <div className="deposits-section">
          <DepositForm 
            goals={goals} 
            deposits={deposits} 
            setDeposits={setDeposits} 
          />
        </div>
        
        <div className="overview-section">
          <SavingsOverview goals={goals} deposits={deposits} />
          <SavingsChart goals={goals} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;