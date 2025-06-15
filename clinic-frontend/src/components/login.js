

import React, { useState } from 'react';
import axios from 'axios';

function Login({ setToken, setRole }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleLogin = async () => {
    try {
      const res = await axios.post('http://localhost:8080/login', { username, password });
      const token = res.data.token;
      setToken(token);
      const payload = JSON.parse(atob(token.split('.')[1]));
      setRole(payload.role);
      setSuccessMessage('Login successful!');
    } catch (err) {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-br from-blue-100 to-indigo-200">
      <div className="bg-white shadow-xl rounded-xl p-10 w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-indigo-700">Clinic Login</h2>
        {successMessage && <p className="text-green-600 text-center mb-4">{successMessage}</p>}
        <input
          className="w-full mb-4 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          className="w-full mb-6 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          onClick={handleLogin}
          className="w-full bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 transition"
        >
          Login
        </button>
      </div>
    </div>
  );
}

export default Login;

