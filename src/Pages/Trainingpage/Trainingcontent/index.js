import React, { useState, useRef } from 'react';
import Fillter from '../../../Assests/filter.png';
import './Styles.css';
import Icon from '../../../Assests/react.png';
import Icon1 from '../../../Assests/Design.png';
import Icon2 from '../../../Assests/web.png';
import Icon3 from '../../../Assests/business.png';
import Icon4 from '../../../Assests/Analys.png';
import Icon5 from '../../../Assests/Seo.png';
import Profile from '../../../Assests/profilementor.png';

const coursesData = [
  {
    id: 1,
    imgSrc: Icon,
    title: 'Design',
    content: '16 Courses',
  },
  {
    id: 2,
    imgSrc: Icon1,
    title: 'Business',
    content: '34 Courses',
  },
  {
    id: 3,
    imgSrc: Icon2,
    title: 'Business',
    content: '34 Courses',
  },
  {
    id: 4,
    imgSrc: Icon3,
    title: 'Business',
    content: '34 Courses',
  },
  {
    id: 5,
    imgSrc: Icon4,
    title: 'Business',
    content: '34 Courses',
  },
  {
    id: 6,
    imgSrc: Icon5,
    title: 'Business',
    content: '34 Courses',
  },
  // Add more objects as needed
];

const videosData = [
  {
    id: 1,
    videoSrc: 'https://www.youtube.com/embed/0BnuvEoyaZ0',
    title: 'UI/UX Design',
    description: 'User interface design essentials.',
    rating: 4.5,
  },
  {
    id: 2,
    videoSrc: 'https://www.youtube.com/embed/g7xkVEWrX8E',
    title: 'Web Design',
    description: 'Website design essentials.',
    rating: 4.5,
  },
  {
    id: 3,
    videoSrc: 'https://www.youtube.com/embed/stHBZGm_hMo',
    title: 'Supply Management',
    description: 'Supply Management.',
    rating: 4.5,
  },
  {
    id: 4,
    videoSrc: 'https://www.youtube.com/embed/bYIhwrHHo3w',
    title: 'React Native',
    description: 'React Native essentials.',
    rating: 4.5,
  },
  // Add more video objects as needed
];

const mentorsData = [
  {
    id: 1,
    imgSrc: Profile,
    name: 'Steve M',
    role: 'Full-stack Developer',
    courses: '22 Courses',
  },

  {
    id: 2,
    imgSrc: Profile,
    name: 'Steve M',
    role: 'Full-stack Developer',
    courses: '22 Courses',
  },

  {
    id: 3,
    imgSrc: Profile,
    name: 'Steve M',
    role: 'Full-stack Developer',
    courses: '22 Courses',
  },
  {
    id: 4,
    imgSrc: Profile,
    name: 'Steve M',
    role: 'Full-stack Developer',
    courses: '22 Courses',
  },

  // Add more mentor objects as needed
];

function Trainingpagecontent() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const videoRef = useRef(null);

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
    setIsPlaying(!isPlaying);
  };

  const handleVideoError = () => {
    setVideoError(true);
  };

  const handleSeeAllClick = () => {
    // Add logic to handle the "See all" click, e.g., navigate to a different page or show a modal
    console.log('See all clicked');
  };

  return (
    <div className='container-fluid'>
      <div className='card-body'>
        <h2 className='card-title text-center my-5'>Training</h2>
      </div>

      <div className='container-fluid p-1 traingcon'>
        <center>
          <div className='text-center inputcon'>
            <input
              type='text'
              className='form-control inp'
              placeholder='Search Course, Advisor'
            />

            <button className='btncon'>
              <img
                src={Fillter}
                style={{ width: '20px', height: '20px', marginTop: '2px' }}
                alt='Filter'
              />
            </button>
          </div>
        </center>
      </div>

      <div className='container d-flex my-5' style={{ justifyContent: 'space-between' }}>
        <div>
          <h5>Explore Course</h5>
        </div>
        <div>
          <span onClick={handleSeeAllClick} style={{ cursor: 'pointer' }}>
            See all
          </span>
        </div>
      </div>

      <div className='container'>
        <center>
          <div className='row row-cols-1 row-cols-md-3 g-2'>
            {coursesData.map((course) => (
              <div className='col' key={course.id}>
                <div className='card mb-3' style={{ maxWidth: 300, maxHeight: 100, backgroundColor: '#2FB5A8',borderRadius:20 }}>
                  <div className='row g-0'>
                    <div
                      className='col-md-4 my-3 mx-2'
                      style={{ width: '70px', height: '60px', backgroundColor: '#005049', borderRadius: '15px' }}
                    >
                      <img
                        src={course.imgSrc}
                        style={{ width: '35px', height: '32px' }}
                        className='img-fluid rounded-start my-3'
                        alt='Course'
                      />
                    </div>
                    <div className='col-md-8 sm-3' >
                      <div className='card-body'>
                        <h5 className='card-title text-center text-white businesstitle'>{course.title}</h5>
                        <p className='card-text text-center text-white businesstitle1'>{course.content}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </center>
      </div>

      <div className='container d-flex my-5' style={{ justifyContent: 'space-between' }}>
        <div>
          <h5>Featured Courses</h5>
        </div>
        <div>
          <span onClick={handleSeeAllClick} style={{ cursor: 'pointer' }}>
            See all
          </span>
        </div>
      </div>

      <div className='container'>
        <div className='row row-cols-1 row-cols-md-4 g-4'>
          {videosData.map((video) => (
            <div className='col' key={video.id}>
              <div className='card' style={{ backgroundColor: '#2FB5A8', borderRadius: 20, height: 'auto' }}>
                {videoError ? (
                  <div className='video-error-message'>Error loading video</div>
                ) : (
                  <div className='video-wrapper position-relative m-2'>
                    <iframe
                      title={video.title}
                      width='100%'
                      height='80%'
                      src={video.videoSrc}
                      frameBorder='0'
                      allowFullScreen
                      ref={videoRef}
                      style={{ borderRadius: 20 }}
                    ></iframe>
                  </div>
                )}
                <div className='card-body' style={{ backgroundColor: '#2FB5A8', borderRadius: 20 }}>
                  <div className='coursetittle'>
                    <p className='text-white text-start mx-2 '>{video.title}</p>
                  </div>
                  <h6 className='text-white text-start my-1'>{video.description}</h6>
                  <div className='d-flex'>
                    <p className='text-white '>{`Rating: ${video.rating}`}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className='container d-flex my-5' style={{ justifyContent: 'space-between' }}>
        <div>
          <h5>Top Mentors</h5>
        </div>
        <div>
          <span onClick={handleSeeAllClick} style={{ cursor: 'pointer' }}>
            See all
          </span>
        </div>
      </div>

      <div className='container'>
        <div className='row row-cols-1 row-cols-md-4 g-4'>
          {mentorsData.map((mentor) => (
            <div className='col' key={mentor.id}>
              <div className='card' style={{ border: 'none' }}>
                <center>
                  <img
                    src={mentor.imgSrc}
                    className='card-img-top'
                    alt='profile'
                    style={{ width: '40%', height: '40%' }}
                  />
                </center>
                <div className='card-body '>
                  <h5 className='card-title'>{mentor.name}</h5>
                  <p className='card-text'>
                    {mentor.role}
                    <br />
                    <p>{mentor.courses}</p>
                  </p>
                  <button className='btn btn-success'>See class</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Trainingpagecontent;
