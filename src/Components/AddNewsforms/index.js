import React, { useState } from 'react';
import './Addnewforms.css'
import axios from 'axios';
import { baseurl } from '../../Config/utilites';
import Nav from '../../Config/Navigation';
import Footer from '../Footer';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function Addnewsfeed() {

  const navigate = useNavigate();
  const userRole = localStorage.getItem("userRole");

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [tags, setTags] = useState('');
  const [photos, setPhotos] = useState(null);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const fileUrl = URL.createObjectURL(file);
      setPhotos({ file: file, url: fileUrl });
    }
  };

  const handleRemovePhoto = () => {
    setPhotos(null); // Reset the photo state to null
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('location', location);
    formData.append('tags', tags);
    if (photos) {
      // formData.append('picture', photos[0]);
      formData.append('picture', photos.file);

    }
    const token = localStorage.getItem("token");
    try {
      await axios.post(`${baseurl}/talent/news/create`, formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        },


      });
      toast.success("Post created successfully.");
      if(userRole === "company") {
        navigate('/companyhomepage');
      } else {
        navigate('/Newforums');
      }

      // Clear form fields and selected photos after successful post
      setTitle('');
      setDescription('');
      setLocation('');
      setTags('');
      setPhotos();
    } catch (error) {
      toast.error("Failed to create post. Please try again later.");
    }
  };
  return (
    <>
      <Nav />
      <div className="job-post-container">
        <form onSubmit={handleSubmit} className="job-post-form">
          <div className=''>
            <h4>Create post</h4>
          </div>
          <div className="form-column">
            <label htmlFor="title">Add Title</label>
            <input
              type="text"
              id="title"
              placeholder="Add a title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className='form-control'
            />
          </div>

          <div className="form-column">
            <label htmlFor="description">Add Description</label>
            <textarea
              id="description"
              placeholder="Add a description..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className='form-control'
            ></textarea>
          </div>

          <div className="form-column">
            <label htmlFor="location">Location</label>
            <input
              type="text"
              id="location"
              placeholder="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className='form-control'
            />
          </div>

          <div className="form-column">
            <label htmlFor="photos">Add Photos</label>
            <input
              type="file"
              id="photos"
              multiple
              onChange={handleImageChange}
            />
            <div className="photo-container">
              {photos && (
                <div className="photo-preview">
                  <img src={photos.url} alt="Preview" />
                  <button onClick={handleRemovePhoto} className="remove-photo">&times;</button>
                </div>
              )}

            </div>
          </div>

          <div className="form-column">
            <label htmlFor="tags">Add Tags</label>
            <input
              type="text"
              id="tags"
              placeholder="Add Tags"
              className='form-control'
              value={tags}
              onChange={(e) => setTags(e.target.value)}
            />
          </div>

          <div className='end-submit-but-main'>
            <div className="form-column">
              <button type="submit" className="submit-btn">Post</button>
            </div>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
}

export default Addnewsfeed;
