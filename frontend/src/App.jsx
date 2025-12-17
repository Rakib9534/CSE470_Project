import { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';

// Sample doctors and their available slots (Feature 1)
const doctorsData = [
  {
    id: 'd1',
    name: 'Dr. Ahsan Karim',
    speciality: 'Cardiologist',
    slots: ['09:00', '10:00', '11:00'],
  },
  {
    id: 'd2',
    name: 'Dr. Sara Rahman',
    speciality: 'Dermatologist',
    slots: ['12:00', '13:00', '15:00'],
  },
  {
    id: 'd3',
    name: 'Dr. Imran Hossain',
    speciality: 'Neurologist',
    slots: ['10:30', '11:30', '16:00'],
  },
];

// ---------- Simple page components (all in this file) ----------

function HomePage() {
  return (
    <div>
      <h1>Hospital Appointment System</h1>
      <p>
        Book doctor appointments online, view available time slots, and see your
        confirmed bookings on the dashboard.
      </p>
    </div>
  );
}

// Feature 1: show available slots for different doctors
function DoctorsPage() {
  return (
    <div>
      <h1>Doctors &amp; Available Time Slots</h1>
      <p>Choose your preferred doctor and then book from the booking page.</p>

      <ul>
        {doctorsData.map((doc) => (
          <li key={doc.id} style={{ marginBottom: '12px' }}>
            <strong>{doc.name}</strong> — {doc.speciality}
            <br />
            Available slots:{' '}
            {doc.slots.length > 0 ? doc.slots.join(', ') : 'No slots available'}
          </li>
        ))}
      </ul>
    </div>
  );
}

// Feature 2 & 3: select doctor + schedule appointment + confirmation
function BookAppointmentPage({ addAppointment }) {
  const [doctorId, setDoctorId] = useState(doctorsData[0].id);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [patientName, setPatientName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');

  const selectedDoctor =
    doctorsData.find((d) => d.id === doctorId) || doctorsData[0];

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

    addAppointment(newAppointment);
    setMessage('Appointment booked successfully and added to your dashboard.');

    // optional: clear some fields
    // setDate(''); setTime(''); setPhone('');
  };

  return (
    <div>
      <h1>Book an Appointment</h1>
      <p>Select doctor, date and time to schedule your visit.</p>

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
              {doctorsData.map((doc) => (
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
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
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

      {message && (
        <p style={{ marginTop: '10px', color: 'green' }}>{message}</p>
      )}
    </div>
  );
}

// Feature 3: show confirmed appointments in a simple dashboard
function DashboardPage({ appointments }) {
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

// ----------------- Main App component -----------------

function App() {
  const [appointments, setAppointments] = useState([]);

  const addAppointment = (appointment) => {
    setAppointments((prev) => [...prev, appointment]);
  };

  return (
    <div>
      {/* Navbar */}
      <nav style={styles.navbar}>
        <div style={styles.logo}>Hospital Appointment System</div>
        <div style={styles.links}>
          <Link style={styles.link} to="/">Home</Link>
          <Link style={styles.link} to="/doctors">Doctors &amp; Slots</Link>
          <Link style={styles.link} to="/book">Book Appointment</Link>
          <Link style={styles.link} to="/dashboard">My Appointments</Link>
        </div>
      </nav>

      {/* Page content */}
      <div style={styles.content}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/doctors" element={<DoctorsPage />} />
          <Route
            path="/book"
            element={<BookAppointmentPage addAppointment={addAppointment} />}
          />
          <Route
            path="/dashboard"
            element={<DashboardPage appointments={appointments} />}
          />
        </Routes>
      </div>
    </div>
  );
}

const styles = {
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 20px',
    backgroundColor: '#003366',
    color: 'white',
    flexWrap: 'wrap',
  },
  logo: {
    fontWeight: 'bold',
    fontSize: '18px',
  },
  links: {
    display: 'flex',
    gap: '10px',
    flexWrap: 'wrap',
  },
  link: {
    color: 'white',
    textDecoration: 'none',
    padding: '6px 10px',
    borderRadius: '4px',
  },
  content: {
    padding: '20px',
  },
};

export default App;