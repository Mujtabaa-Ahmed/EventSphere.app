import React, { useState, useEffect } from 'react';
import AdminSideBar from '../../Component/AdminSideBar';
import axios from 'axios';

const AddSession = () => {
  const [sessionData, setSessionData] = useState({
    title: '',
    Speaker: '',
    Location: '',
    StartTime: '',
    EndTime: '',
    ExpoID: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [expoList, setExpoList] = useState([]);

  useEffect(() => {
    // Fetch expo data when component mounts
    const fetchExpoData = async () => {
      try {
        const response = await axios.get('http://localhost:4000/expo');
        console.log("Fetched Expo Data:", response.data);  // Log the fetched data

        // Check if the response data is an array
        if (Array.isArray(response.data.data)) {  // response.data.data contains the array
          setExpoList(response.data.data);  // Store expo list in state
        } else {
          setError("Invalid data format received for Expo.");
        }
      } catch (err) {
        console.error("Error fetching expo data", err);
        setError("Failed to load Expo data.");
      }
    };

    fetchExpoData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSessionData({
      ...sessionData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true); // Start loading
    setError(null); // Reset error
    setSuccess(false); // Reset success message

    try {
      const response = await axios.post('http://localhost:4000/session', sessionData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      // Success Response
      console.log(response.data);
      setSuccess(true);
      setSessionData({
        title: '',
        Speaker: '',
        Location: '',
        StartTime: '',
        EndTime: '',
        ExpoID: ''
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
          <h1 className="mt-4 text-center">Add New Session</h1>

          <div className="row justify-content-center">
            <div className="col-xl-8 col-md-10">
              <div className="card shadow-sm border-0">
                <div className="card-header">
                  <h5 className="m-0">Session Information</h5>
                </div>
                <div className="card-body">
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label htmlFor="title" className="form-label">Session Title</label>
                      <input
                        type="text"
                        className="form-control"
                        id="title"
                        name="title"
                        value={sessionData.title}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="Speaker" className="form-label">Speaker</label>
                      <input
                        type="text"
                        className="form-control"
                        id="Speaker"
                        name="Speaker"
                        value={sessionData.Speaker}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="Location" className="form-label">Session Location</label>
                      <input
                        type="text"
                        className="form-control"
                        id="Location"
                        name="Location"
                        value={sessionData.Location}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="StartTime" className="form-label">Session Start Time</label>
                      <input
                        type="datetime-local"
                        className="form-control"
                        id="StartTime"
                        name="StartTime"
                        value={sessionData.StartTime}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="EndTime" className="form-label">Session End Time</label>
                      <input
                        type="datetime-local"
                        className="form-control"
                        id="EndTime"
                        name="EndTime"
                        value={sessionData.EndTime}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="ExpoID" className="form-label">Select Expo</label>
                      <select
                        className="form-control"
                        id="ExpoID"
                        name="ExpoID"
                        value={sessionData.ExpoID}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Select Expo</option>
                        {expoList && expoList.length > 0 ? (
                          expoList.map((expo) => (
                            <option key={expo._id} value={expo._id}>
                              {expo.title}
                            </option>
                          ))
                        ) : (
                          <option value="">No expos available</option>
                        )}
                      </select>
                    </div>

                    {error && <div className="alert alert-danger">{error}</div>}
                    {success && <div className="alert alert-success">Session added successfully!</div>}

                    <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
                      {loading ? 'Adding Session...' : 'Add Session'}
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

export default AddSession;
