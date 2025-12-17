function Doctors({ doctors }) {
  return (
    <div>
      <h1>Available Doctors &amp; Time Slots</h1>
      <p>Check doctors and their available appointment times.</p>

      <ul>
        {doctors.map((doc) => (
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

export default Doctors;