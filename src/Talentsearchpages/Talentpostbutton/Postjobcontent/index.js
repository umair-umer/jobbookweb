import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../../../Components/Loader";
import { Imagebaseurl, baseurl } from "../../../Config/utilites";
import ModalComponent from "../../../Components/Createpostmodal";
import { useParams } from 'react-router-dom';

function PostJobContentHere() {
  const [jobsData, setJobsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [currentJobDetails, setCurrentJobDetails] = useState(null);


  const toggleModal = () => setIsOpen(!isOpen);

  const { jobId } = useParams();
  console.log("jobID===>>",jobId)
  useEffect(() => {
    const fetchJobs = async () => {
      setIsLoading(true);
      setError(null);
      const token = localStorage.getItem("token");
      const userType = localStorage.getItem("userRole");
      console.log("type",userType)
;
      const baseURL =
        userType === "company"
          ? `${baseurl}/company/home/jobs`
          : `${baseurl}/talent/home/jobs`;

      try {
        const response = await axios.get(baseURL, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        setJobsData(response.data.data); // Adjust according to your API response
        setIsLoading(false);
      } catch (error) {
        setError(error.toString());
        setIsLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const handleJobClick = (job) => {
    console.log("Job clicked", job);
     localStorage.setItem('currentJobId', job._id);
    // Implement your logic here
  };



  const handleViewDetailClick = async (event, jobId) => {
    const token = localStorage.getItem("token");
      const userType = localStorage.getItem("userRole");
    setIsLoading(true);
    const baseURL =
    userType === "company"
      ? `${baseurl}/company/home/stats/${jobId}`
      : `${baseurl}/talent/home/jobs`;
    try {
      const response = await axios.get(`${baseURL}`,{
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });
      setCurrentJobDetails(response.data);
      setIsOpen(true); // Show the modal after data is fetched
    } catch (error) {
      console.error("Failed to fetch job details:", error);
      setError(error.toString());
    } finally {
      setIsLoading(false);
    }
  };


  if (isLoading) {
    return <Loader />;
  }
  if (error) {
    return <Loader />;
  }

  // Function to group jobs into pairs
  const getJobPairs = (jobs) => {
    const pairs = [];
    for (let i = 0; i < jobs.length; i += 2) {
      pairs.push(jobs.slice(i, i + 2));
    }
    return pairs;
  };

  const jobPairs = getJobPairs(jobsData);

  return (
    <div className="container">
      {jobPairs.map((pair, pairIndex) => (
        <div className="row" key={pairIndex}>
          {pair.map((job, index) => (
            <div
              key={index}
              className="col-md-6"
              onClick={() => handleJobClick(job)}
            >
              <div className="card my-5" style={{ backgroundColor: "#30BDB0" }}>
                <div className="d-flex" style={{ flexDirection: "row" }}>
                  <img
                    src={`${Imagebaseurl}${job.user.picture}`}
                    className="card-img-top mx-2 my-2"
                    alt="..."
                    style={{ width: "12%", height: "80px", borderRadius: "5px" }}
                  />

                  <div>
                    <h5 className="card-title text-start my-3 text-white">
                      {job.name}
                      <span style={{ fontSize: 18, fontWeight: "bold" }}>{job.title}</span>
                      <p>
                        <span style={{ fontSize: 14 }}>{job.description}</span>
                      </p>
                    </h5>
                  </div>
                  <div style={{ marginLeft: "auto", marginRight: "10px" }}>
                    <div
                      className="mx-auto my-3  "
                      style={{
                        width: "120px",
                        height: "50px",
                        backgroundColor: "rgb(0, 80, 73)",
                        borderRadius: "10px",
                        padding: "12px 0",
                        color: "#fff",
                      }}
                      onClick={(e) => handleViewDetailClick(e, job._id)}
                    >
                      <p>View detail</p>
                    </div>
                    {isOpen && (
                      <ModalComponent
                        isOpen={isOpen}
                        toggleModal={() => setIsOpen(false)}
                        jobDetails={currentJobDetails}

                      />
                    )}
                  </div>
                </div>
                <div className="card-body d-flex justify-content-between">
                  <p className="card-text text-start text-white">
                    {job.location}
                  </p>
                </div>
                <div
                  style={{
                    padding: 5,
                    backgroundColor: "#fff",
                    borderEndStartRadius: 5,
                    borderEndEndRadius: 5,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      padding: "0px 20px"
                    }}
                  >
                    <p className="text-start my-2 ">{job.type}</p>
                    <p className="text-end my-2 text-end ms-3">{job.salaryMode}
                      <span> {job.travel}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      ))}
    </div>
  );
}

export default PostJobContentHere;
