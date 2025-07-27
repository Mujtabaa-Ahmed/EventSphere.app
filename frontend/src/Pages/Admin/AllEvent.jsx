import React, { useEffect, useState } from 'react';
import AdminSideBar from '../../Component/AdminSideBar';
import axios from 'axios';

const AllEvent = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false); // Modal visibility for event update
  const [currentEvent, setCurrentEvent] = useState(null); // Current event being updated
  const [updatedEvent, setUpdatedEvent] = useState({}); // Updated event data
  const [modalErrors, setModalErrors] = useState({}); // Validation errors for modal fields
  
  const [showBoothModal, setShowBoothModal] = useState(false); // Booth modal visibility
  const [currentExpoId, setCurrentExpoId] = useState(null); // Current ExpoID for booth assignment
  const [boothDetails, setBoothDetails] = useState({
    boothNumber: '',
    size: '',
    status: 'Available', // Default value for status
  }); // Booth details
  const [boothErrors, setBoothErrors] = useState({}); // Validation errors for booth modal fields

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

    fetchEvents();
  }, []);

  const handleUpdateClick = (event) => {
    setCurrentEvent(event); // Set the current event to be updated
    setUpdatedEvent({ ...event }); // Copy the current event data for editing
    setModalErrors({}); // Reset errors
    setShowModal(true); // Show the modal
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedEvent((prev) => ({ ...prev, [name]: value })); // Update the field being edited

    // Clear specific error when user starts typing
    setModalErrors((prevErrors) => ({
      ...prevErrors,
      [name]: '',
    }));
  };

  const validateModalFields = () => {
    const errors = {};
    if (!updatedEvent.title || updatedEvent.title.trim() === '') {
      errors.title = 'Title is required.';
    }
    if (!updatedEvent.date || updatedEvent.date.trim() === '') {
      errors.date = 'Date is required.';
    }
    if (!updatedEvent.location || updatedEvent.location.trim() === '') {
      errors.location = 'Location is required.';
    }
    if (!updatedEvent.description || updatedEvent.description.trim() === '') {
      errors.description = 'Description is required.';
    }
    if (!updatedEvent.theme || updatedEvent.theme.trim() === '') {
      errors.theme = 'Theme is required.';
    }
    setModalErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleUpdateSubmit = async () => {
    if (!validateModalFields()) {
      return; // Stop if validation fails
    }

    try {
      const response = await axios.put(`http://localhost:4000/expo/${currentEvent._id}`, updatedEvent);
      console.log('Update Response:', response.data);

      // Update the events list locally
      setEvents((prevEvents) =>
        prevEvents.map((event) =>
          event._id === currentEvent._id ? { ...event, ...updatedEvent } : event
        )
      );

      setShowModal(false); // Close the modal
    } catch (err) {
      console.error('Update Error:', err);
      alert('Failed to update event!');
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this event?');
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:4000/expo/${id}`);
        // Remove the deleted event from the state
        setEvents((prevEvents) => prevEvents.filter((event) => event._id !== id));
      } catch (err) {
        console.error('Delete Error:', err);
        alert('Failed to delete event!');
      }
    }
  };

  // Booth Assignment Logic
  const handleBooth = (event) => {
    setCurrentExpoId(event._id); // Set current event ID
    setBoothDetails({ boothNumber: '', size: '', status: 'Available' }); // Set default value for status
    setBoothErrors({}); // Reset errors
    setShowBoothModal(true); // Show the modal
  };

  const handleBoothInputChange = (e) => {
    const { name, value } = e.target;
    setBoothDetails((prev) => ({ ...prev, [name]: value }));
  
    // Clear specific error when user starts typing
    setBoothErrors((prevErrors) => ({
      ...prevErrors,
      [name]: '',
    }));
  };
  

  const validateBoothFields = () => {
    const errors = {};
    const boothCount = parseInt(boothDetails.boothCount, 10);
  
    if (!boothDetails.boothNumber.trim()) {
      errors.boothNumber = 'Booth Number is required.';
    }
    if (!boothDetails.size.trim()) {
      errors.size = 'Size is required.';
    }
    if (!boothDetails.status.trim()) {
      errors.status = 'Status is required.';
    }
    if (!boothCount || boothCount <= 0 || boothCount > 10) {
      errors.boothCount = 'Number of booths must be between 1 and 10.';
    }
  
    setBoothErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
  

  const handleBoothSubmit = async () => {
    if (!validateBoothFields()) {
      return; // Stop if validation fails
    }
  
    const count = Math.min(parseInt(boothDetails.boothCount, 10), 10); // Cap count at 10
    const requests = [];
  
    for (let i = 0; i < count; i++) {
      requests.push(
        axios.post('http://localhost:4000/booth', {
          ExpoID: currentExpoId,
          boothNumber: `${boothDetails.boothNumber}-${i + 1}`, // Append index for unique booth number
          size: boothDetails.size,
          status: boothDetails.status,
        })
      );
    }
  
    try {
      await Promise.all(requests); // Send all requests concurrently
      setShowBoothModal(false);
      alert('Booths assigned successfully!');
    } catch (err) {
      console.error('Booth Assignment Error:', err.response ? err.response.data : err.message);
      alert('Failed to assign booths!');
    }
  };
  
  

  return (
    <AdminSideBar>
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
                      <th scope="col">Action</th>
                      <th scope="col">Booth</th>
                    </tr>
                  </thead>
                  <tbody>
                    {events.map((event) => (
                      <tr key={event._id}> {/* Use _id for key */}
                        <th scope="row">{events.indexOf(event) + 1}</th>
                        <td>{event.title}</td>
                        <td>{event.date}</td>
                        <td>{event.location}</td>
                        <td>{event.description}</td>
                        <td>{event.theme}</td>
                        <td>
                          <button className="btn btn-success m-1" onClick={() => handleUpdateClick(event)}>
                            Update
                          </button>
                          <button className="btn btn-danger m-1" onClick={() => handleDelete(event._id)}>
                            Delete
                          </button>
                        </td>
                        <td>
                          <button className="btn btn-warning m-1" onClick={() => handleBooth(event)}>
                            Assign
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
                <h5 className="modal-title">Update Event</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                {/* Event Update Form */}
                <div className="mb-3">
                  <label className="form-label">Title</label>
                  <input
                    type="text"
                    name="title"
                    value={updatedEvent.title}
                    className={`form-control ${modalErrors.title ? 'is-invalid' : ''}`}
                    onChange={handleInputChange}
                  />
                  {modalErrors.title && <div className="invalid-feedback">{modalErrors.title}</div>}
                </div>
                <div className="mb-3">
                  <label className="form-label">Date</label>
                  <input
                    type="text"
                    name="date"
                    value={updatedEvent.date}
                    className={`form-control ${modalErrors.date ? 'is-invalid' : ''}`}
                    onChange={handleInputChange}
                  />
                  {modalErrors.date && <div className="invalid-feedback">{modalErrors.date}</div>}
                </div>
                <div className="mb-3">
                  <label className="form-label">Location</label>
                  <input
                    type="text"
                    name="location"
                    value={updatedEvent.location}
                    className={`form-control ${modalErrors.location ? 'is-invalid' : ''}`}
                    onChange={handleInputChange}
                  />
                  {modalErrors.location && <div className="invalid-feedback">{modalErrors.location}</div>}
                </div>
                <div className="mb-3">
                  <label className="form-label">Description</label>
                  <input
                    type="text"
                    name="description"
                    value={updatedEvent.description}
                    className={`form-control ${modalErrors.description ? 'is-invalid' : ''}`}
                    onChange={handleInputChange}
                  />
                  {modalErrors.description && <div className="invalid-feedback">{modalErrors.description}</div>}
                </div>
                <div className="mb-3">
                  <label className="form-label">Theme</label>
                  <input
                    type="text"
                    name="theme"
                    value={updatedEvent.theme}
                    className={`form-control ${modalErrors.theme ? 'is-invalid' : ''}`}
                    onChange={handleInputChange}
                  />
                  {modalErrors.theme && <div className="invalid-feedback">{modalErrors.theme}</div>}
                </div>
                <button className="btn btn-primary" onClick={handleUpdateSubmit}>
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

     {/* Booth Modal */}
      {showBoothModal && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Assign Booth</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowBoothModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                {/* Booth Assignment Form */}
                <div className="mb-3">
                  <label className="form-label">Booth Number</label>
                  <input
                    type="text"
                    name="boothNumber"
                    value={boothDetails.boothNumber}
                    className={`form-control ${boothErrors.boothNumber ? 'is-invalid' : ''}`}
                    onChange={handleBoothInputChange}
                  />
                  {boothErrors.boothNumber && <div className="invalid-feedback">{boothErrors.boothNumber}</div>}
                </div>
                <div className="mb-3">
                  <label className="form-label">Size</label>
                  <input
                    type="text"
                    name="size"
                    value={boothDetails.size}
                    className={`form-control ${boothErrors.size ? 'is-invalid' : ''}`}
                    onChange={handleBoothInputChange}
                  />
                  {boothErrors.size && <div className="invalid-feedback">{boothErrors.size}</div>}
                </div>
                <div className="mb-3">
                  <label className="form-label">Status</label>
                  <select
                    name="status"
                    value={boothDetails.status}
                    className={`form-control ${boothErrors.status ? 'is-invalid' : ''}`}
                    onChange={handleBoothInputChange}
                  >
                    <option value="Available">Available</option>
                    <option value="Not Available">Not Available</option>
                  </select>
                  {boothErrors.status && <div className="invalid-feedback">{boothErrors.status}</div>}
                </div>
                <div className="mb-3">
                  <label className="form-label">Number of Booths</label>
                  <input
                    type="number"
                    name="boothCount"
                    value={boothDetails.boothCount || ''}
                    className={`form-control ${boothErrors.boothCount ? 'is-invalid' : ''}`}
                    onChange={handleBoothInputChange}
                    max="10"
                  />
                  {boothErrors.boothCount && <div className="invalid-feedback">{boothErrors.boothCount}</div>}
                </div>
                <button className="btn btn-primary" onClick={handleBoothSubmit}>
                  Assign Booth
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminSideBar>
  );
};

export default AllEvent;
