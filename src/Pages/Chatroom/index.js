import React, { useState, useEffect } from 'react';
import './Chatstyle.css'
import { useParams } from "react-router-dom";
import { Imagebaseurl } from '../../Config/utilites';
import TalentNav from '../../Config/Telantnavbar';
import Footer from '../../Components/Footer' 
import { useSelector } from 'react-redux';


function SendMessageForm({ onSendMessage }) {
    // const userId = useSelector((state) => state.auth);
    const userId = localStorage.getItem("id");
    console.log("id", userId)
    const [chats, setChats] = useState([]);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState(() => {
        // Load saved messages from localStorage or initialize to an empty array
        const savedMessages = localStorage.getItem('chatMessages');
        return savedMessages ? JSON.parse(savedMessages) : [];
    });

    // save msg

    useEffect(() => {
        localStorage.setItem('chatMessages', JSON.stringify(messages));
    }, [messages]);

    const handleMessageChange = (e) => {
        setMessage(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!message.trim()) return;
        setMessages([...messages, { text: message, sender: 'user' }]); // Assuming 'user' as the sender for all messages
        setMessage('');
    };

    // get All user api

    useEffect(() => {
        // Function to fetch messages from the API
        const fetchMessages = async () => {
            // Retrieve the token from local storage
            const token = localStorage.getItem("token");

            try {
                const response = await fetch('https://app.jobbooks.app/api/v1/jobbook/chat/getMyChats', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error(`Error: ${response.status}`);
                }

                const data = await response.json();
                console.error('Received data is not an arraysssssssssssss:', data.chats);
                setChats(data.chats);

                // Check if data is an array before setting it

            } catch (error) {
                console.error('Failed to fetch messages:', error);
            }
        };

        fetchMessages();
    }, []);


    return (
        <>
            <TalentNav />
            <div className='container-fluid my-5'>
                <div className="row">
                    <div className="col-sm-5 mb-3 mb-sm-0">
                        <div className="card">
                            <div className="card-body">
                                <h3 className="header card-title text-start">Messages</h3>
                                {chats.map((item, index) =>
                                        (

                                            <ul key={index}>
                                                <li className='text-start my-3'>
                                                    <div style={{ display: "flex", flexDirection: "row" }}>
                                                        <img
                                                            className="mx-2 my-2"
                                                            src={`${Imagebaseurl}${item.participants.filter(i => i._id != userId).picture}`}
                                                            alt="Profile"
                                                            style={{ width: "5%", height: "5%", borderRadius: "10px" }}
                                                        />
                                                <p className='mx-2 my-2' style={{ fontSize: 18 }}>{item.participants.filter(i => i._id != userId).name}</p>
                                                    </div>
                                                </li>
                                            </ul>
                                        )
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <div className="card">
                            <div className='chat-container'>
                                <div className="message-list">
                                    {messages.map((msg, index) => (
                                        <div key={index} className={`message-item`}>
                                            <p className='text-end me-2'>{msg.text}</p>
                                        </div>
                                    ))}
                                </div>
                                <form onSubmit={handleSubmit} className="message-form">
                                    <input
                                        type="text"
                                        value={message}
                                        onChange={handleMessageChange}
                                        placeholder="Type a message..."
                                    />
                                    <button type="submit">Send</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            <Footer />
        </>


    )

}

export default SendMessageForm;
