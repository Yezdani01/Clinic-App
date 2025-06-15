
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function PatientForm({ token, onDone, patient }) {
  const [form, setForm] = useState({
    Name: '',
    Age: '',
    Illness: '',
    AssignedDoctor: '',
  });

  useEffect(() => {
    if (patient) setForm(patient);
  }, [patient]);

  const handleSubmit = async () => {
    try {
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const method = patient ? axios.put : axios.post;
      const url = patient
        ? `http://localhost:8080/api/patients/${patient.ID}`
        : 'http://localhost:8080/api/patients';

      await method(url, form, config);
      onDone();
      setForm({ Name: '', Age: '', Illness: '', AssignedDoctor: '' });
    } catch (error) {
      alert('Submission failed');
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-8">
      <h3 className="text-xl font-semibold mb-4 text-indigo-700">
        {patient ? 'Edit Patient' : 'Add Patient'}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          className="p-3 border border-gray-300 rounded-lg"
          placeholder="Name"
          value={form.Name}
          onChange={(e) => setForm({ ...form, Name: e.target.value })}
        />
        <input
          className="p-3 border border-gray-300 rounded-lg"
          type="number"
          placeholder="Age"
          value={form.Age}
          onChange={(e) => setForm({ ...form, Age: parseInt(e.target.value, 10) || '' })}
        />
        <input
          className="p-3 border border-gray-300 rounded-lg"
          placeholder="Illness"
          value={form.Illness}
          onChange={(e) => setForm({ ...form, Illness: e.target.value })}
        />
        <input
          className="p-3 border border-gray-300 rounded-lg"
          placeholder="Assigned Doctor"
          value={form.AssignedDoctor}
          onChange={(e) => setForm({ ...form, AssignedDoctor: e.target.value })}
        />
      </div>
      <button
        onClick={handleSubmit}
        className="mt-6 bg-green-600 text-white py-2 px-5 rounded-lg hover:bg-green-700"
      >
        {patient ? 'Update' : 'Add'} Patient
      </button>
    </div>
  );
}

export default PatientForm;
