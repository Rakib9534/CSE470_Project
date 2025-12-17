import { useState } from 'react';

function PatientDashboard({ appointments }) {
  const [emailFilter, setEmailFilter] = useState('');

  const filtered = emailFilter
    ? appointments.filter((a) => a.email === emailFilter)
    : appointments;

  return (
    <div>
      <h1>Patient Dashboard</h1>
      <p>View your confirmed appointments.</p>

      <div style={{ marginBottom: '10px' }}>
        <label>
          Enter your email to view your appointments:{' '}
          <input
            type="email"
            value={emailFilter}
            onChange={(e) => setEmailFilter(e.target.value)}
          />
        </label>
      </div>

      {filtered.length === 0 ? (
        <p>No appointments found.</p>
      ) : (
        <ul>
          {filtered.map((appt) => (
            <li key={appt.id} style={{ marginBottom: '12px' }}>
              <strong>{appt.doctorName}</strong> ({appt.speciality})
              <br />
              Date: {appt.date} &nbsp; Time: {appt.time}
              <br />
              Patient: {appt.patientName} ({appt.email})
              {appt.phone && (
                <>
                  <br />
                  Phone: {appt.phone}
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default PatientDashboard;