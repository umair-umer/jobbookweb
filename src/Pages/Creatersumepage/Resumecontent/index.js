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
    const [selectedTemplate, setSelectedTemplate] = useState('template1');
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

    // const handleCreateResume = (e) => {
    //     e.preventDefault(); // Prevent form submission

    //     if (!selectedTemplate) {
    //         alert('Please select a template before creating the resume.');
    //         return;
    //     }

    //     // Display the selected template dynamically
    //     if (selectedTemplate === 'template1') {
    //         console.log('Selected Template 1');
    //         // You can add logic to customize the template content here
    //     } else if (selectedTemplate === 'template2') {
    //         console.log('Selected Template 2');
    //         // You can add logic to customize the template content here
    //     }

    //     // Log the form data (remove this in production)
    //     console.log('Form Data:', formData);

    //     // Get the content of the resume container
    //     const resumeContent = resumeRef.current.innerHTML;

    //     // Create a configuration object for html2pdf
    //     const pdfOptions = {
    //         margin: 10,
    //         filename: 'resume.pdf',
    //         image: { type: 'jpeg', quality: 0.98 },
    //         html2canvas: { scale: 2 },
    //         jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
    //     };

    //     // Generate PDF from the HTML content
    //     html2pdf().from(resumeContent).set(pdfOptions).outputPdf((pdf) => {
    //         // Display the generated PDF for download
    //         const blob = new Blob([pdf], { type: 'application/pdf' });
    //         const link = document.createElement('a');
    //         link.href = window.URL.createObjectURL(blob);
    //         link.download = 'resume.pdf';
    //         link.click();
    //     });
    // };


    const handleCreateResume = async (e) => {
        // e.preventDefault(); // Prevent form submission
    
        if (!selectedTemplate) {
            alert('Please select a template before creating the resume.');
            return;
        }
    
        // Log the form data (remove this in production)
        console.log('Form Data:', formData);
    
        // Define API endpoint
        const apiEndpoint = 'http://dzyntech-101:3000/api/v1/jobbook/talent/home/generate';
    
        // Prepare the data to be sent
        const dataToSend = {
            ...formData,
            templateName: selectedTemplate, // Include the selected template name
        };
    
        try {
            // Send a POST request to the API
            const response = await fetch(apiEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataToSend),
            });
    
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
    
            const data = await response.json();
            console.log('Success:', data);
            // Handle success scenario, like showing a success message or processing the response data
    
        } catch (error) {
            console.error('Error:', error);
            // Handle error scenario
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
            <Modal isOpen={isModalOpen} closeModal={closeModal} selectTemplate={handleCreateResume} />
        </div>

    );
}

export default Resumecontent;
