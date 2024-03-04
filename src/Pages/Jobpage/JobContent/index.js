import React, { useState,useEffect } from 'react';
import './Styles.css';
import Companylogo from '../../../Assests/C.png';
import Bell from '../../../Assests/bellicon.png'
import ApplyModal from '../../../Components/Applyjobmodal';
import { Button } from 'react-bootstrap';
import axios from "axios";
import Loader from '../../../Components/Loader';
import { Imagebaseurl, baseurl } from '../../../Config/utilites';


function Jobcontent() {
    const [selectedJob, setSelectedJob] = useState(null);
    const [showModal, setShowModal] = useState(false);
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
    
    if (isLoading) {
        return <Loader />;
    }
    
    if (error) {
        return <Loader/>;
    }
    
    // Corrected no data check
    if (jobsData.length === 0) {
        return <div>No jobs found.</div>; // Corrected message
    }


    const handleJobClick = (job) => {
        
        setSelectedJob(job);
    };
    const handleApplyClick = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };


    return (
        <div className='container my-5'>
            <div className='row'>
                <div className='col-sm-6 mb-3 mb-sm-0'>
                    <div className='card jobcard'>
                        <div className='card-body'>
                            <div className='d-flex'>
                                <div className=' d-flex align-items-center justify-content-between card-footer text-body-secondary w-100' 
                                style={{border:"none"}} >
                                    {selectedJob ? selectedJob.postedDate : 'Software engineer in Austin, Texas' }
                               
                                   <div className='d-flex align-items-center justify-content-between'>
                                   <p className='my-3'></p>
                                   
                                  
                                   </div>
                                </div>
                            </div>
                            {jobsData.map((job) => (
                                <div key={job.id} className='card mb-3 cdhover'  style={{border:"none"}} onClick={() => handleJobClick(job)}>
                                    <div className='card-body'>
                                        <div className='d-flex mx-3 m-3'>
                                        
                                            <div>
                                                <h5 className='card-title text-start mx-3'>{job.title}</h5>
                                                <p className='card-title text-start mx-3' style={{ marginTop: '-6px' }}>
                                                    {job.location}
                                                </p>
                                                <p className='card-title text-start mx-3' style={{ marginTop: '-10px' }}>
                                                    {job.description}
                                                </p>
                                                <p className='card-title text-start mx-3' style={{ marginTop: '-10px' }}>
                                                    {job.postedDate}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className='col-sm-6'>
                    {selectedJob && (
                        <div className='card' style={{ border: "none" }}>
                            <div className='card-body'>
                                <div className='d-flex mx-3 m-3'>
                                    <div className='companyprofile'>
                                        <img src={Companylogo} style={{ width: '40%', marginTop: '10px' }} alt='Company Logo' />
                                    </div>
                                    <div>
                                        <h5 className='card-title text-start mx-3'>{selectedJob.title}</h5>
                                        <p className='card-title text-start mx-3' style={{ marginTop: '-6px' }}>
                                            {selectedJob.location}
                                        </p>
                                        <p className='card-title text-start mx-3' style={{ marginTop: '-10px' }}>
                                            {selectedJob.description}
                                        </p>
                                        <p className='card-title text-start mx-3' style={{ marginTop: '-10px' }}>
                                            {selectedJob.postedDate}
                                        </p>

                                    </div>
                                </div>
                                {/* <a href='#' className='btn btn-success recent me-3'>
                                    Save
                                </a> */}
                                {selectedJob && (
                            <Button variant='success' className='recent mx-2' onClick={handleApplyClick}>
                                Apply
                            </Button>
                        )}
                                <div className='d-flex my-3 '>
                                    <div className='view'>
                                        <h6 className='card-title text-start mx-3'>Job</h6>
                                        <li className='card-title text-start mx-2'>applicant</li>
                                        <li className='card-title text-start mx-2'>Mid Senior level</li>
                                    </div>


                                    <div className='view mx-2'>
                                        <h6 className='card-title text-start mx-3'>Company</h6>
                                        <li className='card-title text-start mx-2'>1005-5000 employees</li>
                                        <li className='card-title text-start mx-2'>Outsourcing/Offshoring</li>
                                    </div>
                                    <div className='view '>
                                        <h6 className='card-title text-start mx-3'>Connection</h6>
                                        <li className='card-title text-start mx-2'>You have 0 connection at
                                            this company</li>
                                        <li className='card-title text-start mx-2'>Add</li>
                                    </div>

                                </div>
                                <div>
                                    <h3 className='card-title text-start mx-2'>Job description</h3>
                                    <div className="row" >
                                        <div className="col-sm-6 mb-3 mb-sm-0" >
                                            <div className="card" style={{ border: "none" }}>
                                                <div className="card-body">
                                                    <h5 className='card-title text-start mx-2'>Summary</h5>
                                                    <p className='card-title text-start mx-2'>
                                                        We are seeking a passionate and dedicated Demo Specialist to help us spread the word about our amazing products.
                                                    </p>

                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-sm-6 mb-3 mb-sm-0" >
                                            <div className="card" style={{ border: "none" }}>
                                                <div className="card-body">
                                                    <h5 className='card-title text-start mx-2'>Seniority Level</h5>
                                                    <p className='card-title text-start mx-2'>
                                                        Mid Senior level
                                                    </p>

                                                </div>
                                            </div>

                                        </div>

                                        <div className="col-sm-6 mb-3 mb-sm-0" >
                                            <div className="card" style={{ border: "none" }}>

                                                <div className="card-body">
                                                    <h5 className='card-title text-start mx-1'>Duties and Responsibilities</h5>
                                                    <p className='card-title text-start mx-2'>
                                                        <li>Set up and break down display and presentation tables</li>
                                                        <li> Provide information and marketing materials to customers</li>
                                                        <li>Present products in a clean and organized manner</li>
                                                        <li>Answer customer questions about the benefits of our products</li>
                                                    </p>

                                                </div>

                                            </div>

                                        </div>
                                        <div className="col-sm-6">
                                            <div className="card" style={{ border: "none" }}>
                                                <div className="card-body">
                                                    <h5 className='card-title text-start mx-1'>Industry</h5>
                                                    <p className='card-title text-start mx-2'>
                                                        Outsourcing/Offshoring

                                                    </p>

                                                </div>
                                            </div>

                                            <div className="card" style={{ border: "none" }}>
                                                <div className="card-body">
                                                    <h5 className='card-title text-start mx-1'>Employment</h5>
                                                    <p className='card-title text-start mx-2'>
                                                        Full-time

                                                    </p>

                                                </div>
                                            </div>
                                            <div className="card" style={{ border: "none" }}>
                                                <div className="card-body">
                                                    <h5 className='card-title text-start mx-1'>Job Functions</h5>
                                                    <p className='card-title text-start mx-2'>
                                                        Engineering

                                                    </p>

                                                </div>
                                            </div>
                                        </div>

                                    </div>

                                </div>
                                <ApplyModal
                    showModal={showModal}
                    handleCloseModal={handleCloseModal}
                    jobTitle={selectedJob ? selectedJob.title : ''}
                />

                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Jobcontent;
