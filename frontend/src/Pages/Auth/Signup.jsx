import React, { useState } from 'react';
import axios from 'axios'; // Importing axios for API requests

const SignUp = () => {
  // State for form fields - Use capitalized keys to match backend schema
  const [formData, setFormData] = useState({
    Name: '',        // Capitalized
    Email: '',       // Capitalized
    Password: '',    // Capitalized
    PhoneNumber: '', // Capitalized
  });

  // State for errors or success messages
  const [message, setMessage] = useState('');

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Add default values for UserRole and ProfilePic
      const dataToSend = {
        ...formData,
        UserRole: 'Attendee', // Default role
        ProfilePic: 'https://static.vecteezy.com/system/resources/previews/000/439/863/non_2x/vector-users-icon.jpg', // Default profile picture URL
      };

      console.log('Data being sent to server:', dataToSend);  // Log the data being sent

      // Send data to the server
      const response = await axios.post('http://localhost:4000/user', dataToSend);
      
      // Check for a successful response
      if (response.status === 200 || response.status === 201) {
        setMessage('Account created successfully!');
        setFormData({ Name: '', Email: '', Password: '', PhoneNumber: '' });
      } else {
        setMessage(`Error: ${response.statusText || 'Unknown Error'}`);
      }

    } catch (error) {
      // Improved error logging to identify issues
      console.error('Error details:', error.response ? error.response.data : error.message);
      setMessage('Error creating account. Please try again.');
    }
  };

  return (
    <div id="layoutAuthentication">
      <div id="layoutAuthentication_content">
        <main>
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-7">
                <div className="card shadow-lg border-0 rounded-lg mt-5">
                  <div className="card-header">
                    <h3 className="text-center font-weight-light my-4">
                      Create Account
                    </h3>
                  </div>
                  <div className="card-body">
                    <form onSubmit={handleSubmit}>
                      <div className="form-floating mb-3">
                        <input
                          className="form-control"
                          id="inputName"
                          type="text"
                          name="Name"  // Use capitalized name to match schema
                          placeholder="Enter your name"
                          value={formData.Name}  // Use capitalized state
                          onChange={handleChange}
                          required
                        />
                        <label htmlFor="inputName">Name</label>
                      </div>
                      <div className="form-floating mb-3">
                        <input
                          className="form-control"
                          id="inputEmail"
                          type="email"
                          name="Email"  // Use capitalized name to match schema
                          placeholder="name@example.com"
                          value={formData.Email}  // Use capitalized state
                          onChange={handleChange}
                          required
                        />
                        <label htmlFor="inputEmail">Email address</label>
                      </div>
                      <div className="form-floating mb-3">
                        <input
                          className="form-control"
                          id="inputPhoneNumber"
                          type="tel"
                          name="PhoneNumber"  // Use capitalized name to match schema
                          placeholder="12345678901"
                          value={formData.PhoneNumber}  // Use capitalized state
                          onChange={handleChange}
                          required
                        />
                        <label htmlFor="inputPhoneNumber">Phone Number</label>
                      </div>
                      <div className="form-floating mb-3">
                        <input
                          className="form-control"
                          id="inputPassword"
                          type="password"
                          name="Password"  // Use capitalized name to match schema
                          placeholder="Create a password"
                          value={formData.Password}  // Use capitalized state
                          onChange={handleChange}
                          required
                        />
                        <label htmlFor="inputPassword">Password</label>
                      </div>
                      <div className="mt-4 mb-0">
                        <div className="d-grid">
                          <button type="submit" className="btn btn-primary btn-block">
                            Create Account
                          </button>
                        </div>
                      </div>
                    </form>
                    {message && <div className="mt-3 alert alert-info">{message}</div>}
                  </div>
                  <div className="card-footer text-center py-3">
                    <div className="small">
                      <a href="/login">Have an account? Go to login</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default SignUp;
