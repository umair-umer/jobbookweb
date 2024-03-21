import React, { useState, useEffect } from 'react';
import Loader from '../../../Components/Loader';
import { Imagebaseurl, baseurl } from '../../../Config/utilites';
import './savejobcontent.css'

function Savejobscontent() {
  const [savedJobs, setSavedJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSavedJobs = async () => {
      const token = localStorage.getItem("token");
      const url = `${baseurl}/talent/home/jobs?filter=saved`;
      const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      };

      try {
        const response = await fetch(url, { method: 'GET', headers });

        if (!response.ok) {
          throw new Error('Failed to fetch saved jobs');
        }

        const data = await response.json();

        // Here you adapt to the unexpected structure
        // For illustration, let's assume the correct data sometimes comes nested under a 'data' field
        const jobsData = Array.isArray(data.jobs) ? data.jobs : Array.isArray(data.data) ? data.data : [];
        setSavedJobs(jobsData);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSavedJobs();
  }, []);

  if (isLoading) return <Loader />;
  if (error) return <div>Error: {<Loader />}</div>;

  return (
    <div className="container mt-4">
      <div className="row">
        {savedJobs.map((job, index) => (
          <div key={index} className="col-md-12 mb-4">
            <div className="card special">
              <div className="card-body centering-items">
                <div className='d-flex justify-content-between'>
                  <div className='d-flex align-items-center'>
                    <div>
                      <div className='image-box'>
                        <img
                          src={`${Imagebaseurl}${job.user.picture}`}
                          className="card-img-top"
                          alt="..."
                          style={{ borderRadius: "5px" }}
                        />
                      </div>
                    </div>
                    <div className='upper-para'>
                      <h5 className="card-title">{job.category || 'Job Title'}</h5>
                      <h5 className="card-title">{job.location || 'Job Title'}</h5>
                      <p className="card-text">{job.description || 'Job description not available.'}</p>
                      <div className='different-bottom d-flex justify-content-center align-items-center'>
                        <p>On Upwork you'll find a range of top freelancers and agencies, from developers and development agencies to designers and creative agencies, copywriters,</p>
                      </div>
                    </div>
                  </div>
                  {/* <div className='aloo'>
                    <a href={job.link || '#'} className="btn btn-success supply">View Job</a>
                  </div> */}
                </div>
                <p className="text-end my-2 text-black text-end ms-3">{job.salaryMode} {job.travel}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Savejobscontent;
