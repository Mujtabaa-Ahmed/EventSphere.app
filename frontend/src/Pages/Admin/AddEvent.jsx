import React, { useState } from 'react';
import AdminSideBar from '../../Component/AdminSideBar';
import axios from 'axios';  // Importing axios

const AddEvent = () => {
  const [eventData, setEventData] = useState({
    title: '',
    date: '',
    location: '',
    description: '',
    theme: ''
  });

  const [loading, setLoading] = useState(false);  // For loading state
  const [error, setError] = useState(null);       // For error handling
  const [success, setSuccess] = useState(false);  // To show success message

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData({
      ...eventData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    setLoading(true); // Start loading
    setError(null); // Reset error
    setSuccess(false); // Reset success message
    
    try {
      const response = await axios.post('http://localhost:4000/expo', eventData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      // Success Response
      console.log(response.data);
      setSuccess(true);
      setEventData({
        title: '',
        date: '',
        location: '',
        description: '',
        theme: ''
      });

    } catch (err) {
      setError(err.response ? err.response.data.message : err.message);
      console.error(err);
    } finally {
      setLoading(false); // End loading
    }
  };

  return (
    <>
      <AdminSideBar>
        <div className="container-fluid px-4">
          <h1 className="mt-4 text-center">Add New Event</h1>

          <div className="row justify-content-center">
            <div className="col-xl-8 col-md-10">
              <div className="card shadow-sm border-0">
                <div className="card-header">
                  <h5 className="m-0">Event Information</h5>
                </div>
                <div className="card-body">
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label htmlFor="title" className="form-label">Event Title</label>
                      <input
                        type="text"
                        className="form-control"
                        id="title"
                        name="title"
                        value={eventData.title}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="date" className="form-label">Event Date</label>
                      <input
                        type="date"
                        className="form-control"
                        id="date"
                        name="date"
                        value={eventData.date}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="location" className="form-label">Event Location</label>
                      <input
                        type="text"
                        className="form-control"
                        id="location"
                        name="location"
                        value={eventData.location}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="description" className="form-label">Event Description</label>
                      <textarea
                        className="form-control"
                        id="description"
                        name="description"
                        value={eventData.description}
                        onChange={handleChange}
                        required
                        rows="4"
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="theme" className="form-label">Event Theme</label>
                      <input
                        type="text"
                        className="form-control"
                        id="theme"
                        name="theme"
                        value={eventData.theme}
                        onChange={handleChange}
                        required
                        maxLength="100"
                      />
                    </div>

                    {error && <div className="alert alert-danger">{error}</div>}
                    {success && <div className="alert alert-success">Event added successfully!</div>}

                    <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
                      {loading ? 'Adding Event...' : 'Add Event'}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AdminSideBar>
    </>
  );
};

export default AddEvent;
