import { useState } from 'react';

function BookAppointment({ doctors, onCreateAppointment }) {
  const [doctorId, setDoctorId] = useState(doctors[0]?.id || '');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [patientName, setPatientName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');

  const selectedDoctor = doctors.find((d) => d.id === doctorId) || doctors[0];

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!doctorId || !date || !time || !patientName || !email) {
      setMessage('Please fill all required fields.');
      return;
    }

    const newAppointment = {
      id: Date.now().toString(),
      doctorId,
      doctorName: selectedDoctor.name,
      speciality: selectedDoctor.speciality,
      date,
      time,
      patientName,
      email,
      phone,
    };

    onCreateAppointment(newAppointment);
    setMessage('Appointment booked successfully and added to your dashboard.');
  };

  return (
    <div>
      <h1>Book an Appointment</h1>
      <p>Select your preferred doctor and time.</p>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '8px' }}>
          <label>
            Patient Name*:{' '}
            <input
              type="text"
              value={patientName}
              onChange={(e) => setPatientName(e.target.value)}
            />
          </label>
        </div>

        <div style={{ marginBottom: '8px' }}>
          <label>
            Email*:{' '}
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
        </div>

        <div style={{ marginBottom: '8px' }}>
          <label>
            Phone:{' '}
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </label>
        </div>

        <div style={{ marginBottom: '8px' }}>
          <label>
            Doctor*:{' '}
            <select
              value={doctorId}
              onChange={(e) => {
                setDoctorId(e.target.value);
                setTime('');
              }}
            >
              {doctors.map((doc) => (
                <option key={doc.id} value={doc.id}>
                  {doc.name} — {doc.speciality}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div style={{ marginBottom: '8px' }}>
          <label>
            Date*:{' '}
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          </label>
        </div>

        <div style={{ marginBottom: '8px' }}>
          <label>
            Time*:{' '}
            <select value={time} onChange={(e) => setTime(e.target.value)}>
              <option value="">Select time</option>
              {selectedDoctor.slots.map((slot) => (
                <option key={slot} value={slot}>
                  {slot}
                </option>
              ))}
            </select>
          </label>
        </div>

        <button type="submit">Confirm Appointment</button>
      </form>

      {message && <p style={{ marginTop: '10px', color: 'green' }}>{message}</p>}
    </div>
  );
}

export default BookAppointment;