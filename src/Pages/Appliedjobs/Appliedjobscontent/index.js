import React, { useState, useEffect } from 'react';
import Loader from '../../../Components/Loader';
import { Imagebaseurl, baseurl } from '../../../Config/utilites';
import './appliedjobscontentstyle.css'

function Applyjobscontent() {
  const [savedJobs, setSavedJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSavedJobs = async () => {
      const token = localStorage.getItem("token");
      const url = `${baseurl}/talent/home/jobs?filter=applied`;
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
        const jobsData = data.jobs || data.data || [];
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
  if (error) return <div>Error: {error}</div>; // Corrected to show actual error message

  return (
    <div className="container mt-4">
      <div className="row">
        {savedJobs.map((job, index) => (
          <div key={index} className="col-md-12 mb-4">
            <div className="card special">
              <div className="card-body ">
                <div className='d-flex justify-content-between'>
                  <div className='d-flex align-items-center'>
                    <div className='image-box'>
                      <img
                        src={`${Imagebaseurl}${job.user?.picture}`} // Optional chaining in case 'user' or 'picture' is undefined
                        className="card-img-top"
                        alt="..."
                        style={{ borderRadius: "5px" }}
                      />
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
                </div>
                <div className='different-bottom d-flex justify-content-between align-items-center'>
                  <p className='m-0'>{job.type} . {job.status}</p>
                  <p className="text-end my-2 text-black">{job.salaryMode} {job.travel}</p> {/* Removed unnecessary classes */}
                </div>
                
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Applyjobscontent;
