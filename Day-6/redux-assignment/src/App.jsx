import React from 'react';
import TaskList from './components/TaskList';
import Auth from './components/Auth';
import { useSelector } from 'react-redux';

function App() {
  const isLoggedIn = useSelector((state) => state.auth.isAuthenticated);

  return (
    <div className="centered-container">
      <h1 className="text-4xl font-extrabold text-white">Redux-Task-Manager</h1>
      <Auth />
      {isLoggedIn && <TaskList />}
    </div>
  );
}

export default App;
