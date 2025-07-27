import React from 'react';
import AdminSideBar from '../../Component/AdminSideBar';

const Home = () => {
    console.log("AdminHome component rendered");

  return (
    <>
     <AdminSideBar>
      <div className="container-fluid px-4">
        <h1 className="mt-4">Dashboard(Admin)</h1>
        <ol className="breadcrumb mb-4">
          <li className="breadcrumb-item active">Overview</li>
        </ol>
        <div className="row">
          <div className="col-xl-3 col-md-6">
            <div className="card bg-primary text-white mb-4">
              <div className="card-body">Primary Card</div>
              <div className="card-footer d-flex align-items-center justify-content-between">
                <a className="small text-white stretched-link" href="#">
                  View Details
                </a>
                <div className="small text-white"><i className="fas fa-angle-right" /></div>
              </div>
            </div>
          </div>
          {/* Add more content */}
        </div>
      </div>
    </AdminSideBar>
    </>
  );
};

export default Home;
