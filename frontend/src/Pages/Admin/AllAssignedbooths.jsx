import React, { useEffect, useState } from 'react';
import AdminSideBar from '../../Component/AdminSideBar';
import axios from 'axios';

const AllAssignedbooths = () => {
  const [booths, setBooths] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false); // Modal visibility
  const [currentBooth, setCurrentBooth] = useState(null); // Current booth being updated
  const [updatedBooth, setUpdatedBooth] = useState({}); // Updated booth data
  const [modalErrors, setModalErrors] = useState({}); // Validation errors for modal fields

  useEffect(() => {
    const fetchBooths = async () => {
      try {
        const response = await axios.get('http://localhost:4000/booth');
        if (response.data && Array.isArray(response.data.data)) {
          setBooths(response.data.data); // Use response.data.data for the booths array
        } else {
          throw new Error('Unexpected response format');
        }
      } catch (err) {
        setError(`Failed to fetch booths: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchBooths();
  }, []);

  const handleUpdateClick = (booth) => {
    setCurrentBooth(booth);
    setUpdatedBooth({ ...booth }); // Copy the current booth data for editing
    setModalErrors({});
    setShowModal(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedBooth((prev) => ({ ...prev, [name]: value }));

    // Clear specific error when user starts typing
    setModalErrors((prevErrors) => ({
      ...prevErrors,
      [name]: '',
    }));
  };

  const validateModalFields = () => {
    const errors = {};
    if (!updatedBooth.boothNumber || updatedBooth.boothNumber.trim() === '') {
      errors.boothNumber = 'Booth number is required.';
    }
    if (!updatedBooth.size || updatedBooth.size.trim() === '') {
      errors.size = 'Size is required.';
    }
    if (!updatedBooth.status || updatedBooth.status.trim() === '') {
      errors.status = 'Status is required.';
    }
    setModalErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleUpdateSubmit = async () => {
    if (!validateModalFields()) {
      return; // Stop if validation fails
    }

    try {
      const response = await axios.put(`http://localhost:4000/booth/${currentBooth._id}`, updatedBooth);
      console.log('Update Response:', response.data);

      // Update the booths list locally
      setBooths((prevBooths) =>
        prevBooths.map((booth) =>
          booth._id === currentBooth._id ? { ...booth, ...updatedBooth } : booth
        )
      );

      setShowModal(false); // Close the modal
    } catch (err) {
      console.error('Update Error:', err);
      alert('Failed to update booth!');
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this booth?');
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:4000/booth/${id}`);
        // Remove the deleted booth from the state
        setBooths((prevBooths) => prevBooths.filter((booth) => booth._id !== id));
      } catch (err) {
        console.error('Delete Error:', err);
        alert('Failed to delete booth!');
      }
    }
  };

  return (
    <AdminSideBar>
      <div className="container-fluid px-4">
        <h1 className="mt-4">Assigned Booths</h1>
        <div className="card mt-4">
          <div className="card-header">
            <i className="fas fa-table me-1" />
            All Booths
          </div>
          <div className="card-body">
            {loading && <p>Loading booths...</p>}
            {error && <div className="alert alert-danger">{error}</div>}
            {!loading && !error && booths.length === 0 && <p>No booths found.</p>}
            {!loading && !error && booths.length > 0 && (
              <div className="table-responsive">
                <table className="table table-striped-columns">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Booth Number</th>
                      <th scope="col">Size</th>
                      <th scope="col">Status</th>
                      <th scope="col">Expo Name</th> {/* Added column for Expo Name */}
                      <th scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {booths.map((booth, index) => (
                     <tr key={booth._id}>
                     <th scope="row">{index + 1}</th>
                     <td>{booth.boothNumber}</td>
                     <td>{booth.size}</td>
                     <td>{booth.status}</td>
                     <td>
                       {booth.ExpoID && booth.ExpoID[0] ? booth.ExpoID[0].title : 'No Expo Assigned'}
                     </td>
                     <td>
                       <button className="btn btn-success m-1" onClick={() => handleUpdateClick(booth)}>Update</button>
                       <button className="btn btn-danger m-1" onClick={() => handleDelete(booth._id)}>Delete</button>
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
                <h5 className="modal-title">Update Booth</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Booth Number</label>
                  <input
                    type="text"
                    name="boothNumber"
                    value={updatedBooth.boothNumber}
                    className={`form-control ${modalErrors.boothNumber ? 'is-invalid' : ''}`}
                    onChange={handleInputChange}
                  />
                  {modalErrors.boothNumber && <div className="invalid-feedback">{modalErrors.boothNumber}</div>}
                </div>
                <div className="mb-3">
                  <label className="form-label">Size</label>
                  <input
                    type="text"
                    name="size"
                    value={updatedBooth.size}
                    className={`form-control ${modalErrors.size ? 'is-invalid' : ''}`}
                    onChange={handleInputChange}
                  />
                  {modalErrors.size && <div className="invalid-feedback">{modalErrors.size}</div>}
                </div>
                <div className="mb-3">
                  <label className="form-label">Status</label>
                  <input
                    type="text"
                    name="status"
                    value={updatedBooth.status}
                    className={`form-control ${modalErrors.status ? 'is-invalid' : ''}`}
                    onChange={handleInputChange}
                  />
                  {modalErrors.status && <div className="invalid-feedback">{modalErrors.status}</div>}
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

export default AllAssignedbooths;
