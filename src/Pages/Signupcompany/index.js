import React, { useState, useEffect } from "react";
import "./Styles.css";
import LOGO from "../../Assests/logo.png";
import SideImg from "../../Assests/signupimage.png";
import Facebook from "../../Assests/facebook.png";
import GOOGLE from "../../Assests/googleiconbtn.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "firebase/auth";
import { signInWithPopup } from "firebase/auth";
import { FacebookAuth, auth, googleAuthProvider } from "../../firebase";
import axios from "axios";
import Loader from "../../Components/Loader";
import { baseurl } from "../../Config/utilites";
import { toast } from 'react-toastify';
import { setUserType } from "../../store/actions/authActions";



function Signupfromcompanypage() {
  const location =useLocation();
  const {type}=location.state || {};
  console.log("type",setUserType);
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSignUp = async (event) => {
    event.preventDefault();
    if (isSigningUp) return;

    if (!name || !email || !password || !confirmPassword) {
      toast.warn("Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      toast.warn("Passwords do not match.");
      return;
    }

    setIsSigningUp(true);
    setIsLoading(true);

    try {
      const data = { firstName: name, email: email, password: password ,role:type };
      await axios.post(
        `${baseurl}/auth/signup`,
        data,
        {
          headers: { 
            "Content-Type": "application/json" 
          },
          
        }
        
      );
     
      toast.success("Register successful :)",data);
      navigate("/companylogin", { state: { type: setUserType } });
    } catch (error) {
      toast.error(error);
      console.log("An error occurred during sign up.");
    } finally {
      setIsSigningUp(false);
    }
  };

  const handleGoogleSignIn = async () => {
    // if (isSigningIn) return;
    // setIsSigningIn(true);

    // try {
    //   const result = await signInWithPopup(auth, googleAuthProvider);
    //   console.log("Firebase auth result:", result);

    //   const user = result.user;
    //   const token = user.idToken; 

    //   // Extract user details
    //   const data = {
    //     firstName: user.displayName,
    //     email: user.email,
    //     password: user.uid, // Consider security implications of using uid as password
    //     phone: user.phoneNumber,
    //   };

    //   // Call your backend API to register the user
    //   // Ensure that you're using the token obtained from Google for authorization
    //   await axios.post(`${baseurl}/auth/signup/google`, data, {
    //     headers: {
    //       "Content-Type": "application/json",
    //       Authorization: `Bearer ${token}`,
    //     },
    //   });

    //   alert("Register successful :)");
    //   localStorage.setItem("token", token); // Store the Google token for later use
    //   localStorage.setItem("user", JSON.stringify(data));
    //   setUserDetails(data); // Update state with the new user details
    //   navigate("/companylogin");
    // }  catch (error) {
    //   console.error("Error during sign up with Google:", error);
    // }finally {
    //   setIsSigningIn(false);
    // }
  };

  // const handleFacebookSignIn = async () => {
  //   const user = await FacebookAuth();
  //   console.log("facebook_user", user);
  // };

  const handleFacebookSignIn = async () => {
    // const user = await FacebookAuth();
    // console.log("facebook_user", user);

    // try {
    //   const result = await signInWithPopup(auth, FacebookAuth);
    //   const user = result.user;

    //   // Extract user details
    //   const data = {
    //     firstName: user.displayName, // Assuming your backend expects a 'firstName'
    //     email: user.email,
    //     password: user.uid, // Consider how you handle passwords
    //   };

    //   // Call your backend API to register the user
    //   await axios.post(`${baseurl}api/v1/jobbook/auth/signup`, data, {
    //     headers: { "Content-Type": "application/json" },
    //   });

    //   alert("Register successful :)");
    //   localStorage.setItem("token", user.accessToken);
    //   localStorage.setItem("user", JSON.stringify(data));
    //   setTimeout(() => {
    //     setIsLoading(false); // Hide loader after successful sign-up
    //     navigate("/login"); // Navigate to login page after successful sign-up
    //   }, 2000);

    // } catch (error) {
    //   console.error(error);
    //   alert("An error occurred during sign up with Facebook.");
    // } finally {
    //   setIsSigningIn(false);
    // }
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="continer main-no-border mainconsignup">
      <div className="container main-no-border mainDiv">
          {/* Loader component */}
          {isLoading && <Loader />} 
        <div className="container my-3">
          <div className="row" style={{ border: "none" }}>
            <div className="col-sm-6 mb-3 mb-sm-0 card-no-border-radius main-no-box-shadow">
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
                    <img
                      src={LOGO}
                      style={{ width: "50%", height: "80%" }}
                      className="img-no-border"
                      alt="Logo"
                    />
                  </h5>

                  <img
                    src={SideImg}
                    style={{ width: "60%", height: "60%" }}
                    className="card-text text-center my-5 img-no-border"
                    alt="Side Image"
                  />
                </div>
              </div>
            </div>
            <div className="col-sm-6 card-no-border-radius">
              <div
                className="card main-no-box-shadow"
                style={{ border: "none" }}
              >
                <div className="card-body">
                  <div className="text-end singinbtn">
                    <h6 className="card-title me-3">
                      Already have an account?
                    </h6>
                    <Link to={"/companylogin"}>
                      <button className="btn btn-outline-success popular btn-no-border">
                        SINGIN
                      </button>
                    </Link>
                  </div>
                  <h1 className="card-title text-start mx-2">
                    Welcome to Jobbooks!
                  </h1>
                  <h4 className="card-title text-start mx-2">
                    Register your account
                  </h4>

                  <div className="container my-4">
                    <div className="mb-3">
                      <h5
                        htmlFor="exampleFormControlInput1"
                        className="form-label text-start"
                      >
                        Name
                      </h5>
                      <input
                        type="text"
                        className="form-control inp"
                        id="exampleFormControlInput1"
                        placeholder="Name"
                        name="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
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
                        name="email"
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
                      <div className="input-group">
                        <input
                          type={showPassword ? "text" : "password"}
                          className="form-control inp"
                          id="exampleFormControlInput1"
                          placeholder="Password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                        <button
                          className="btn btn-outline-success"
                          type="button"
                          onClick={handleTogglePassword}
                        >
                          {showPassword ? (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              class="bi bi-eye"
                              viewBox="0 0 16 16"
                            >
                              <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                              <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0" />
                            </svg>
                          ) : (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              class="bi bi-eye-slash"
                              viewBox="0 0 16 16"
                            >
                              <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486z" />
                              <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829" />
                              <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708" />
                            </svg>
                          )}
                        </button>
                      </div>
                    </div>
                    <div className="mb-3">
                      <h5
                        htmlFor="exampleFormControlInput1"
                        className="form-label text-start"
                      >
                        Confirm Password
                      </h5>
                      <input
                        type={showPassword ? "text" : "password"}
                        className="form-control inp"
                        id="exampleFormControlInput1"
                        placeholder="Confrom Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                    </div>
                  </div>

                  <Link to={"/login"}>
                    <button
                      className="btn btn-outline-success mx-4 recent btn-no-border"
                      onClick={handleSignUp}
                    >
                      Sign up
                    </button>
                  </Link>
                  <center>
                    <div className="text-start mx-3 my-4 loginwith">
                      <h5 className="justify-content-center my-2">
                        Create account with
                      </h5>
                      <button
                        className="btn btn-outline-success mx-2 recent iconstyle btn-no-border"
                        onClick={handleFacebookSignIn}
                      >
                        <img
                          src={Facebook}
                          style={{ width: "80%", height: "80%" }}
                          alt="Facebook"
                        />
                      </button>

                      <button
                        className="btn btn-outline-success mx-2 recent iconstyle btn-no-border"
                        onClick={handleGoogleSignIn}
                        disabled={isSigningIn}
                      >
                        <img
                          src={GOOGLE}
                          style={{ width: "80%", height: "60%" }}
                          alt="Google"
                        />
                      </button>
                    </div>
                  </center>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signupfromcompanypage;
