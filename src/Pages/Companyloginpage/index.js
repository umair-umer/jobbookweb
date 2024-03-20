import React, { useContext, useState,useEffect } from 'react';
import LOGO from "../../Assests/logo.png";
import SideImg from "../../Assests/loginsideimg.png";
import IMG from "../../Assests/imagelogin.png";
import Facebook from "../../Assests/facebook.png";
import GOOGLE from "../../Assests/googleiconbtn.png";
import { Link, useNavigate } from "react-router-dom";
import "firebase/auth";
import { signInWithPopup } from "firebase/auth";
import { FacebookAuth, auth, googleAuthProvider } from "../../firebase";
import axios from "axios";
import qs from "qs";
import { useDispatch } from 'react-redux';
import { setAuthInfo } from '../../store/actions/authActions';
import Loader from '../../Components/Loader';
import { baseurl } from '../../Config/utilites';
import TypeContext from '../../Components/ContextApi';
import { useLocation } from 'react-router-dom';

function Loginfromcompanypage() {
  const navigate = useNavigate();
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);


  const location = useLocation();
  const { type } = location.state || {};
  const { setType } = useContext(TypeContext);
  const dispatch = useDispatch();

  
  useEffect(() => {
    if (type) {
      localStorage.setItem('userType', type); // Store type in localStorage
      dispatch(setType(type)); // Update Redux store
      setType(type); // If using context, set the type here as well
    }
  }, [type, dispatch, setType]);


  const handleLogin = async (e) => {
    const { token, role } = handleLogin;

    e.preventDefault(); // Prevent default form submission
    if (isLoggingIn) return;
  
    setIsLoggingIn(true);
  
    let data = qs.stringify({
      username: email,
      password: password,
    });
  
    let config = {
      method: "post",
      url: `${baseurl}/auth/login`,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: data,
    };
  
    try {
      const response = await axios.request(config);
      console.log(JSON.stringify(response.data));
      console.log("login Successfully :) ");
      // Assuming the response contains the token you need to store
      localStorage.setItem("token", response.data.token); // Adjust according to your response structure
      localStorage.setItem("user", response.data.user.id);
      localStorage.setItem("userRole", response.data.user.role);

      console.log("data",response.data.user);
      console.log("data012",response.data.user.id);

      // Navigate to the home page
      navigate("/companyhomepage");
    } catch (error) {
      console.error(error);
      console.log(
        "Login failed: " + (error.response?.data.message || "Unknown error")
      );
    } finally {
      setIsLoggingIn(false);
    }
  };
  

  const handleGoogleSignIn = async () => {
    // if (isSigningIn) return; // Prevent multiple clicks while signing in
    // setIsSigningIn(true); // Set signing in state to true

    // try {
    //   const result = await signInWithPopup(auth, googleAuthProvider);
    //   console.log(result);
    //   localStorage.setItem("token", result.user.accessToken);
    //   localStorage.setItem("user", JSON.stringify(result.user)); // 'user' needs to be a string
    //   navigate("/home");
    //   // Handle successful Google sign-in
    // } catch (error) {
    //   console.error(error);
    //   // Handle errors
    // } finally {
    //   setIsSigningIn(false);
    // }
  };

  const handleFacebookSignIn = async () => {
    // const user = await FacebookAuth();
    // console.log("facebook_user", user);
  };

  return (
    <div className="continer mainconsignup">
      <div className="container mainDiv">
      {isLoggingIn && <div className="loader-overlay"><Loader /></div>}
        <div className="container my-3">
          <div className="row" style={{ border: "none" }}>
            <div className="col-sm-6 mb-3 mb-sm-0  ">
              <div
                className="card card-no-border"
                style={{
                  backgroundColor: "#82DFC0",
                  opacity: "0.9",
                  border: "none",
                }}
              >
                <div className="card-body card-no-border cdimg">
                  <h5 className="card-title text-start">
                    <img src={LOGO} style={{ width: "50%", height: "80%" }} />
                  </h5>

                  <img
                    src={SideImg}
                    style={{ width: "60%", height: "60%" }}
                    className="card-text text-center my-5"
                  />
                </div>
              </div>
            </div>
            <div className="col-sm-6 card-no-border-radius">
              <div className="card" style={{ border: "none" }}>
                <div className="card-body">
                  <div className="text-end singinbtn">
                    <h6 className="card-title me-3">
                      Already have an account?
                    </h6>
                    <Link to={"/companysignup"}>
                    <button className="btn btn-outline-success"  style={{borderRadius:"20px"}}> 
                      SINGUP
                    </button>
                    </Link>
                  </div>
                  <h1 className="card-title text-start mx-2">
                    <img src={IMG} style={{ width: "8%" }} />
                  </h1>
                  <h1 className="card-title text-start mx-2">
                    Log in to your Account
                  </h1>
                  <h6 className="card-title text-start mx-2">
                    Welcome back! Select method to log in
                  </h6>

                  <div className="my-5">
                    <button
                      type="button"
                      className="btn btn-outline-success mx-3"
                      onClick={handleGoogleSignIn}
                    >
                      <img
                        src={GOOGLE}
                        style={{
                          width: "20px",
                          height: "20px",
                          marginRight: "5px",
                        }}
                      />
                      login with google
                    </button>
                    <button
                      type="button"
                      className="btn btn-outline-success"
                      onClick={handleFacebookSignIn}
                    >
                      <img
                        src={Facebook}
                        style={{
                          width: "11px",
                          height: "18px",
                          marginRight: "5px",
                        }}
                      />{" "}
                      login with Facebook
                    </button>
                  </div>
                  <h5>Create account with</h5>

                  <div className="container my-4">
                    <div className="mb-3">
                      <h5
                        htmlFor="exampleFormControlInput1"
                        className="form-label text-start"
                      >
                        Email address
                      </h5>
                      <input
                        type="email"
                        className="form-control inp "
                        id="exampleFormControlInput1"
                        placeholder="name@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>

                    <div className="mb-3">
                      <h5
                        htmlFor="exampleFormControlInput1"
                        className="form-label text-start"
                      >
                        Password
                      </h5>
                      <input
                        type="password"
                        className="form-control inp"
                        id="exampleFormControlInput1"
                        placeholder="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>
         
                <button type="button" className="btn btn-outline-success btnnn"
                onClick={handleLogin} disabled={isLoggingIn}
                >
                  Login
                </button>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Loginfromcompanypage;
