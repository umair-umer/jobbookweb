import React from 'react';

const ModalComponent = ({ isOpen, toggleModal, jobDetails }) => {
  if (!isOpen) return null;

  return (
    <div className="modal show d-block">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Job Details</h5>
            <button type="button" className="close" onClick={toggleModal}>
              {/* <span>&times;</span> */}
            </button>
          </div>
          <div className="modal-body">
            {/* Display job details here */}
            <p>{jobDetails?.title}</p>
            {/* Continue displaying other job details */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalComponent;
