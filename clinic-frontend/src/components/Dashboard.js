
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PatientForm from './PatientForm';

function Dashboard({ token, role }) {
  const [patients, setPatients] = useState([]);
  const [editPatient, setEditPatient] = useState(null);

  const fetchPatients = async () => {
    const res = await axios.get('http://localhost:8080/api/patients', {
      headers: { Authorization: `Bearer ${token}` },
    });
    setPatients(res.data);
  };

  const handleDelete = async (id) => {
    if (role !== 'receptionist') return;
    await axios.delete(`http://localhost:8080/api/patients/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchPatients();
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Dashboard ({role})</h2>
      </div>
      {role === 'receptionist' && (
        <PatientForm token={token} onDone={fetchPatients} patient={editPatient} />
      )}
      <div className="overflow-x-auto rounded-lg shadow">
        <table className="min-w-full bg-white">
          <thead className="bg-indigo-600 text-white">
            <tr>
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Age</th>
              <th className="p-4 text-left">Illness</th>
              <th className="p-4 text-left">Doctor</th>
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((p) => (
              <tr key={p.ID} className="border-t hover:bg-gray-50">
                <td className="p-4">{p.Name}</td>
                <td className="p-4">{p.Age}</td>
                <td className="p-4">{p.Illness}</td>
                <td className="p-4">{p.AssignedDoctor}</td>
                <td className="p-4 space-x-2">
                  <button
                    onClick={() => setEditPatient(p)}
                    className="bg-yellow-400 text-black px-3 py-1 rounded hover:bg-yellow-500"
                  >
                    Edit
                  </button>
                  {role === 'receptionist' && (
                    <button
                      onClick={() => handleDelete(p.ID)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Dashboard;
