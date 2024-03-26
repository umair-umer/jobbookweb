import React,{useState} from 'react';
import './createpostmodal.css'
import axios from 'axios';
import { baseurl } from '../../Config/utilites';
import { useParams } from 'react-router-dom';

const ModalComponent = ({ isOpen, toggleModal, jobDetails }) => {
   const jobId = localStorage.getItem("currentJobId")
  console.log("jobID===>>",jobId)
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState(null);
  const [apiData, setApiData] = useState(null);

  const handleFetchData = async () => {
    setLoading(true);
    setApiError(null);
    const token = localStorage.getItem("token"); // Retrieve the token from local storage
    try {
      const response = await axios.get(`${baseurl}/company/home/applications/${jobId}`, {
        headers: {
          'Authorization': `Bearer ${token}` // Use the token in the Authorization header
        }
      });
      
      setApiData(response.data);
      console.log("data==>>>", response.data);
    } catch (error) {
      setApiError(error.toString());
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  // Directly destructure the necessary counts from jobDetails.data for cleaner access
  const { totalCount, pendingCount, shortlistCount, rejectedCount } = jobDetails?.data || {
    totalCount: totalCount,
    pendingCount: pendingCount,
    shortlistCount: shortlistCount,
    rejectedCount: rejectedCount,
  };

  return (
    <div className="modal show d-block" style={{ backgroundColor: 'rgba(0, 0, 0, 0.3)' }}>
      <div className="modal-dialog">
        <div className="modal-content full-box">
          <div className="modal-header">
            <div className='centering-heading'>
              <h5 className="modal-title text-center">Applications: {totalCount} </h5>
            </div>
            <button type="button" className="close close-modal-box-button" onClick={toggleModal}>
              <span>&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <div className='styling-box-button-count' onClick={handleFetchData}>
              <p>Pending Applications </p>
              <p>{pendingCount}</p>
            </div>
            <div className='styling-box-button-count'>
              <p>Shortlisted Applications </p>
              <p>{shortlistCount}</p>
            </div>
            <div className='styling-box-button-count'>
              <p>Rejected Applications </p>
              <p>{rejectedCount}</p>
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary modal-box-close-button" onClick={toggleModal}>Close</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalComponent;
