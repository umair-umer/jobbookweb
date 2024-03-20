import React, { useState, useEffect, useRef } from 'react';
import './Chatstyle.css'
import { Imagebaseurl,baseurl } from '../../Config/utilites';
import TalentNav from '../../Config/Telantnavbar';
import Footer from '../../Components/Footer'
import axios from 'axios';
import ChatApp from '../../Components/Chatcomponent';
import io from 'socket.io-client';

   //sokets states
   const userId101 = localStorage.getItem("user");


   const socket = io('https://jobbookbackend.azurewebsites.net');
   




function SendMessageForm({ onSendMessage }) {
    // const userId = useSelector((state) => state.auth);
    const userId = localStorage.getItem("user");
    const currentUserId = userId;
    socket.on('ADD_USER', userId);
    // console.log("id", userId)
    const [chatHistory, setChatHistory] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [chats, setChats] = useState([]);
    
    const [message, setMessage] = useState('');
   const [chat, setChat] = useState([]);


    // get All user api
    useEffect(() => {
        // Function to fetch messages from the API
        const fetchMessages = async () => {
            // Retrieve the token from local storage
            const token = localStorage.getItem("token");

            try {
                const response = await fetch(`${baseurl}/chat/getMyChats`, {
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



    //fetch api msgs
    const fetchChatHistory = async (chatId) => {
        const token = localStorage.getItem("token");
        setIsLoading(true);
        try {
            const response = await axios.get(`${baseurl}/chat/history/${chatId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });
            setChatHistory(response.data); // Assuming response.data holds the chat history
            // console.log("response", response)
            // console.log(chatId,"sdffasdfafaf")

        } catch (error) {
            console.error('Failed to fetch chat history:', error);
        } finally {
            setIsLoading(false);
        }
    };

 // Sokets functions

    useEffect(() => {
        // Listen for incoming messages
        socket.on('RECEIVE_MESSAGE', function(data) {
          setChatHistory([...chatHistory, data]);
        });
      }, [chatHistory]);
    
      const sendMessage = (e, chatId) => {
        e.preventDefault();
        // Send message to the server
        socket.emit('SEND_MESSAGE', {
            chatId:"65fa18c7ebad3b348503f316",
            senderId:userId,
            receiverId:"65b3d1fe9c10c930b1e15abf",
            content:message
        });
        setMessage('');
      };

    return (
        <>
            <TalentNav />
            <div className='container-fluid my-5'>
                <div className="row">
                    <div className="col-sm-5 mb-3 mb-sm-0">
                        <div className="card">
                            <div className="card-body">
                                <h3 className="header card-title text-start">Messages</h3>
                                {chats.map((item, index) => (
                                    <ul key={index} onClick={() => fetchChatHistory(item._id)}> {/* Replace item._id with your chatId */}
                                        <li className='text-start my-3'>
                                            <div style={{ display: "flex", flexDirection: "row" }}>
                                                <img
                                                    className="mx-2 my-2"
                                                    src={`${Imagebaseurl}${item.participants.filter(i => i._id !== userId)[0].picture}`}
                                                    alt="Profile"
                                                    style={{ width: "5%", height: "5%", borderRadius: "10px" }}
                                                />
                                                <p className='mx-2 my-2' style={{ fontSize: 18 }}>
                                                    {item.participants.filter(i => i._id !== userId)[0].name}
                                                </p>
                                            </div>
                                        </li>
                                    </ul>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <div className="card">
                            <div className='chat-container'>
                                <div className="message-list">
                                    <div className="chat-history">
                                        {chatHistory?.data?.map((msg, index) => {
                                         
                                            const isCurrentUser = msg.senderId._id == currentUserId; 
                                            const messageClass = isCurrentUser ? 'message-right' : 'message-left';

                                            return (
                                                <div key={index} className={`message-item ${messageClass}`}>
                                                    {isCurrentUser == msg.senderId._id ?  <img  src={`${Imagebaseurl}${msg.senderId.picture}`} alt="Sender Avatar" className="avatar" />
                                                     :                <img  src={`${Imagebaseurl}${msg.receiverId.picture}`} alt="Sender Avatar" className="avatar" />}
                                                    
                                                    <p className={isCurrentUser ? 'text-end' : 'text-start'}>{msg?.content}</p>
                                                </div>
                                            );
                                        }) ?? <div>No messages found</div>}
                                    </div>


                                </div>
                                <form className="message-form" onSubmit={sendMessage}>
                                   
                                    <input
                                        type="text"
                                        placeholder="Type a message..." 
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
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
