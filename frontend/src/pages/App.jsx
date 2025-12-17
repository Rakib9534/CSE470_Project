import { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Doctors from './pages/Doctors.jsx';
import BookAppointment from './pages/BookAppointment.jsx';
import PatientDashboard from './pages/PatientDashboard.jsx';
import './App.css';

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

function App() {
  const [appointments, setAppointments] = useState([]);

  const handleCreateAppointment = (appointment) => {
    setAppointments((prev) => [...prev, appointment]);
  };

  return (
    <div>
      <nav style={styles.navbar}>
        <div style={styles.logo}>Hospital Appointment System</div>
        <div style={styles.links}>
          <Link style={styles.link} to="/">Home</Link>
          <Link style={styles.link} to="/doctors">Doctors & Slots</Link>
          <Link style={styles.link} to="/book">Book Appointment</Link>
          <Link style={styles.link} to="/dashboard">My Appointments</Link>
        </div>
      </nav>

      <div style={styles.content}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/doctors" element={<Doctors doctors={doctorsData} />} />
          <Route
            path="/book"
            element={
              <BookAppointment
                doctors={doctorsData}
                onCreateAppointment={handleCreateAppointment}
              />
            }
          />
          <Route
            path="/dashboard"
            element={<PatientDashboard appointments={appointments} />}
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
  },
  logo: {
    fontWeight: 'bold',
    fontSize: '18px',
  },
  links: {
    display: 'flex',
    gap: '10px',
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