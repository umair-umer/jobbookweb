import React from 'react'
import LOGO from '../../Assests/logo.png'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { baseurl } from '../utilites';

function TalentNav() {
    let navigate = useNavigate(); // Use useNavigate for navigation

    const handleLogout = () => {
        // Correctly retrieve the token from localStorage
        const token = localStorage.getItem('token');
        console.log("Token retrieved", token);
      
        // Prepare the configuration for the axios request
        let config = {
          method: 'post',
          url: `${baseurl}/auth/logout`,
          headers: { 
            'Authorization': `Bearer ${token}` // Use the token from localStorage
          },
        };
      
        // Make the axios request
        axios.request(config)
        .then(() => {
          console.log("Logout successful");
          localStorage.removeItem("token"); // Remove the token from localStorage
          navigate('/', { replace: true }); // Navigate to login page or another appropriate page
        })
        .catch((error) => {
          console.log(error);
        });
      };
      

  return (
    <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container">
                    <Link to={'/companyhomepage'} className="navbar-brand" href="#">
                        <img src={LOGO} onResize={"center"} style={{ width: "80%", height: "80%" }} />
                    </Link>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link to={"/companyhomepage"}
                                 className="nav-link" aria-current="page" href="#">
                                    Home
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to={'/comapnytrainingpage'} className="nav-link" href="#">
                                    Training
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to={'/companytalentsearchpage'} className="nav-link" href="#">
                                    Talent search
                                </Link>
                            </li>
                          
                            <li className="nav-item dropdown">
                                <Link to={'/companypremiumpage'} className="nav-link " href="#" >
                                    Premium
                            </Link>
                            </li>
                            <li className="nav-item">
                                <Link to={'/jobpost'} className="nav-link " href="#">
                                   Post jobs
                                </Link>
                            </li>
                        </ul>
                        <form className="d-flex" role="search">
                            <>
                             
                               <button type="button" className="btn btn-success btnnn" onClick={handleLogout}  >
                                Log out
                                </button>
                           
                            </>

                        </form>
                    </div>
                </div>
            </nav>


        </>
  )
}

export default TalentNav