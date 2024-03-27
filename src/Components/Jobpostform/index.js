import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Modal } from 'react-bootstrap';
import './JobPostForm.css'; 
import TalentNav from '../../Config/Telantnavbar';
import Footer from '../Footer';
import axios from 'axios';
import { baseurl } from '../../Config/utilites';



const JobPostForm = () => {
  const [jobTitle, setJobTitle] = useState('');
  const [employmentType, setEmploymentType] = useState('');
  const [location, setLocation] = useState('');
  const [salary, setSalary] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [seniority, setSeniority] = useState('');
  const [description, setDescription] = useState('');
  const [photo, setPhoto] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handlePhotoChange = (e) => {
    setPhoto(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log({
      employmentType,
      location,
      salary,
      specialty,
      seniority,
      description,
   
    });

    setShowModal(true); 
  };


  
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    switch (id) {
      case 'jobTitle':
        setJobTitle(value);
        break;
      case 'employmentType':
        setEmploymentType(value);
        break;
      case 'location':
        setLocation(value);
        break;
      case 'salary':
        setSalary(value);
        break;
      case 'specialty':
        setSpecialty(value);
        break;
      case 'seniority':
        setSeniority(value);
        break;
      case 'description':
        setDescription(value);
        break;
      default:
        break;
    }
  };


  const resetForm = () => {
    // Reset state to clear form
    setEmploymentType('');
    setLocation('');
    setSalary('');
    setSpecialty('');
    setSeniority('');
    setDescription('');
    setPhoto(null);
  };

  const postJob = async () => {
    const formData = new FormData();
  
    // Append form data from state variables
    formData.append('employmentType', employmentType); 
    formData.append('location', location);
    formData.append('salMin', salary && salary.split('-')[0].trim());
    formData.append('salMax', salary && salary.split('-')[1].trim());
    formData.append('speciality', specialty);
    formData.append('category', seniority);
    formData.append('description', description);
    formData.append('experience', '3');
    formData.append('title', 't,6876.8y7.');
  
    try {
      const token = localStorage.getItem("token");
      console.log("Token:", token); // Check if token is retrieved correctly
      const response = await axios({
        method: 'post',
        url: `${baseurl}/company/job/create`,
        data: formData,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log("API Response:", response.data); // Log API response
      resetForm();
    } catch (error) {
      console.error("API Error:", error); // Log any errors
    }
    
  };
  ;
  

  return (
    <>
    <TalentNav/>
    <Container className="job-post-form-container my-5">
      <Form onSubmit={handleSubmit} className="job-post-form p-5">
        <h2 className="form-heading mb-4">Post a New Job</h2>
        <Row>
          {/* Job Title & Employment Type */}
          <Col md={6}>
            <Form.Group controlId="jobTitle" className="mb-3 aligning-lables">
              <Form.Label>Job Title</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="E.g., Senior Developer"
                value={jobTitle}
                onChange={handleInputChange} 
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="employmentType" className="mb-3 aligning-lables">
              <Form.Label>Employment Type</Form.Label>
              <Form.Control 
                as="select"
                value={employmentType}
                onChange={handleInputChange}
              >
                <option>Full-time</option>
                <option>Part-time</option>
                <option>Contract</option>
              </Form.Control>
            </Form.Group>
          </Col>

          {/* Location & Salary */}
          <Col md={6}>
            <Form.Group controlId="location" className="mb-3 aligning-lables">
              <Form.Label>Location</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="City or Remote"
                value={location}
                onChange={handleInputChange} 
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="salary" className="mb-3 aligning-lables">
              <Form.Label>Salary</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="E.g., $50000 - $70000"
                value={salary}
                onChange={handleInputChange} 
              />
            </Form.Group>
          </Col>

          {/* Seniority & Specialty */}
          <Col md={6}>
            <Form.Group controlId="seniority" className="mb-3 aligning-lables">
              <Form.Label>Seniority Level</Form.Label>
              <Form.Control 
                as="select"
                value={seniority}
                onChange={handleInputChange} 
              >
                <option>Junior</option>
                <option>Mid-Level</option>
                <option>Senior</option>
              </Form.Control>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="specialty" className="mb-3 aligning-lables">
              <Form.Label>Specialty</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="E.g., Frontend, Backend, Full Stack"
                value={specialty}
                onChange={handleInputChange} 
              />
            </Form.Group>
          </Col>
        </Row>

        <Form.Group controlId="description" className="mb-3 aligning-lables">
          <Form.Label>Job Description</Form.Label>
          <Form.Control 
            as="textarea" 
            rows={4} 
            placeholder="Detailed job description"
            value={description}
            onChange={handleInputChange} 
          />
        </Form.Group>

        <div className="text-center">
          <Button 
            className='my-post-button-jobpost' 
            variant="primary" 
            onClick={handleSubmit} 
            type="submit"
          >
            Post Job
          </Button>
        </div>
      </Form>
    </Container>

      {/* Success Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Success</Modal.Title>
        </Modal.Header>
        <Modal.Body>Job posted successfully!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Footer/>
    </>
  );
};

export default JobPostForm;
