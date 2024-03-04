import React from 'react';
import './CustomModalStyles.css'
import RESUME1 from '../../Assests/resume1.png'
import RESUME2 from '../../Assests/resume2.png'
import RESUME3 from '../../Assests/resume3.png'





const Modal = ({ isOpen, closeModal, selectTemplate }) => {

    if (!isOpen) return null;

    return (
        <div className="modal-backdrop" onClick={closeModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <h3>Select Resume Template</h3>
                <div className="template-options">   
                    <img src={RESUME1} className='img cus_modal_img' onClick={() => selectTemplate('template1')}/>
                    <img src={RESUME2} className='img cus_modal_img' onClick={() => selectTemplate('template1')}/>
                    <img src={RESUME3} className='img cus_modal_img' onClick={() => selectTemplate('template1')}/>

                 
                    
                </div>

                <div className="template-options">   
                <img src={RESUME1} className='img cus_modal_img' onClick={() => selectTemplate('template1')}/>
                    <img src={RESUME2} className='img cus_modal_img' onClick={() => selectTemplate('template1')}/>
                    <img src={RESUME3} className='img cus_modal_img' onClick={() => selectTemplate('template1')}/>
                    
                </div>
                <button className='btn btn-success' onClick={closeModal}>Close</button>
            </div>
        </div>
    );
};

export default Modal;