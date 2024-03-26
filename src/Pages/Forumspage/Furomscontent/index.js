import React, { useState, useEffect } from 'react'
// import VIDEO from '../../Assests/video.png'
// import Google from '../../Assests/google.png'
import Google from '../../../Assests/google.png'
import VIDEO from '../../../Assests/video.png'
import axios from 'axios';
import './FormsStyle.css'
import { Imagebaseurl, baseurl } from '../../../Config/utilites';
import Loader from '../../../Components/Loader';
function Furomscontent() {
    const [cards, setCards] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const fetchCardData = async () => {
        setIsLoading(true);
        const token = localStorage.getItem("token");
        try {
          const response = await axios.get(`${baseurl}/talent/home/news`, {
            headers: {
              'Authorization': `Bearer ${token}`,
            }
          });
          setCards(response.data.data);
          console.log("data ayo", response.data.data)
        } catch (error) {
          setError(error);
        } finally {
          setIsLoading(false);
        }
      };
  
      fetchCardData();
    }, []);
    const Card = ({ card }) => {
      const profileImageUrl = card.user && card.user.picture ? `${Imagebaseurl}${card.user.picture}` : Google;
      const contentImageUrl = card.picture ? `${Imagebaseurl}${card.picture}` : VIDEO;
  
      console.log(card.profileImageUrl, "carddata");
  
      console.log("dataaaaaa=====>", profileImageUrl, contentImageUrl)
      return (
        <>
          <div className="card" style={{ width: "80rem", margin: "0 auto 30px", border: "none", boxShadow: "0px 0px 8px #c8c8c8" }}>
            <div className="card-body">
              <div className='d-flex'>
                <img src={profileImageUrl} style={{ width: "50px", height: "50px", borderRadius: "50%" }} alt="Profile" />
                <p className='card-text text-start mx-4 '>
                  {card.user.name}
                  <br />
                  <span className='card-text text-start'>{card.location}</span>
                  <br/>
                  <p className='card-text text-start my-1'>{card.description}</p>

                </p>
              </div>
            </div>
            <img src={contentImageUrl} className="card-img-top" alt="Content" style={{ width: "100%", objectFit: "cover", height: "600px" }} />
            <div className="card-body">
              <p className="card-text text-start">{card.title}</p>
            </div>
            <div className="card-footer p-4" style={{ backgroundColor: "#D2CFCF" }}>
              <div className='d-flex align-items-center'>
                <p className='card-text mx-3 mb-0'>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-heart-fill" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314" />
                  </svg>
                </p>
                <p className='card-text mx-1'>{card.likes}</p>
                <p className='card-text mx-3 mb-0'>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-chat-left-fill" viewBox="0 0 16 16">
                    <path d="M2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                  </svg>
                </p>
                <p className='card-text mx-1'>{card.comments}</p>
              </div>
            </div>
          </div>
        </>
      );
    };
    
    return (
      <div className='container'>
        {cards.length > 0 ? cards.map(card => (
          <Card key={card.user.id} card={card} />
          )) : <p><Loader /></p>}
        
      </div>
    );
  
}

export default Furomscontent