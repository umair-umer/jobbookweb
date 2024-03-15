import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './jobsheaderstyle.css'

const JobHeader = () => {
    const navigate = useNavigate(); // Hook to get navigate function

    // Handler for when the select value changes
    const handleSelectChange = (event) => {
        navigate(event.target.value); // Navigate based on the selected value
    };

    return (
        <div className='container my-3'>
            <div className='custom_icon'>
                <select className="form-select back-header-diff" aria-label="Default select example" onChange={handleSelectChange}>

                    <option value="#" className='text-bold'>Select Job filters</option> {/* Default option */}
                    <option value="/savejobs">Save Jobs</option>
                    <option value="/appliedjobs">Applied Jobs</option>
                    {/* <option value="/rejectedjobs">Rejected Jobs</option> */}
                </select>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#fff" class="bi bi-funnel-fill" viewBox="0 0 16 16">
                    <path d="M1.5 1.5A.5.5 0 0 1 2 1h12a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.128.334L10 8.692V13.5a.5.5 0 0 1-.342.474l-3 1A.5.5 0 0 1 6 14.5V8.692L1.628 3.834A.5.5 0 0 1 1.5 3.5z" />
                </svg>
            </div>
        </div>
    );
};

export default JobHeader; 
