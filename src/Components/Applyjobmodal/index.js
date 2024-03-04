import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import IMG from '../../Assests/profilementor.png';
import Download from '../../Assests/Download.png';
import './Styles.css';
import axios from 'axios';
import { baseurl } from '../../Config/utilites';


const ApplyModal = ({ showModal, handleCloseModal, jobTitle, imageUrl }) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [streetAddress, setStreetAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zipCode, setZipCode] = useState('');
    const [resumeFile, setResumeFile] = useState(null);
    const [currentStep, setCurrentStep] = useState(1);

    const handleNext = () => {
        setCurrentStep(currentStep + 1);
    };

    const handleBack = () => {
        setCurrentStep(currentStep - 1);
    };

    const handleResumeUpload = (e) => {
        const file = e.target.files[0];
        setResumeFile(file);
    };

    const handleSubmit = async () => {
        const formData = new FormData();
        formData.append('firstName', firstName);
        formData.append('lastName', lastName);
        formData.append('phoneNumber', phoneNumber);
        formData.append('email', email);
        formData.append('streetAddress', streetAddress);
        formData.append('city', city);
        formData.append('state', state);
        formData.append('zipCode', zipCode);
        if (resumeFile) {
            formData.append('resume', resumeFile, resumeFile.name);
        }

        const token = localStorage.getItem("token"); // Ensure you have the token available in localStorage
        try {
            const response = await axios.post(`${baseurl}/talent/home/apply/659850ae4fb74958cf76791c`, formData, {
                headers: { 
                    Authorization: `Bearer ${token}`,
        
                },
            });
            setTimeout(() => {
                handleCloseModal(); // Optionally close the modal after a delay
            }, 3000);
            console.log(response.data);
            alert("Applied Successfully :) ")
            handleCloseModal(); // Close the modal on successful submission
            
        } catch (error) {
            // Assuming the API sends a specific response for duplicate applications
            if (error.response && error.response.data && error.response.data.message.includes('already applied')) {
             
            } else {
            
            }
        }
    };

    const updateField = (setter) => (e) => setter(e.target.value);

    return (
        <div className='container'>
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Apply for {jobTitle || 'Job'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    {/* Step 1: Personal Information */}
                    {currentStep === 1 && (
                        <>
                            <div className='d-flex companyprofile'>
                                <img src={IMG} style={{ width: '40%' }} alt='Profile' />
                                <h6 className='text-center ' style={{ fontSize: 13 }}>Alex Hudson<br /><span style={{ fontSize: 9 }}>{jobTitle}</span></h6>
                            </div>
                            <hr />
                            <input
                                type="text"
                                className='form-control mb-3'
                                placeholder='First Name'
                                value={firstName}
                                onChange={updateField(setFirstName)}
                            />
                            <input
                                type="text"
                                className='form-control mb-3'
                                placeholder='Last Name'
                                value={lastName}
                                onChange={updateField(setLastName)}
                            />
                            <input
                                type="number"
                                className='form-control mb-3'
                                placeholder='Phone Number'
                                value={phoneNumber}
                                onChange={updateField(setPhoneNumber)}
                            />
                            <input
                                type="email"
                                className='form-control mb-3'
                                placeholder='Email Address'
                                value={email}
                                onChange={updateField(setEmail)}
                            />
                        </>
                    )}
                    {/* Step 2: Address Information */}
                    {currentStep === 2 && (
                        <>
                            <input
                                type="text"
                                className='form-control mb-3'
                                placeholder='Street address line 1'
                                value={streetAddress}
                                onChange={updateField(setStreetAddress)}
                            />
                            <input
                                type="text"
                                className='form-control mb-3'
                                placeholder='City'
                                value={city}
                                onChange={updateField(setCity)}
                            />
                            <input
                                type="text"
                                className='form-control mb-3'
                                placeholder='State'
                                value={state}
                                onChange={updateField(setState)}
                            />
                            <input
                                type="text"
                                className='form-control mb-3'
                                placeholder='Zip / Postal code'
                                value={zipCode}
                                onChange={updateField(setZipCode)}
                            />
                        </>
                    )}
                    {/* Step 3: Resume Upload */}
                    {currentStep === 3 && (
                        <>
                            <input
                                type="file"
                                className='form-control mb-3'
                                onChange={handleResumeUpload}
                            />
                        </>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    {currentStep > 1 && <Button variant='secondary' onClick={handleBack}>Back</Button>}
                    {currentStep < 3 && <Button variant='primary' onClick={handleNext}>Next</Button>}
                    {currentStep === 3 && <Button variant='success' onClick={handleSubmit}>Submit Application</Button>}
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default ApplyModal;
