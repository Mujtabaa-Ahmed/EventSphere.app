import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirecting
import axios from 'axios';  // Importing axios for API requests

const Login = () => {
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); // Hook for navigating

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.get('http://localhost:4000/user');
  
      if (response.status === 200) {
        const users = response.data.data; // Access the array of users
        const user = users.find(
          (u) => u.Email === Email && u.Password === Password
        );
  
        if (user) {
          // Check the user role and redirect accordingly
          localStorage.setItem('user', JSON.stringify(user));
          if (user.UserRole === 'Admin') {
            navigate('/admin'); // Redirect to the Admin Dashboard
          } else if (user.UserRole === 'Exibiter') {
            navigate('/exibiter'); // Redirect to Exhibitor Dashboard
          } else if(user.UserRole === 'Attendee'){
            navigate('/'); // Redirect to Attendee Dashboard
          }
          else {
            setMessage('Unknown role. Please contact support.');
          }
        } else {
          setMessage('Invalid email or password.');
        }
      }
    } catch (error) {
      console.error(error);
      setMessage('Something went wrong. Please try again.');
    }
  };
  
  return (
    <>
      <div id="layoutAuthentication">
        <div id="layoutAuthentication_content">
          <main>
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-lg-5">
                  <div className="card shadow-lg border-0 rounded-lg mt-5">
                    <div className="card-header">
                      <h3 className="text-center font-weight-light my-4">Login</h3>
                    </div>
                    <div className="card-body">
                      <form onSubmit={handleSubmit}>
                        <div className="form-floating mb-3">
                          <input
                            className="form-control"
                            id="inputEmail"
                            type="email"
                            placeholder="name@example.com"
                            value={Email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                          />
                          <label htmlFor="inputEmail">Email address</label>
                        </div>
                        <div className="form-floating mb-3">
                          <input
                            className="form-control"
                            id="inputPassword"
                            type="password"
                            placeholder="Password"
                            value={Password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                          />
                          <label htmlFor="inputPassword">Password</label>
                        </div>
                        <div className="form-check mb-3">
                          <input
                            className="form-check-input"
                            id="inputRememberPassword"
                            type="checkbox"
                            defaultValue=""
                          />
                          <label
                            className="form-check-label"
                            htmlFor="inputRememberPassword"
                          >
                            Remember Password
                          </label>
                        </div>
                        <div className="d-flex align-items-center justify-content-between mt-4 mb-0">
                          <a className="small" href="password.html">
                            Forgot Password?
                          </a>
                          <button className="btn btn-primary" type="submit">
                            Login
                          </button>
                        </div>
                      </form>
                      {message && (
                        <div
                          className={`mt-3 alert ${message.includes('Invalid email or password.') ? 'alert-danger' : 'alert-info'}`}
                        >
                          {message}
                        </div>
                      )}
                    </div>
                    <div className="card-footer text-center py-3">
                      <div className="small">
                        <a href="/SignUp">Need an account? Sign up!</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default Login;
