import React, { useState, useEffect } from 'react';
import './Traninginnerstyle.css';
import axios from 'axios';
import POSTIMG from "../../../Assests/postimg.png"
import thumb from "../../../Assests/thumb.png"
import eye from "../../../Assests/eye.png"
import comment from "../../../Assests/comment.png"
import Loader from '../../../Components/Loader';

const baseURL = "https://node.jobbooks.app/";
const base = "https://node.jobbooks.app/api/v1/jobbook"

function TrainingTabs() {
    const [activeTab, setActiveTab] = useState('popular');
    const [forumData, setForumData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchForumData = async () => {
            setIsLoading(true);
            const token = localStorage.getItem("token");
            console.log("user token ===>>",token)

            try {
                const response = await axios.get(`${base}/company/home/fourms`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setForumData(response.data.data); // Adjust according to your API response structure
                console.log("ffffff",response.data)
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching forum data:', error);
                setError(error);
                setIsLoading(false);
            }
        };

        fetchForumData();
    }, []);

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };
    if (isLoading) {
        return <Loader />; // Display the Loader component while data is being fetched
      }
    
      if (error) {
        return <div>Error: {error}</div>; // Optionally handle and display errors
      }
  

    return (
        <>
            <div className='container-fluid' style={{ height: "70px", backgroundColor: "#30BDB0" }}>
                <div className='d-flex flex-row justify-content-center'>
                    <div className='my-3'>
                        <button type="button" className="btn btn-success mx-2" onClick={() => handleTabChange('popular')}>Popular</button>
                        <button type="button" className="btn btn-success mx-2" onClick={() => handleTabChange('newest')}>Newest</button>
                        <button type="button" className="btn btn-success mx-2" onClick={() => handleTabChange('following')}>Following</button>
                        <button type="button" className="btn btn-success mx-2" onClick={() => handleTabChange('recommended')}>Recommended</button>
                    </div>
                </div>
            </div>

            {/* Example section for Popular Posts */}
            <div className='tips_sec text-start pb-0'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-12'>
                            <h4>{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Posts</h4>
                        </div>
                    </div>
                    <div className='row'>
                        {activeTab === 'popular' && forumData.map(post => (
                            <div key={post.id} className='col-12'>
                                <div className='post_box'>
                                    <div className='img_box'>
                                        <div className='d-flex'>
                                            <img src={`${baseURL}${post.user.picture}` || POSTIMG} style={{width:"70px",height:"70px",borderRadius:"50%" }} alt='' />
                                            <div>
                                                <h6>{post.title}</h6>
                                                <p>{post.description} <span>.</span> <time>{post.time}</time></p>
                                            </div>
                                        </div>
                                     
                                    </div>
                                    <p>{post.description}</p> 
                                    <div className='post_bottom_box'>
                                        <ul >
                                            <li><a href='#'><img src={thumb} alt='like' /> {post.votes} votes</a></li>
                                            <li><a href='#'><img src={comment} alt='comment' /> {post.replies} Reply</a></li>
                                            <li><a href='#'><img src={eye} alt='view' /> {post.views} View</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        ))}
                        {/* Implement other tabs similarly */}
                    </div>
                </div>
            </div>
        </>
    );
}

export default TrainingTabs;




