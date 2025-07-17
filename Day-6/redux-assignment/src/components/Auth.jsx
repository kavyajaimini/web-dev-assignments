
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { login, logout } from '../features/auth/authSlice';

export default function Auth() {
  const dispatch = useDispatch();
  const isAuth = useSelector(s => s.auth.isAuthenticated);
  const user = useSelector(s => s.auth.user);
  const [name, setName] = useState('');

  const handleLogin = () => {
    if (name.trim()) dispatch(login(name.trim()));
    setName('');
  };

  return isAuth ? (
    <div style={{marginBottom:16}}>
      <span>Welcome, {user}!</span>
      <button onClick={() => dispatch(logout())} style={{marginLeft:8}}>Logout</button>
    </div>
  ) : (
    <div style={{marginBottom:16}}>
      <input
        placeholder="Enter name..."
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}
