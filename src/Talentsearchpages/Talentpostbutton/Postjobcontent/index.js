import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../../../Components/Loader";
import IMG from "../../../Assests/softwarecompanylogo.png";
import { Imagebaseurl, baseurl } from "../../../Config/utilites";

function PostJobContentHere() {
  const [jobsData, setJobsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      setIsLoading(true);
      setError(null);
      const token = localStorage.getItem("token");
      const userType = localStorage.getItem("userType");

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
    // Implement your logic here
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
                    style={{ width: "12%", height: "80px", borderRadius:"5px" }}
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
