import React, { useEffect, useState } from 'react';
import AdminSideBar from '../../Component/AdminSideBar';
import axios from 'axios';

const AllExhibitor = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false); // Modal visibility
  const [currentUser, setCurrentUser] = useState(null); // Current exhibitor being updated
  const [updatedUser, setUpdatedUser] = useState({}); // Updated exhibitor data
  const [modalErrors, setModalErrors] = useState({}); // Validation errors for modal fields

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:4000/exhibitor');
        if (response.data && Array.isArray(response.data.data)) {
          // Filter users to exclude those with UserRole: 'Exhibitor'
          const filteredUsers = response.data.data.filter(user => user.userID && user.userID[0] && user.userID[0].UserRole !== 'Exibiter');
          setUsers(filteredUsers);
        } else {
          throw new Error('Unexpected response format');
        }
      } catch (err) {
        setError(`Failed to fetch exhibitors: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleUpdateClick = (user) => {
    setCurrentUser(user);
    setUpdatedUser({ ...user }); // Copy the current exhibitor data for editing
    setModalErrors({});
    setShowModal(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUser((prev) => ({ ...prev, [name]: value }));

    // Clear specific error when user starts typing
    setModalErrors((prevErrors) => ({
      ...prevErrors,
      [name]: '',
    }));
  };

  const validateModalFields = () => {
    const errors = {};
    if (!updatedUser.CompanyName || updatedUser.CompanyName.trim() === '') {
      errors.CompanyName = 'Company Name is required.';
    }
    if (!updatedUser.Description || updatedUser.Description.trim() === '') {
      errors.Description = 'Description is required.';
    }
    if (!updatedUser.ContactDetails || !/^\d{11}$/.test(updatedUser.ContactDetails)) {
      errors.ContactDetails = 'Contact number must be 11 digits.';
    }
    if (!updatedUser.Logo || updatedUser.Logo.trim() === '') {
      errors.Logo = 'Logo URL is required.';
    }
    if (!updatedUser.ProductCategories || updatedUser.ProductCategories.trim() === '') {
      errors.ProductCategories = 'Product Categories are required.';
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
        `http://localhost:4000/exhibitor/${currentUser._id}`,
        { ...updatedUser } // Ensure the correct data is sent
      );
      console.log('Update Response:', response.data);

      // Update the exhibitors list locally
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === currentUser._id ? { ...user, ...updatedUser } : user
        )
      );

      setShowModal(false); // Close the modal
    } catch (err) {
      console.error('Update Error:', err);
      alert('Failed to update exhibitor!');
    }
  };

  const handleAccept = async (user) => {
    try {
      // Assuming user.userID is an array and userID[0]._id holds the correct user ID
      const userId = user.userID && user.userID[0] ? user.userID[0]._id : null;
  
      if (!userId) {
        throw new Error('User ID not found');
      }
  
      // Update the user role to "Exhibitor" in the backend
      const response = await axios.put(
        `http://localhost:4000/user/${userId}`,
        { UserRole: 'Exibiter' } // Set the role to Exhibitor
      );
  
  
      // Update the users list locally and remove accepted exhibitor from the list
      setUsers((prevUsers) =>
        prevUsers.filter((u) => u._id !== user._id) // This removes the user from the list
      );
    } catch (err) {
      console.error('Error updating user role:', err.response ? err.response.data : err.message);
      alert('Failed to update user role!');
    }
  };
  
  

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this exhibitor?');
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:4000/exhibitor/${id}`);
        // Remove the deleted exhibitor from the state
        setUsers((prevUsers) => prevUsers.filter((user) => user._id !== id));
      } catch (err) {
        console.error('Delete Error:', err);
        alert('Failed to delete exhibitor!');
      }
    }
  };

  return (
    <AdminSideBar>
      <div className="container-fluid px-4">
        <h1 className="mt-4">Exhibitors</h1>
        <div className="card mt-4">
          <div className="card-header">
            <i className="fas fa-table me-1" />
            All Exhibitors
          </div>
          <div className="card-body">
            {loading && <p>Loading exhibitors...</p>}
            {error && <div className="alert alert-danger">{error}</div>}
            {!loading && !error && users.length === 0 && <p>No exhibitors found.</p>}
            {!loading && !error && users.length > 0 && (
              <div className="table-responsive">
                <table className="table table-striped-columns">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">User Name</th>
                      <th scope="col">Company Name</th>
                      <th scope="col">Logo</th>
                      <th scope="col">Description</th>
                      <th scope="col">Contact Details</th>
                      <th scope="col">Product Categories</th>
                      <th scope="col">Booth</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user, index) => (
                      <tr key={user._id}>
                        <th scope="row">{index + 1}</th>
                        <td>{user.userID && user.userID[0] ? user.userID[0].Name : 'N/A'}</td>
                        <td>{user.CompanyName}</td>
                        <td>
                          <img src={user.Logo} alt="Logo" width="50" />
                        </td>
                        <td>{user.Description}</td>
                        <td>{user.ContactDetails}</td>
                        <td>{user.ProductCategories}</td>
                        <td>{user.boothID && user.boothID[0] ? user.boothID[0].boothNumber : 'N/A'}</td>
                        <td>
                          <button className="btn btn-success m-1" onClick={() => handleAccept(user)}>
                            Accept
                          </button>
                          <button className="btn btn-danger m-1" onClick={() => handleDelete(user._id)}>
                            Reject
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
                <h5 className="modal-title">Update Exhibitor</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Company Name</label>
                  <input
                    type="text"
                    name="CompanyName"
                    value={updatedUser.CompanyName || ''}
                    className={`form-control ${modalErrors.CompanyName ? 'is-invalid' : ''}`}
                    onChange={handleInputChange}
                  />
                  {modalErrors.CompanyName && <div className="invalid-feedback">{modalErrors.CompanyName}</div>}
                </div>
                <div className="mb-3">
                  <label className="form-label">Description</label>
                  <input
                    type="text"
                    name="Description"
                    value={updatedUser.Description || ''}
                    className={`form-control ${modalErrors.Description ? 'is-invalid' : ''}`}
                    onChange={handleInputChange}
                  />
                  {modalErrors.Description && <div className="invalid-feedback">{modalErrors.Description}</div>}
                </div>
                <div className="mb-3">
                  <label className="form-label">Contact Details</label>
                  <input
                    type="text"
                    name="ContactDetails"
                    value={updatedUser.ContactDetails || ''}
                    className={`form-control ${modalErrors.ContactDetails ? 'is-invalid' : ''}`}
                    onChange={handleInputChange}
                  />
                  {modalErrors.ContactDetails && (
                    <div className="invalid-feedback">{modalErrors.ContactDetails}</div>
                  )}
                </div>
                <div className="mb-3">
                  <label className="form-label">Logo URL</label>
                  <input
                    type="text"
                    name="Logo"
                    value={updatedUser.Logo || ''}
                    className={`form-control ${modalErrors.Logo ? 'is-invalid' : ''}`}
                    onChange={handleInputChange}
                  />
                  {modalErrors.Logo && (
                    <div className="invalid-feedback">{modalErrors.Logo}</div>
                  )}
                </div>
                <div className="mb-3">
                  <label className="form-label">Product Categories</label>
                  <input
                    type="text"
                    name="ProductCategories"
                    value={updatedUser.ProductCategories || ''}
                    className={`form-control ${modalErrors.ProductCategories ? 'is-invalid' : ''}`}
                    onChange={handleInputChange}
                  />
                  {modalErrors.ProductCategories && (
                    <div className="invalid-feedback">{modalErrors.ProductCategories}</div>
                  )}
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

export default AllExhibitor;
