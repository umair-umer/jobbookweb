import React,{useState} from 'react';
import './createpostmodal.css'
import axios from 'axios';


const ModalComponent = ({ isOpen, toggleModal, jobDetails }) => {

  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState(null);
  const [apiData, setApiData] = useState(null);

  const handleFetchData = async () => {
    setLoading(true);
    setApiError(null);
    try {
      const response = await axios.get('https://app.jobbooks.app/api/v1/jobbook/company/home/applications/659850af4fb74958cf767926');
      setApiData(response.data);
    } catch (error) {
      setApiError(error.toString());
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  // Directly destructure the necessary counts from jobDetails.data for cleaner access
  const { totalCount, pendingCount, shortlistCount, rejectedCount } = jobDetails?.data || {
    totalCount: 0,
    pendingCount: 0,
    shortlistCount: 0,
    rejectedCount: 0,
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
            <div className='styling-box-button-count'>
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
