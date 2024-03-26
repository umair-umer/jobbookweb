import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import './Postjobmodal.css'
import { Link } from 'react-router-dom';

function JobPostModal() {
  const [show, setShow] = useState(false);
  const userRole = localStorage.getItem("userRole"); // Assuming the user role is stored in localStorage
  const token =localStorage.getItem("token")

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
     {token ? 
    <div className='container modal-add-but'>
          <Button className='post-modal-button' variant="primary text-end" onClick={handleShow}>
          +
       </Button>
    </div>:null
     }

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          {/* <Modal.Title>Job Post</Modal.Title> */}
        </Modal.Header>
        <Modal.Body>
        </Modal.Body>
        <Modal.Footer>
          {userRole !== "company" && (
            <>
              <Link to={'/Addnewforums'}>
                <Button variant="secondary">
                  Add To Forums
                </Button>
              </Link>
              <Link to={'/Addnewfeeds'}>
                <Button variant="primary" >
                  Add To News Feeds
                </Button>
              </Link>

              <Link to={'/videocall'}>
                <Button variant="primary" >
                 call video
                </Button>
              </Link>
            </>
          )}
          {userRole === "company" && (
            
            <>
            <Link to={'/postjobform'}>
              <Button variant="primary">
                Add a New Job
              </Button>
            </Link>
          </>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default JobPostModal;
