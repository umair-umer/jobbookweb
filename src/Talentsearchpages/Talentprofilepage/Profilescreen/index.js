import React, { useState, useEffect } from "react";
import axios from "axios";
import Cover from "../../../Assests/coverpicture.png";
import Profile from "../../../Assests/ganja.png";
import Skills from "../../../Assests/users.png";
import World from "../../../Assests/world.png";
import Eduacation from "../../../Assests/eduacation.png";
import "./Style.css";
import { useParams } from "react-router-dom";
import Loader from "../../../Components/Loader";
import { Imagebaseurl, baseurl } from "../../../Config/utilites";


function Userprofilescreen() {
  const [profileData, setProfileData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { userId } = useParams(); 
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchProfileData = async () => {
      const apiUrl = `${baseurl}/auth/user-profile?userId=${userId}`;
  
      try {
        setIsLoading(true);
        const response = await axios.get(apiUrl, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        if (response.data.success && response.data.data.length > 0) {
          setProfileData(response.data.data[0]); // Access the first item of the array
          
        } else {
          // Handle the case where the array is empty or success is false
          console.error('No profile data found or request not successful');
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }finally{
        setIsLoading(false);
      }
    };
  
    fetchProfileData();
  
  }, [userId, token]);
  
  // ...
  
  // Then in your rendering, you can check if profileData has been set:
  if (!profileData) return <div><Loader/></div>;



  return (
    <div className="profilescreen_sec">
      <div className="container-fluid mx-5">
        <div className="row">
          <div className="col-12">
            <div className="profile_big_img">
              <img src={Cover} style={{ width: "100%", height: "80%" }} />
            </div>
          </div>
          <div className="col-12">
            <div
              className="profile_img_content_box"
              style={{ marginTop: "-2px" }}
            >
              <div className="img_pro">
                <img src={`${Imagebaseurl}${profileData.picture}`} style={{width:"150px",height:"150px",borderRadius:"50%"}} />
              </div>
              <div className="profile_content_main_box my-3 mx-3">
                <h5>{profileData.name}</h5>
                <p>
                  Freelance UX/UI designer, 80+ projects in web design, mobile
                  {profileData.experience}
                  apps (iOS & android)<br />
                 <span>  {profileData.email}</span>
                 <br />
                 <span>  {profileData.phone}</span>
                 <br />
                 <span>  {profileData.location}</span>
                </p>
               
                <div className="profile_content_btn_box">
                  <a href="">Contact info</a>
                  <a href="">Connect</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container-fluid mx-5 my-5">
        <div className="row">
          <div className="col-12 d-flex flex-row"></div>
          <div className="col-12">
            <div className="profile_img_content_box_two">
              <h5>Skills & Endoresments</h5>
              <div className="profile_content_main_box_two">
                <div className="experiance_box my-5">
                  <h3 style={{ fontSize: "20px" }}>User experience (UX)</h3>
                  <img
                    src={Skills}
                    style={{ width: "200px", height: "20%", resize: "center" }}
                  />
                </div>
                <div className="experiance_box my-5">
                  <h3 style={{ fontSize: "20px" }}>User experience (UX)</h3>
                  <img
                    src={Skills}
                    style={{ width: "200px", height: "20%", resize: "center" }}
                  />
                </div>
                <div className="experiance_box my-5">
                  <h3 style={{ fontSize: "20px" }}>User experience (UX)</h3>
                  <img
                    src={Skills}
                    style={{ width: "200px", height: "20%", resize: "center" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid mx-5 my-5">
        <div className="row">
          <div className="third_profile_bocx">
            <h5>Experience</h5>
            <div className="profile_third_box_main">
              <div>
                <img src={World} alt="" />
              </div>
              <div className="pro_third_content">
                <h3>Freelance UX/UI designer</h3>
                <div className="flex_box_main">
                  <p>Self Employed</p>
                  <p>Around the world</p>
                </div>
                <div className="flex_box_main">
                  <p>Jun 2016 — Present</p>
                  <span>3 yrs 3 mos</span>
                </div>
                <p>
                  Work with clients and web studios as freelancer. Work in next
                  areas: eCommerce web projects; creative landing pages; iOs and
                  Android apps; corporate web sites and corporate identity
                  sometimes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid mx-5 my-5">
        <div className="row">
          <div className="third_profile_bocx">
            <h5>Education</h5>
            <div className="profile_third_box_main">
              <div>
                <img src={Eduacation} alt="" />
              </div>
              <div className="pro_third_content">
                <h3>Moscow State Linguistic University</h3>
                <div className="flex_box_main">
                  <p>Bachelor's degree Field Of StudyComputer and Information Systems Security/Information Assurance</p>
                  
                </div>
                <div className="flex_box_main">
                  <p>2013 — 2017</p>
                </div>
                <p>
                Additional English classes and UX profile courses​.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Userprofilescreen;
