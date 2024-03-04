import React, { useState } from 'react';
import PostModal from '../../Components/Createpostmodal'

function Talentmodalbutton() {
    const [showModal, setShowModal] = useState(false);

    const handleShowModal = () => {
        setShowModal(true);
    };

    return (
        <>
            <div className='container text-end my-2'>
                <button className='btn btn-outline-success' 
                style={{width:100,height:100,backgroundColor:"#2BADA1",color:"#fff",fontSize:30}} 
                onClick={handleShowModal}>
                    +
                </button>
                {showModal && <PostModal setShowModal={setShowModal} />}

            </div>
        </>
    );
}

export default Talentmodalbutton;
