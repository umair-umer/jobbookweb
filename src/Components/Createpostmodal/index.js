import React from 'react';

function PostModal({ setShowModal }) {
    const handleClose = () => {
        setShowModal(false);
    };

    return (
        <>
            <div className='container'>
                {/* The Modal */}
                <div className="modal fade show" style={{ display: 'block' }} id="myModal">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            {/* Modal Header */}
                            <div className="modal-header">
                                <h4 className="modal-title">Modal Heading</h4>
                                <button type="button" className="btn-close" onClick={handleClose} />
                            </div>
                            {/* Modal body */}
                            <div className="modal-body">Modal body..</div>
                            {/* Modal footer */}
                            <div className="modal-footer">
                                <button type="button" className="btn btn-danger" onClick={handleClose}>
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="modal-backdrop fade show"></div>
            </div>
        </>
    );
}

export default PostModal;
