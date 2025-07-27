import React, { useEffect, useState } from 'react';
import AdminSideBar from '../../Component/AdminSideBar';
import axios from 'axios';

const AsignAbooth = () => {
  const [users, setUsers] = useState([]);
  const [booths, setBooths] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [selectedBooth, setSelectedBooth] = useState('');

  // Fetch exhibitors with UserRole "Exibiter"
  useEffect(() => {
    const fetchExhibitors = async () => {
      try {
        const response = await axios.get('http://localhost:4000/exhibitor');
        const exhibitors = response.data.data.filter(
          (exhibitor) => exhibitor.userID[0]?.UserRole === 'Exibiter'
        );
        setUsers(exhibitors);
      } catch (err) {
        setError(`Failed to fetch exhibitors: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchExhibitors();
  }, []);

  // Fetch booths
  useEffect(() => {
    const fetchBooths = async () => {
      try {
        const response = await axios.get('http://localhost:4000/booth');
        setBooths(response.data.data);
      } catch (err) {
        console.error('Error fetching booths:', err.message);
      }
    };

    fetchBooths();
  }, []);

  const handleAssignClick = (user) => {
    setCurrentUser(user);
    setSelectedBooth('');
    setShowModal(true);
  };

  const handleAssignBooth = async () => {
    if (!selectedBooth) {
      alert('Please select a booth!');
      return;
    }
  
    try {
      const response = await axios.put(`http://localhost:4000/exhibitor/${currentUser._id}`, {
        boothID: selectedBooth,
      });
  
      console.log('Booth assigned successfully:', response.data);
  
      // Update local users list with the new booth assignment
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === currentUser._id
            ? { ...user, boothID: [{ _id: selectedBooth, boothNumber: booths.find(b => b._id === selectedBooth)?.boothNumber }] }
            : user
        )
      );
  
      setShowModal(false); // Close the modal
    } catch (err) {
      console.error('Error assigning booth:', err.message);
      alert('Failed to assign booth!');
    }
  };
  

  return (
    <AdminSideBar>
      <div className="container-fluid px-4">
        <h1 className="mt-4">Assign Booth</h1>
        <div className="card mt-4">
          <div className="card-header">
            <i className="fas fa-table me-1" />
            Assign Booths
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
                        <td>{user.userID[0]?.Name || 'N/A'}</td>
                        <td>{user.CompanyName}</td>
                        <td>
                          <img src={user.Logo} alt="Logo" width="50" />
                        </td>
                        <td>{user.Description}</td>
                        <td>{user.ContactDetails}</td>
                        <td>{user.ProductCategories}</td>
                        <td>
                          {user.boothID[0]?.boothNumber || 'Unassigned'}
                        </td>
                        <td>
                          <button
                            className="btn btn-warning"
                            onClick={() => handleAssignClick(user)}
                          >
                            Assign Booth
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

      {/* Modal for assigning booth */}
      {showModal && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Assign Booth</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Select Booth</label>
                  <select
                    className="form-select"
                    value={selectedBooth}
                    onChange={(e) => setSelectedBooth(e.target.value)}
                  >
                    <option value="">Select a booth</option>
                    {booths
                        .filter((booth) => !users.some((user) => user.boothID[0]?._id === booth._id)) // Exclude assigned booths
                        .map((booth) => (
                        <option key={booth._id} value={booth._id}>
                            {booth.boothNumber}
                        </option>
                    ))}
                  </select>
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
                  onClick={handleAssignBooth}
                >
                  Assign
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminSideBar>
  );
};

export default AsignAbooth;
