import React, { useState } from 'react';

const Auth = ({ onLoginSuccess, onAdminLogin, styles }) => {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [shopName, setShopName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(''); // Clear previous messages

    const url = isRegister ? 'https://fs-order-6thtkdxyw-amandeep-singhs-projects-fef51fc7.vercel.app/auth/register' : 'https://fs-order-6thtkdxyw-amandeep-singhs-projects-fef51fc7.vercel.app/auth/login';
    const method = 'POST';
    const body = isRegister ? JSON.stringify({ email, password, mobileNumber, shopName }) : JSON.stringify({ email, password });

    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body,
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(isRegister ? 'Registration successful! Please log in.' : 'Login successful!');
        if (!isRegister) {
          // Assuming the token is in data.token after successful login
          onLoginSuccess(data.token, email); 
        }
      } else {
        setMessage(data.message || 'An error occurred.');
      }
    } catch (error) {
      console.error('Error during authentication:', error);
      setMessage('Network error or server is unreachable.');
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>{isRegister ? 'Register' : 'Login'}</h2>
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
        {isRegister && (
          <>
            <input
              type="text"
              placeholder="Mobile Number"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
              style={styles.input}
              required
            />
            <input
              type="text"
              placeholder="Shop Name"
              value={shopName}
              onChange={(e) => setShopName(e.target.value)}
              style={styles.input}
              required
            />
          </>
        )}
        <button type="submit" style={styles.button}>
          {isRegister ? 'Register' : 'Login'}
        </button>
      </form>
      {message && <p style={styles.message}>{message}</p>}
      <p style={styles.toggleText}>
        {isRegister ? 'Already have an account?' : 'Don\'t have an account?'}{' '}
        <span onClick={() => {
          setIsRegister(!isRegister);
          setMessage(''); // Clear message on toggle
        }} style={styles.toggleLink}>
          {isRegister ? 'Login' : 'Register'}
        </span>
      </p>
      <p style={styles.toggleText}>
        Are you an admin?{' '}
        <span onClick={() => onAdminLogin()} style={styles.toggleLink}>
          Admin Login
        </span>
      </p>
    </div>
  );
};

export default Auth;
