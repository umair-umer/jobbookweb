import React, { useState } from 'react';
import axios from 'axios';
import Footer from '../Footer';
import Nav from '../../Config/Navigation';
import { baseurl } from '../../Config/utilites';
import './addnewfeedstyle.css';
import { toast } from 'react-toastify';
import { useNavigation } from 'react-router-dom';


function AddNewsFeedsComponent() {
    
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        if (!title.trim() || !description.trim()) {
            toast.error('Title and description are required.');
            return;
        }
    
        const token = localStorage.getItem("token");
    
        try {
            const response = await axios.post(
                `${baseurl}/talent/forum/create`,
                { title: title.trim(), description: description.trim() }, // Use JSON body instead of FormData
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json', // Ensure correct Content-Type for JSON
                    }
                }
            );
            toast.success('Post created successfully.');
            setTitle('');
            setDescription('');
        } catch (error) {
         toast.error('Failed to create post. Please try again later.');
        }
    };
    
    
    

    return (
        <>
            <Nav />
            <form onSubmit={handleSubmit} className="job-post-form">
                <div className=''>
                    <h4>Create post</h4>
                </div>
                {error && <p className="error-message">{error}</p>}
                {success && <p className="success-message">{success}</p>}
                <div className="form-column">
                    <input
                        type="text"
                        id="title"
                        placeholder="Add a title..."
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className='newfeedinput'
                    />
                </div>

                <div className="form-column">
                    <textarea
                        id="description"
                        placeholder="Add a description..."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className='newfeedinput'
                    ></textarea>
                </div>
                <div className="form-column">
                    <button type="submit" className="submit-btn">Post</button>
                </div>
            </form>
            <Footer />
        </>
    );
}

export default AddNewsFeedsComponent;
