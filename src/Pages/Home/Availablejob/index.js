import React, { useEffect, useState } from "react";
import axios from "axios";
import AOS from "aos";
import "aos/dist/aos.css";
import "./Styles.css";
import LocationIcon from "../../../Assests/locationicon.png";
import { Link } from "react-router-dom";
import ApplyModal from "../../../Components/Applyjobmodal";
import Loader from '../../../Components/Loader';
import { Imagebaseurl, baseurl } from "../../../Config/utilites";

function AvailableJobs() {
  // Initialize state
  const [jobData, setJobData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [displayAll, setDisplayAll] = useState(false);
  const [showModal, setShowModal] = useState(false);



  useEffect(() => {
    const fetchJobs = async () => {
      setIsLoading(true);
      setError(null);

      // Read token and userType directly from local storage
      const token = localStorage.getItem("token");
      const userType = localStorage.getItem("userType");

      const baseURL =
        userType === "company"
          ? `${baseurl}/company/home/jobs`
          : `${baseurl}/talent/home/jobs`;
          

      try {
        const response = await axios.get(baseURL, {
          withCredentials: false,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response.data.data[0]); // Debugging line to see what the actual response is
        setJobData(response.data.data); // Ensure response.data.jobs is the correct path
      } catch (error) {
        setError(error);
        setIsLoading(false);
        if (error.response && error.response.status === 401) {
          console.error("Session expired. Redirecting to login.");
        } else {
          console.error(
            "Error fetching jobs:",
            error.response || error.message
            
          );
        }
      }
    };

    AOS.init({ duration: 1000 });
    fetchJobs();
  }, []);


  const handleApplyClick = () => {
    setShowModal(true);
};



const handleCloseModal = () => {
  setShowModal(false);
};


  const JobCard = ({ job }) => {
    return (
      <div className="col" data-aos="fade-up">
        <div className="card crdbdy">
          <div className="card-body cdbody">
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <img
                src={`${Imagebaseurl}${job.user.picture}`}
                alt="profle"
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
        
                }}
              />
              <p
                className="card-title text-start"
                style={{
                  marginRight: "200px",
                  fontSize: 10,
                  fontWeight: "bold",
                }}
              >
                {job.title}
              </p>
           
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                marginTop: "-20px",
                marginLeft: "12%",
              }}
            >
              <img
                src={LocationIcon}
                alt="location icon"
                style={{
                  width: "10px",
                  height: "10px",
                  marginTop: "5px",
                  alignItems: "center",
                }}
              />
              <span
                style={{
                  fontSize: 12,
                  marginTop: "-1px",
                  marginLeft: "0.6rem",
                }}
              >
                {job.location}
              </span>
            </div>
            <hr />
            <p className="text-start" style={{ marginTop: "10px" }}>
              {job.description}
            </p>
            <p
              className="text-start"
              style={{ fontSize: 12, fontWeight: "700" }}
            >
              {job.type} <span>Onsite</span>
            </p>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: "-20px",
              }}
            >
              <p>{job.status}</p>
            
              <button className="btn btn-success apply" onClick={handleApplyClick} >Apply now</button>
       
            </div>
          </div>
        </div>
      </div>
    );
  };
  const displayedJobs = displayAll ? jobData : jobData.slice(0, 6);

  return (
    <div className="cardnh" style={{ width: "100%" }}>
      <h1
        className="card-title p-3 my-5 mx-3"
        style={{ fontSize: 48, fontWeight: "700", color: "#005049" }}
      >
        Choose Our Available Jobs
      </h1>
      <div className="container d-flex" style={{ marginTop: 50 }}>
        <center>
          <div className="row row-cols-1 row-cols-md-3 g-4">
            {displayedJobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        </center>
      </div>
      <div style={{ textAlign: "center", marginTop: "10px" }}>
        {jobData.length > 6 && (
          <span style={{cursor:"pointer"}} onClick={() => setDisplayAll(!displayAll)}>
            {displayAll ? "Show Less" : "Show All Jobs"}
          </span>
        )}
      </div>
      <ApplyModal
                    showModal={showModal}
                    handleCloseModal={handleCloseModal}
                />
    </div>
  );
}

export default AvailableJobs;
