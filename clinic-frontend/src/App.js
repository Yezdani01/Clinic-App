
import React, { useState } from 'react';
import Login from './components/login';
import Dashboard from './components/Dashboard';

function App() {
  const [token, setToken] = useState(null);
  const [role, setRole] = useState(null);

  const handleLogout = () => {
    setToken(null);
    setRole(null);
  };

  return (
    <div>
      {!token ? (
        <Login setToken={setToken} setRole={setRole} />
      ) : (
        <div className="p-4">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm text-gray-600">Logged in as  : <span className="font-semibold text-green-600">{role}</span></span>
            <button onClick={handleLogout} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">Logout</button>
            {/* <h1 className="text-4xl text-blue-600 font-bold">Tailwind is working</h1> */}

          </div>
          <Dashboard token={token} role={role} />
        </div>
      )}
    </div>
  );
}

export default App;


