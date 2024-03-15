import React, { useState, useRef } from 'react';
import html2pdf from 'html2pdf.js';
import './Styles.css'
import Modal from '../../../Components/Createresumemodal';

function Resumecontent() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        dateOfBirth: '',
        idCardNumber: '',
        citizenship: '',
        phone: '',
        address1: '',
        city: '',
        country: '',
        secondContact: '',
        address2: '',
        state: '',
        qualification: '',
    });
    const [selectedTemplate, setSelectedTemplate] = useState('temp1');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const resumeRef = useRef(null);


    // Add modal opening and closing functions
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const handleTemplateSelection = (template) => {
        setSelectedTemplate(template);
        closeModal(); // Close modal upon template selection
    };

    const handleCreateTemplateClick = (e) => {
        e.preventDefault(); // Prevent form submission
        openModal(); // Open the modal
    };
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

   
    const handleCreateResume = async () => {
        if (!selectedTemplate) {
            alert('Please select a template before creating the resume.');
            return;
        }
    
        console.log('Form Data:', formData);
        const token = localStorage.getItem("token");

        const apiEndpoint = 'https://app.jobbooks.app/api/v1/jobbook/talent/home/generate';
        const dataToSend = {
            // Adjust according to your API expectations
            temp: selectedTemplate,
            ...formData,
            // Convert any necessary parts of formData to the expected format
        };
    
        try {
            const response = await fetch(apiEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', 
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(dataToSend),
            });
    
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
    
            const data = await response.json();
            console.log('Success:', data);
            closeModal(); // Assuming you want to close the modal upon successful API call
        } catch (error) {
            console.error('Error:', error);
        }
    };
    


    return (
        <div className='container-fluid'>
            <div className='card-body'>
                <h2 className='card-title text-center my-5'>Create Resume</h2>
            </div>

            <div className='container' style={{ height: '230px', backgroundColor: '#30BDB0' }}>
                <div className='row'>
                    <div className='col'>
                        {/* Name input */}
                        <div data-mdb-input-init='' className='form-outline'>
                            <div className='row'>
                                <span className="text-start mx-2 text-white my-2">First Name</span>
                                <div className="input-group my-2">
                                    <input type="text"
                                        aria-label="First name"
                                        placeholder='First Name'
                                        className="form-control "
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleInputChange} />

                                </div>

                            </div>
                        </div>
                    </div>
                    <div className='col'>
                        {/* Name input */}
                        <div data-mdb-input-init='' className='form-outline'>
                            <div className='row'>
                                <span className="text-start mx-2 text-white my-2">Last Name</span>
                                <div className="input-group my-2">
                                    <input type="text"
                                        aria-label="Last name"
                                        placeholder='Last Name'
                                        className="form-control"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleInputChange}
                                    />

                                </div>

                            </div>

                        </div>
                    </div>
                    <div className='col'>
                        {/* Email input */}
                        <div data-mdb-input-init='' className='form-outline'>
                            <div className='row'>
                                <span className="text-start mx-2 text-white my-2">Email</span>
                                <div className="input-group my-2">
                                    <input type="email"
                                        aria-label="email"
                                        placeholder='email@gmail.com'
                                        className="form-control"
                                        name='email'
                                        value={formData.email}
                                        onChange={handleInputChange}
                                    />

                                </div>

                            </div>
                        </div>
                    </div>
                </div>
                <div className='row'>
                    <div className='col my-2'>
                        {/* Name input */}
                        <div data-mdb-input-init='' className='form-outline'>
                            <div className='row'>
                                <span className="text-start mx-2 text-white my-2">Date of Birth</span>
                                <div className="input-group my-2">
                                    <input type="date"
                                        aria-label="First name"
                                        placeholder='Date of Birth'
                                        className="form-control"
                                        name="dateOfBirth"
                                        value={formData.dateOfBirth}
                                        onChange={handleInputChange}
                                    />

                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='container my-5' style={{ height: '110px', backgroundColor: '#30BDB0' }}>
                <div className='row'>
                    <span className='text-start mx-2 text-white my-2'>ID Card Number :</span>
                    <div className='col'>
                        <div className='input-group'>
                            <input type='text'
                                placeholder='9 Digit Number'
                                className='form-control'
                                name="idCardNumber"
                                value={formData.idCardNumber}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                </div>

            </div>

            <div className='container thirdform '>
                <div className="row my-3">
                    <div className="col-sm-6 mb-3 mb-sm-0">
                        <div className="card" style={{ backgroundColor: "#30BDB0", border: "none" }}>
                            <span className='card-title text-start text-white mx-4 my-0'>Citizenship</span>
                            <div className="card-body">
                                <input type='text'
                                    className='form-control'
                                    placeholder='Citizenship'
                                    name='citizenship'
                                    value={formData.citizenship}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                        <div className="card" style={{ backgroundColor: "#30BDB0", border: "none" }}>
                            <span className='card-title text-start text-white mx-4 my-0'>Phone</span>
                            <div className="card-body">
                                <input type='text'
                                    className='form-control'
                                    placeholder='Phone number'
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                        <div className="card" style={{ backgroundColor: "#30BDB0", border: "none" }}>
                            <span className='card-title text-start text-white mx-4 my-0'>Address No 1</span>
                            <div className="card-body">
                                <input type='text'
                                    className='form-control'
                                    placeholder='Address No 1'
                                    name="address1"
                                    value={formData.address1}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                        <div className="card" style={{ backgroundColor: "#30BDB0", border: "none" }}>
                            <span className='card-title text-start text-white mx-4 my-0'>City</span>
                            <div className="card-body">
                                <input type='text'
                                    className='form-control'
                                    placeholder='City'
                                    name="city"
                                    value={formData.city}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <div className="card" style={{ backgroundColor: "#30BDB0", border: "none" }}>
                            <span className='card-title  text-white text-start mx-4 my-0'>Country</span>
                            <div className="card-body">
                                <input type='text'
                                    className='form-control'
                                    placeholder='United state'
                                    name="country"
                                    value={formData.country}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                        <div className="card" style={{ backgroundColor: "#30BDB0", border: "none" }}>
                            <span className='card-title text-white text-start mx-4 my-0'>Second contact</span>
                            <div className="card-body">
                                <input type='text'
                                    className='form-control'
                                    placeholder='Second contact'
                                    name='secondContact'
                                    value={formData.secondContact}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>

                        <div className="card" style={{ backgroundColor: "#30BDB0", border: "none" }}>
                            <span className='card-title text-white text-start mx-4 my-0'>Address No 2</span>
                            <div className="card-body">
                                <input type='text'
                                    className='form-control'
                                    placeholder='Address No 2'
                                    name="address2"
                                    value={formData.address2}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                        <div className="card" style={{ backgroundColor: "#30BDB0", border: "none" }}>
                            <span className='card-title text-white text-start mx-4 my-0'>State</span>
                            <div className="card-body">
                                <input type='text'
                                    className='form-control'
                                    placeholder='State'
                                    name="state"
                                    value={formData.state}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card" style={{ backgroundColor: "#30BDB0", border: "none" }}>
                    <span className='card-title text-white text-start mx-4 my-0'>Qualification</span>
                    <div className="card-body">
                        <input type='text'
                            className='form-control'
                            placeholder='Qualification'
                            name='qualification'
                            value={formData.qualification}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>
                <div className="card" style={{ backgroundColor: "#30BDB0", border: "none" }}>
                    <span className='card-title text-white text-start mx-4 my-0'>Experiences</span>
                    <div className="card-body">
                        <input type='text'
                            className='form-control'
                            placeholder='Experiences'
                            name='Experiences'
                            value={formData.Experiences}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>


            </div>

            <div className='container my-5'>
                <div className="d-grid gap-4 col-4 mx-auto">
                    <button className="btn btn-outline-success" type="button" onClick={handleCreateTemplateClick}>
                        Create Resume
                    </button>
                    {/* <button className="btn btn-success" type="button">
                        Upload Resume
                    </button> */}
                </div>
            </div>
            <Modal isOpen={isModalOpen} closeModal={closeModal} selectTemplate={handleCreateResume} onConfirm={handleCreateResume} />
        </div>

    );
}

export default Resumecontent;
