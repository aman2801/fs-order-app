import React, { useState } from 'react';

const AdminLogin = ({ onLoginSuccess, onBack, styles }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(''); // Clear previous messages

    if (email === 'admin@gmail.com' && password === '12345') {
      onLoginSuccess('dummy-admin-token', email);
    } else {
      setMessage('Invalid admin credentials.');
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Admin Login</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
          required
        />
        <button type="submit" style={styles.button}>Login</button>
        <button type="button" onClick={onBack} style={styles.secondaryButton}>Back</button>
      </form>
      {message && <p style={styles.message}>{message}</p>}
    </div>
  );
};

export default AdminLogin;
