import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import '../assets/css/styles.css';



const ExibiterSidebar = ({ children }) => {
  const navigate = useNavigate(); // Initialize navigate
  
    // Function to handle logout
    const handleLogout = () => {
      localStorage.removeItem('user'); // Remove user data from localStorage
      navigate('/login'); // Navigate to login page
    };
  return (
    <>
            <nav className="sb-topnav navbar navbar-expand navbar-dark bg-dark">
        {/* Navbar Brand*/}
        <a className="navbar-brand ps-4" href="index.html">
           EventSphere(Exibiter)
        </a>
        {/* Sidebar Toggle*/}
        <button
          className="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0"
          id="sidebarToggle"
          href="#!"
        >
          <i className="fas fa-bars" />
        </button>
        {/* Navbar Search */}
        <form className="d-none d-md-inline-block form-inline ms-auto me-0 me-md-3 my-2 my-md-0">
          <div className="input-group">
            <input
              className="form-control"
              type="text"
              placeholder="Search for..."
              aria-label="Search for..."
              aria-describedby="btnNavbarSearch"
            />
            <button className="btn btn-primary" id="btnNavbarSearch" type="button">
              <i className="fas fa-search" />
            </button>
          </div>
        </form>
        {/* Navbar */}
        <ul className="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">
          <li className="nav-item dropdown">
            <a
              className="nav-link dropdown-toggle"
              id="navbarDropdown"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i className="fas fa-user fa-fw" />
            </a>
            <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
              <li><a className="dropdown-item" href="#!">Settings</a></li>
              <li><a className="dropdown-item" href="#!">Activity Log</a></li>
              <li><hr className="dropdown-divider" /></li>
              <li><a className="dropdown-item" href="#!" onClick={handleLogout}>
                  Logout
                </a></li>
            </ul>
          </li>
        </ul>
      </nav>
      <div id="layoutSidenav">
        <div id="layoutSidenav_nav">
          <nav className="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
            <div className="sb-sidenav-menu">
              <div className="nav">
                <div className="sb-sidenav-menu-heading">Core</div>
                <Link className="nav-link" to="/admin">
                  <div className="sb-nav-link-icon">
                    <i className="fas fa-tachometer" />
                  </div>
                  Dashboard
                </Link>              
                <Link class="nav-link collapsed" to="#" data-bs-toggle="collapse" data-bs-target="#collapseLayouts1" aria-expanded="false" aria-controls="collapseLayouts">
                                <div class="sb-nav-link-icon"><i class="fas fa-user"></i></div>
                                Users
                                <div class="sb-sidenav-collapse-arrow"><i class="fas fa-angle-down"></i></div>
                            </Link>
                            <div class="collapse" id="collapseLayouts1" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
                                <nav class="sb-sidenav-menu-nested nav">
                                    <Link to="/exibiter/expo" class="nav-link" >Expos</Link>
                                </nav>
                            </div>
               
                <a class="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#collapseLayouts2" aria-expanded="false" aria-controls="collapseLayouts">
                                <div class="sb-nav-link-icon"><i class="fas fa-building"></i></div>
                                  Manage Expo
                                <div class="sb-sidenav-collapse-arrow"><i class="fas fa-angle-down"></i></div>
                            </a>
                            <div class="collapse" id="collapseLayouts2" aria-labelledby="headingTwo" data-bs-parent="#sidenavAccordion">
                                <nav class="sb-sidenav-menu-nested nav">
                                    <Link to="/allevent" class="nav-link" href="layout-static.html">All Events</Link>
                                    <Link to="/addevent" class="nav-link" href="layout-sidenav-light.html">Add Events</Link>
                                </nav>
                            </div>
                
            
             
             <a class="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#collapseLayouts3" aria-expanded="false" aria-controls="collapseLayouts">
                                <div class="sb-nav-link-icon"><i class="fas fa-store"></i></div>
                              Manage Exibiter
                                <div class="sb-sidenav-collapse-arrow"><i class="fas fa-angle-down"></i></div>
                            </a>
                            <div class="collapse" id="collapseLayouts3" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
                                <nav class="sb-sidenav-menu-nested nav">
                                <Link to="/admin" class="nav-link" href="layout-static.html">Registration</Link>
                                    <Link to="/admin" class="nav-link" href="layout-static.html">Applications</Link>
                                    <Link to="/admin" class="nav-link" href="layout-sidenav-light.html">Assign Booth</Link>
                                </nav>
                            </div>
                

                <a class="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#collapseLayouts4" aria-expanded="false" aria-controls="collapseLayouts">
                                <div class="sb-nav-link-icon"><i class="fas fa-calendar"></i></div>
                                Schedule 
                                <div class="sb-sidenav-collapse-arrow"><i class="fas fa-angle-down"></i></div>
                            </a>
                            <div class="collapse" id="collapseLayouts4" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
                                <nav class="sb-sidenav-menu-nested nav">
                                    <Link to="/admin" class="nav-link" href="layout-static.html">Create Event</Link>
                                    <Link to="/admin" class="nav-link" href="layout-static.html">Manage Session</Link>
                                </nav>
                            </div>
                <Link className="nav-link" to="/admin">
                  <div className="sb-nav-link-icon">
                    <i className="fas fa-chart-line" />
                  </div>
                  Report
                </Link>
              
                
                
                
                {/* Other Sidebar Links */}
              </div>
            </div>
            <div className="sb-sidenav-footer">
              <div className="small">Logged in as:</div>
               Event Sphere
            </div>
          </nav>
        </div>
        <div id="layoutSidenav_content">
          {/* Inject Children */}
          <main>{children}</main>
          <footer className="py-4 bg-light mt-auto">
            <div className="container-fluid px-4">
              <div className="d-flex align-items-center justify-content-between small">
                <div className="text-muted">Copyright © Your Website 2023</div>
                <div>
                  <a href="#">Privacy Policy</a> · <a href="#">Terms &amp; Conditions</a>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
};

export default ExibiterSidebar;
