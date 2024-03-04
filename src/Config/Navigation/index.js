import React, { useState, useEffect } from "react";
import LOGO from "../../Assests/logo.png";
import "./Style.css";
import { Link, useNavigate } from "react-router-dom";
import defaultAvatar from '../../Assests/imagelogin.png';
import axios from "axios";
import {  baseurl } from "../../Config/utilites";


function Nav() {
    let navigate = useNavigate(); // Use useNavigate for navigation
  // Use a state hook to manage the avatar, initializing it either from local storage or with a default image
  const [avatar, setAvatar] = useState(localStorage.getItem('userAvatar') || defaultAvatar);

  useEffect(() => {
    // Attempt to load the avatar from local storage when the component mounts
    const savedAvatar = localStorage.getItem('userAvatar');
    if (savedAvatar) {
      setAvatar(savedAvatar);
    }
  }, []);

  const handleLogout = () => {
    const token = localStorage.getItem('token');
    console.log("Token retrieved", token);
    
    let config = {
      method: 'post',
      url: `${baseurl}/auth/logout`,
      headers: { 
        'Authorization': `Bearer ${token}`
      },
    };
  
    axios.request(config)
      .then(() => {
        console.log("Logout successful");
        localStorage.removeItem("token");
        localStorage.removeItem("userAvatar"); // Also remove the avatar from local storage upon logout
        navigate('/', { replace: true });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const triggerFileInput = () => {
    document.getElementById('avatarInput').click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result);
        localStorage.setItem('userAvatar', reader.result); // Save the base64 image string to local storage
      };
      reader.readAsDataURL(file);
    }
  };

  
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container">
          <Link to={"/home"} className="navbar-brand" href="#">
            <img
              src={LOGO}
              onResize={"center"}
              style={{ width: "80%", height: "80%" }}
            />
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
                <Link
                  to={"/home"}
                  className="nav-link"
                  aria-current="page"
                  href="#"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/job"} className="nav-link" href="#">
                  Jobs
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/training"} className="nav-link" href="#">
                  Training
                </Link>
              </li>
              <li className="nav-item dropdown">
                <Link to={"/premium"} className="nav-link " href="#">
                  Premium
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/resume"} className="nav-link ms-3 " href="#">
                  Create Resume
                </Link>
              </li>
            </ul>
            <form className="d-flex" role="search">
              <>
                {/* <Link to={"/companysignup"}>
                  <button type="button" className="btn btn-success btnnn">
                    Sign Up
                  </button>
                </Link>

                <Link to={"/companylogin"}>
                  <button
                    type="button"
                    className="btn btn-success btnnn"
                    style={{ marginLeft: "20px" }}
                  >
                    Login
                  </button>
                </Link> */}
              </>
            </form>
            <ul className="navbar-nav">
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdownMenuLink"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {/* <img src={avatar} width="30" height="30" alt="profile" className="rounded-circle"/> */}
                </a>
                <ul
                  className="dropdown-menu"
                  aria-labelledby="navbarDropdownMenuLink"
                >
                  {/* <li><a className="dropdown-item" href="#" onClick={triggerFileInput}>Change Image</a></li> */}
                  <li><a className="dropdown-item " href="#">Notifications</a></li>
                  <Link to={"/companysignup"}>
                  <li>
                    <p className="dropdown-item"  >Signup as an company </p>
                    </li>
                    </Link>

                    <Link to={"/signup"}>
                  <li>
                    <p className="dropdown-item">Signup as an Talent</p>
                  </li>
                 </Link>

                  <li><p className="dropdown-item" onClick={handleLogout}>Log Out</p></li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
        {/* <input
          type="file"
          id="avatarInput"
          style={{ display: 'none' }}
          onChange={handleFileChange}
          accept="image/*"
        /> */}
      </nav>
    </>
  );
}

export default Nav;
