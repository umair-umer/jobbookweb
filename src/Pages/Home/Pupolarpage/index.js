import React, { useEffect, useState } from "react";
import AOS from 'aos';
import 'aos/dist/aos.css';
import './Styles.css';
import ICON from '../../../Assests/categeryicon.png'
import ICONn from '../../../Assests/locationIco.png'
import Search from '../../../Assests/seachIcon.png'
import axios from "axios";
import { baseurl } from "../../../Config/utilites";


const JobCard = ({ title, count }) => {
    return (
        <div className="col" data-aos="fade-up">
            <div className="card brdr">
                <div className="card-body" style={{ display: "flex", flexDirection: "row", justifyContent: "space-around" }}>
                    <h6>{title}</h6>
                    <div className='con'>
                        <p className="card-text">{count}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

function Popularjob() {
    const [jobs, setJobs] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        AOS.init();
        const fetchJobs = async () => {
            setIsLoading(true);
            const token = localStorage.getItem("token");
            try {
                const response = await axios.get(`${baseurl}/company/home/fourms`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setJobs(response.data.data); 
                console.log("datataytaayay".response.data.data)
                setIsLoading(false);
            } catch (error) {
                setError(error);
                setIsLoading(false);
            }
        };

        fetchJobs();
    }, []);

    // if (isLoading) return <div>Loading...</div>;
    // if (error) return <div>Error: {error.message}</div>;

    return (
        <div className='containerStyle'>
            {/* Your search form and other content */}
            
            <div style={{ marginTop: 50 }}>
                <h5>Popular Jobs</h5>
            </div>
            <center>
                <div className='container d-flex' style={{ marginTop: 50 }}>
                    <div className="row row-cols-1 row-cols-md-4 g-4">
                        {jobs?.map((job, index) => (
                            // Assuming `title` is the property that contains the job title in your fetched data
                            // Replace `90` with dynamic count if available or keep it static
                            <JobCard key={index} title={job.title} count={5} />
                        ))}
                    </div>
                </div>
            </center>
            {/* More categories and other content */}
        </div>
    );
}

export default Popularjob;


