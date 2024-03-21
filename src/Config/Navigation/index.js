import React, { useState, useEffect } from "react";
import LOGO from "../../Assests/logo.png";
import "./Style.css";
import { Link, useNavigate } from "react-router-dom";
import defaultAvatar from '../../Assests/imagelogin.png';
import axios from "axios";
import { baseurl } from "../../Config/utilites";
import Loader from '../../Components/Loader'
import moment from 'moment';


function Nav() {
  const token = localStorage.getItem('token');
  let navigate = useNavigate();
  const [avatar, setAvatar] = useState(localStorage.getItem('userAvatar') || defaultAvatar);
  const [notifications, setNotifications] = useState([]);
  const [isLoadingLogout, setIsLoadingLogout] = useState(false);
  const [type, setType] = useState("")
  console.log(type, "navie");


  const fetchNotifications = () => {
    const token = localStorage.getItem('token');
    console.log("Token retrieved", token);
    fetch(`${baseurl}/talent/home/notifications`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => response.json())
      .then(data => {
        // Adjust based on your actual data structure
        if (data.success) {
          // If the notifications are wrapped in a property (e.g., data.notifications)
          const fetchedNotifications = Array.isArray(data.notification) ? data.notification : [];
          setNotifications(data.data.notification);
          console.log("notification data", data.data.notification[0])
          console.log("notification data ===>>>", data.data.notification[0].title)



        } else {
          console.error('Invalid data format or unsuccessful response', data);
          setNotifications([]);
        }
      })
      .catch(error => {
        console.error('Error fetching notifications:', error);
        setNotifications([]);
      });
  };

  const handleLogout = () => {
    setIsLoadingLogout(true); // Start loading

    const token = localStorage.getItem('token');
     localStorage.getItem("user");
    axios.post(`${baseurl}/auth/logout`, {}, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(() => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
   
        setIsLoadingLogout(false); // Stop loading
        window.location.reload(); // Reload the page
        navigate("/")
      })
      .catch((error) => {
        console.error(error);
        setIsLoadingLogout(false); // Stop loading even if there's an error
      });
  };


  const Handleparamscomapany = () => {
    setType("company")
    setTimeout(() => {

      navigate("/companysignup", { state: { type: "company" } })
    }, 3000);
  }

  

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container">
          <Link to={"/"} className="navbar-brand" href="#">
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
                  to={"/"}
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
                <Link to={"/resume"} className="nav-link  " href="#">
                  <li> {token ? "Create Resume" : ""}</li>
                </Link>
              </li>

              <li className="nav-item">
                <Link to={"/chatroom"} className="nav-link  " href="#">
                {token && ( <li><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chat-left-text" viewBox="0 0 16 16">
                    <path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H4.414A2 2 0 0 0 3 11.586l-2 2V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
                    <path d="M3 3.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5M3 6a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 6m0 2.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5" />
                  </svg></li>)}
                </Link>
              </li>

              <li className="nav-item">
              {isLoadingLogout && <div><Loader /></div>}
              <div className="dropdown">
                {token && (<button style={{ borderColor: "transparent" }} onClick={fetchNotifications} className="btn dropdown-toggle" type="button" id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-bell-fill" viewBox="0 0 16 16" style={{ color: "rgb(24 187 171)", marginTop: "5px", marginRight: "5px" }}>
                    <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2m.995-14.901a1 1 0 1 0-1.99 0A5 5 0 0 0 3 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901" />
                  </svg>
                </button>)}
                <ul className="dropdown-menu scrollable-menu" aria-labelledby="dropdownMenuButton2" style={{ background: "#15bdac" }}>
                  {notifications.map((notification) => (
                    <li key={notification._id}>
                      <a className="dropdown-item text-white text-b">
                        <img src={"https://app.jobbooks.app/uploads/assets/lpxyks4sam9l6tl9jrur.png"} style={{ width: "8%", height: "8%", marginRight: "10px" }} />
                        {notification.title}
                      </a>
                      <a className="dropdown-item text-white" style={{ fontSize: "13px" }}>
                        {notification.message}
                      </a>

                      <a className="dropdown-item text-white text-end" style={{ fontSize: "13px" }}>
                        {moment(notification.createdAt).fromNow()}
                      </a>
                      <hr />

                    </li>
                  ))}
                </ul>

              </div>
              </li>
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
                  <img src={avatar} width="20" height="20" alt="profile" />
                </a>
                <ul
                  className="dropdown-menu dropdown-menu-bg-light" style={{ background: "#15bdac" }} aria-labelledby="dropdownMenuButton2"

                >
                  <Link to={"/companysignup"}>
                    <li className="box">
                      <a className="dropdown-item  " onClick={Handleparamscomapany}  >Signup as an company </a>
                    </li>
                  </Link>

                  <Link to={"/signup"}>
                    <li className="box">
                      <a className="dropdown-item ">Signup as an Talent</a>
                    </li>
                  </Link>


                  <li className="box"><p className="dropdown-item " style={{ color: "#fff", cursor: "pointer" }} onClick={handleLogout}>{token ? "logout" : ""}</p></li>
                </ul>
              </li>
            </ul>
            </ul>
      
           
          </div>
        </div>
      </nav>
    </>
  );
}

export default Nav;
