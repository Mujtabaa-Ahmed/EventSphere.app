import React, { useEffect, useState } from 'react';
import ExibiterSidebar from '../../Component/ExibiterSideBar';
import axios from 'axios';

const ExhibiterExpo = () => {
  const [events, setEvents] = useState([]);
  const [booths, setBooths] = useState([]);
  const [filteredBooths, setFilteredBooths] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [currentEvent, setCurrentEvent] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:4000/expo');
        if (response.data && Array.isArray(response.data.data)) {
          setEvents(response.data.data);
        } else {
          throw new Error('Unexpected response format');
        }
      } catch (err) {
        setError(`Failed to fetch events: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    const fetchBooths = async () => {
      try {
        const response = await axios.get('http://localhost:4000/booth');
        if (response.data && Array.isArray(response.data.data)) {
          setBooths(response.data.data);
        } else {
          throw new Error('Unexpected response format');
        }
      } catch (err) {
        console.error(`Failed to fetch booths: ${err.message}`);
      }
    };

    fetchEvents();
    fetchBooths();
  }, []);

  const handleRegisterClick = (event) => {
    setCurrentEvent(event);
    const relatedBooths = booths.filter(
      (booth) => booth.ExpoID[0]._id === event._id
    );
    setFilteredBooths(relatedBooths);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setCurrentEvent(null);
    setFilteredBooths([]);
  };

  return (
    <ExibiterSidebar>
      <div className="container-fluid px-4">
        <h1 className="mt-4">Events</h1>
        <div className="card mt-4">
          <div className="card-header">
            <i className="fas fa-table me-1" />
            All Events
          </div>
          <div className="card-body">
            {loading && <p>Loading events...</p>}
            {error && <div className="alert alert-danger">{error}</div>}
            {!loading && !error && events.length === 0 && <p>No events found.</p>}
            {!loading && !error && events.length > 0 && (
              <div className="table-responsive">
                <table className="table table-striped-columns">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Title</th>
                      <th scope="col">Date</th>
                      <th scope="col">Location</th>
                      <th scope="col">Description</th>
                      <th scope="col">Theme</th>
                      <th scope="col">Register</th>
                    </tr>
                  </thead>
                  <tbody>
                    {events.map((event) => (
                      <tr key={event._id}>
                        <th scope="row">{events.indexOf(event) + 1}</th>
                        <td>{event.title}</td>
                        <td>{event.date}</td>
                        <td>{event.location}</td>
                        <td>{event.description}</td>
                        <td>{event.theme}</td>
                        <td>
                          <button
                            className="btn btn-primary"
                            onClick={() => handleRegisterClick(event)}
                          >
                            Register
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Register Modal */}
      {showModal && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Register for Event</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={handleCloseModal}
                ></button>
              </div>
              <div className="modal-body">
                <p>Please Select Available Booth</p>
                <div className="mb-3">
                  <label htmlFor="boothDropdown" className="form-label">
                    Select Booth
                  </label>
                  <select className="form-select" id="boothDropdown">
                    {filteredBooths.length > 0 ? (
                      filteredBooths.map((booth) => (
                        <option key={booth._id} value={booth._id}>
                          {booth.boothNumber} - {booth.size} ({booth.status})
                        </option>
                      ))
                    ) : (
                      <option disabled>No booths available</option>
                    )}
                  </select>
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={handleCloseModal}>
                  Close
                </button>
                <button className="btn btn-primary">Confirm Registration</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </ExibiterSidebar>
  );
};

export default ExhibiterExpo;
