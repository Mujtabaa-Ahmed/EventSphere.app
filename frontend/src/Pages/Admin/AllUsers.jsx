import React, { useEffect, useState } from 'react';
import AdminSideBar from '../../Component/AdminSideBar';
import axios from 'axios';

const AllUser = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false); // Modal visibility
  const [currentUser, setCurrentUser] = useState(null); // Current user being updated
  const [updatedUser, setUpdatedUser] = useState({}); // Updated user data
  const [modalErrors, setModalErrors] = useState({}); // Validation errors for modal fields

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:4000/user');
        if (response.data && Array.isArray(response.data.data)) {
          setUsers(response.data.data); // Use response.data.data for the users array
        } else {
          throw new Error('Unexpected response format');
        }
      } catch (err) {
        setError(`Failed to fetch users: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleUpdateClick = (user) => {
    setCurrentUser(user);
    setUpdatedUser({ ...user }); // Copy the current user data for editing
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
    if (!updatedUser.Name || updatedUser.Name.trim() === '') {
      errors.Name = 'Name is required.';
    }
    if (!updatedUser.Email || updatedUser.Email.trim() === '') {
      errors.Email = 'Email is required.';
    }
    if (!updatedUser.PhoneNumber || !/^\d{11}$/.test(updatedUser.PhoneNumber)) {
      errors.PhoneNumber = 'Phone number must be 11 digits.';
    }
    if (!updatedUser.ProfilePic || updatedUser.ProfilePic.trim() === '') {
      errors.ProfilePic = 'Profile picture URL is required.';
    }
    if (!updatedUser.UserRole || updatedUser.UserRole.trim() === '') {
      errors.Role = 'Role is required.';
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
        `http://localhost:4000/user/${currentUser._id}`,
        { ...updatedUser } // Ensure the correct data is sent
      );
      console.log('Update Response:', response.data);

      // Update the users list locally
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === currentUser._id ? { ...user, ...updatedUser } : user
        )
      );

      setShowModal(false); // Close the modal
    } catch (err) {
      console.error('Update Error:', err);
      alert('Failed to update user!');
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this user?');
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:4000/user/${id}`);
        // Remove the deleted user from the state
        setUsers((prevUsers) => prevUsers.filter((user) => user._id !== id));
      } catch (err) {
        console.error('Delete Error:', err);
        alert('Failed to delete user!');
      }
    }
  };

  return (
    <AdminSideBar>
      <div className="container-fluid px-4">
        <h1 className="mt-4">Users</h1>
        <div className="card mt-4">
          <div className="card-header">
            <i className="fas fa-table me-1" />
            All Users
          </div>
          <div className="card-body">
            {loading && <p>Loading users...</p>}
            {error && <div className="alert alert-danger">{error}</div>}
            {!loading && !error && users.length === 0 && <p>No users found.</p>}
            {!loading && !error && users.length > 0 && (
              <div className="table-responsive">
                <table className="table table-striped-columns">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Name</th>
                      <th scope="col">Email</th>
                      <th scope="col">Phone Number</th>
                      <th scope="col">Profile Picture</th>
                      <th scope="col">Role</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user, index) => (
                      <tr key={user._id}>
                        <th scope="row">{index + 1}</th>
                        <td>{user.Name}</td>
                        <td>{user.Email}</td>
                        <td>{user.PhoneNumber}</td>
                        <td>
                          <img src={user.ProfilePic} alt="Profile" width="50" />
                        </td>
                        <td>{user.UserRole}</td>
                        <td>
                          <button className="btn btn-success m-1" onClick={() => handleUpdateClick(user)}>
                            Update
                          </button>
                          <button className="btn btn-danger m-1" onClick={() => handleDelete(user._id)}>
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
                <h5 className="modal-title">Update User</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Name</label>
                  <input
                    type="text"
                    name="Name"
                    value={updatedUser.Name || ''}
                    className={`form-control ${modalErrors.Name ? 'is-invalid' : ''}`}
                    onChange={handleInputChange}
                  />
                  {modalErrors.Name && <div className="invalid-feedback">{modalErrors.Name}</div>}
                </div>
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    name="Email"
                    value={updatedUser.Email || ''}
                    className={`form-control ${modalErrors.Email ? 'is-invalid' : ''}`}
                    onChange={handleInputChange}
                  />
                  {modalErrors.Email && <div className="invalid-feedback">{modalErrors.Email}</div>}
                </div>
                <div className="mb-3">
                  <label className="form-label">Phone Number</label>
                  <input
                    type="text"
                    name="PhoneNumber"
                    value={updatedUser.PhoneNumber || ''}
                    className={`form-control ${modalErrors.PhoneNumber ? 'is-invalid' : ''}`}
                    onChange={handleInputChange}
                  />
                  {modalErrors.PhoneNumber && (
                    <div className="invalid-feedback">{modalErrors.PhoneNumber}</div>
                  )}
                </div>
                <div className="mb-3">
                  <label className="form-label">Profile Picture URL</label>
                  <input
                    type="text"
                    name="ProfilePic"
                    value={updatedUser.ProfilePic || ''}
                    className={`form-control ${modalErrors.ProfilePic ? 'is-invalid' : ''}`}
                    onChange={handleInputChange}
                  />
                  {modalErrors.ProfilePic && (
                    <div className="invalid-feedback">{modalErrors.ProfilePic}</div>
                  )}
                </div>
                <div className="mb-3">
                  <label className="form-label">Role</label>
                  <select
                    name="UserRole"
                    value={updatedUser.UserRole || ''}
                    className={`form-control ${modalErrors.Role ? 'is-invalid' : ''}`}
                    onChange={handleInputChange}
                  >
                    <option value="">Select Role</option>
                    <option value="Admin">Admin</option>
                    <option value="Exibiter">Exibiter</option>
                    <option value="Attendee">Attendee</option>
                  </select>
                  {modalErrors.Role && <div className="invalid-feedback">{modalErrors.Role}</div>}
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

export default AllUser;
