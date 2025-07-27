import React, { useEffect, useState } from 'react';
import AdminSideBar from '../../Component/AdminSideBar';
import axios from 'axios';

const AllSession = () => {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false); // Modal visibility
  const [currentSession, setCurrentSession] = useState(null); // Current session being updated
  const [updatedSession, setUpdatedSession] = useState({}); // Updated session data
  const [modalErrors, setModalErrors] = useState({}); // Validation errors for modal fields

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const response = await axios.get('http://localhost:4000/session');
        if (response.data && Array.isArray(response.data.data)) {
          setSessions(response.data.data); // Use response.data.data for the sessions array
        } else {
          throw new Error('Unexpected response format');
        }
      } catch (err) {
        setError(`Failed to fetch sessions: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchSessions();
  }, []);

  const handleUpdateClick = (session) => {
    setCurrentSession(session);
    setUpdatedSession({ ...session }); // Copy the current session data for editing
    setModalErrors({});
    setShowModal(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedSession((prev) => ({ ...prev, [name]: value }));

    // Clear specific error when user starts typing
    setModalErrors((prevErrors) => ({
      ...prevErrors,
      [name]: '',
    }));
  };

  const validateModalFields = () => {
    const errors = {};
    if (!updatedSession.title || updatedSession.title.trim() === '') {
      errors.title = 'Title is required.';
    }
    if (!updatedSession.Speaker || updatedSession.Speaker.trim() === '') {
      errors.Speaker = 'Speaker is required.';
    }
    if (!updatedSession.Location || updatedSession.Location.trim() === '') {
      errors.Location = 'Location is required.';
    }
    if (!updatedSession.StartTime) {
      errors.StartTime = 'Start time is required.';
    }
    if (!updatedSession.EndTime) {
      errors.EndTime = 'End time is required.';
    }
    setModalErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleUpdateSubmit = async () => {
    if (!validateModalFields()) {
      return; // Stop if validation fails
    }

    try {
      const response = await axios.put(
        `http://localhost:4000/session/${currentSession._id}`,
        { ...updatedSession } // Ensure the correct data is sent
      );
      console.log('Update Response:', response.data);

      // Update the sessions list locally
      setSessions((prevSessions) =>
        prevSessions.map((session) =>
          session._id === currentSession._id ? { ...session, ...updatedSession } : session
        )
      );

      setShowModal(false); // Close the modal
    } catch (err) {
      console.error('Update Error:', err);
      alert('Failed to update session!');
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this session?');
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:4000/session/${id}`);
        // Remove the deleted session from the state
        setSessions((prevSessions) => prevSessions.filter((session) => session._id !== id));
      } catch (err) {
        console.error('Delete Error:', err);
        alert('Failed to delete session!');
      }
    }
  };

  return (
    <AdminSideBar>
      <div className="container-fluid px-4">
        <h1 className="mt-4">Sessions</h1>
        <div className="card mt-4">
          <div className="card-header">
            <i className="fas fa-table me-1" />
            All Sessions
          </div>
          <div className="card-body">
            {loading && <p>Loading sessions...</p>}
            {error && <div className="alert alert-danger">{error}</div>}
            {!loading && !error && sessions.length === 0 && <p>No sessions found.</p>}
            {!loading && !error && sessions.length > 0 && (
              <div className="table-responsive">
                <table className="table table-striped-columns">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Title</th>
                      <th scope="col">Speaker</th>
                      <th scope="col">Location</th>
                      <th scope="col">Start Time</th>
                      <th scope="col">End Time</th>
                      <th scope="col">Expo ID</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sessions.map((session, index) => (
                      <tr key={session._id}>
                        <th scope="row">{index + 1}</th>
                        <td>{session.title}</td>
                        <td>{session.Speaker}</td>
                        <td>{session.Location}</td>
                        <td>{new Date(session.StartTime).toLocaleString()}</td>
                        <td>{new Date(session.EndTime).toLocaleString()}</td>
                        <td>{session.ExpoID && session.ExpoID[0] ? session.ExpoID[0].title : 'No Expo Assigned'}</td>
                        <td>
                          <button className="btn btn-success m-1" onClick={() => handleUpdateClick(session)}>
                            Update
                          </button>
                          <button className="btn btn-danger m-1" onClick={() => handleDelete(session._id)}>
                            Delete
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

      {/* Update Modal */}
      {showModal && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Update Session</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Title</label>
                  <input
                    type="text"
                    name="title"
                    value={updatedSession.title || ''}
                    className={`form-control ${modalErrors.title ? 'is-invalid' : ''}`}
                    onChange={handleInputChange}
                  />
                  {modalErrors.title && <div className="invalid-feedback">{modalErrors.title}</div>}
                </div>
                <div className="mb-3">
                  <label className="form-label">Speaker</label>
                  <input
                    type="text"
                    name="Speaker"
                    value={updatedSession.Speaker || ''}
                    className={`form-control ${modalErrors.Speaker ? 'is-invalid' : ''}`}
                    onChange={handleInputChange}
                  />
                  {modalErrors.Speaker && <div className="invalid-feedback">{modalErrors.Speaker}</div>}
                </div>
                <div className="mb-3">
                  <label className="form-label">Location</label>
                  <input
                    type="text"
                    name="Location"
                    value={updatedSession.Location || ''}
                    className={`form-control ${modalErrors.Location ? 'is-invalid' : ''}`}
                    onChange={handleInputChange}
                  />
                  {modalErrors.Location && <div className="invalid-feedback">{modalErrors.Location}</div>}
                </div>
                <div className="mb-3">
                  <label className="form-label">Start Time</label>
                  <input
                    type="datetime-local"
                    name="StartTime"
                    value={updatedSession.StartTime ? new Date(updatedSession.StartTime).toISOString().slice(0, 16) : ''}
                    className={`form-control ${modalErrors.StartTime ? 'is-invalid' : ''}`}
                    onChange={handleInputChange}
                  />
                  {modalErrors.StartTime && <div className="invalid-feedback">{modalErrors.StartTime}</div>}
                </div>
                <div className="mb-3">
                  <label className="form-label">End Time</label>
                  <input
                    type="datetime-local"
                    name="EndTime"
                    value={updatedSession.EndTime ? new Date(updatedSession.EndTime).toISOString().slice(0, 16) : ''}
                    className={`form-control ${modalErrors.EndTime ? 'is-invalid' : ''}`}
                    onChange={handleInputChange}
                  />
                  {modalErrors.EndTime && <div className="invalid-feedback">{modalErrors.EndTime}</div>}
                </div>
                <div className="mb-3">
                  <label className="form-label">Expo ID</label>
                  <input
                    type="text"
                    name="ExpoID"
                    value={updatedSession.ExpoID.join(', ')}
                    className="form-control"
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleUpdateSubmit}
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminSideBar>
  );
};

export default AllSession;
