import React, { useState, useEffect, useRef } from 'react';
import './Chatstyle.css'
import { Imagebaseurl, baseurl } from '../../Config/utilites';
import TalentNav from '../../Config/Telantnavbar';
import Footer from '../../Components/Footer'
import axios from 'axios';
import io from 'socket.io-client';
import Nav from '../../Config/Navigation';
import { Link } from 'react-router-dom';

//sokets states
const socket = io('https://jobbookbackend.azurewebsites.net');

function SendMessageForm() {
    const userId = localStorage.getItem("user");
    const userRole = localStorage.getItem("userRole");
    console.log("userRole", userRole)
    const currentUserId = userId;
    // socket.on('ADD_USER', userId);
    // console.log("id", userId)
    const [chatHistory, setChatHistory] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [chats, setChats] = useState([]);

    const [message, setMessage] = useState('');
    const [room, setRoom] = useState({})
    const [roomId, setRoomId] = useState()
    const [receiverId, setReceiverId] = useState()
    const [isChatHistoryVisible, setIsChatHistoryVisible] = useState(false);



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
    const fetchChatHistory = async (chatId, receiverId) => {
        socket.emit("JOIN_CHAT", chatId)

        const token = localStorage.getItem("token");
        setIsLoading(true);
        setIsChatHistoryVisible(true);
        try {
            const response = await axios.get(`${baseurl}/chat/history/${chatId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });
            setChatHistory(response.data.data.chatHistory); // Assuming response.data holds the chat history

            // console.log("response", response)
            // console.log("Room",room);
            console.log("RoomID", room._id);
            setRoom(response.data.data.chat)
            setRoomId(chatId)
            setReceiverId(receiverId)

            // console.log(chatId,"sdffasdfafaf")

        } catch (error) {
            console.error('Failed to fetch chat history:', error);
        } finally {
            setIsLoading(false);
        }
    };


    const messagesEndRef = useRef(null);


    // Sokets functions
    useEffect(() => {
        // Listen for incoming messages
        socket.on('RECEIVE_MESSAGE', function (data) {
            setChatHistory([...chatHistory, data]);
        });

        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });

    }, [chatHistory]);

    const sendMessage = (e) => {
        console.log("ddddddddd")
        if (message == "") {
            return
        }

        // const receiverId = room.participants.filter(i => i._id != currentUserId)._id
        // console.log("receiverId", receiverId);
        e.preventDefault();
        // Send message to the server
        socket.emit('SEND_MESSAGE', {

            chatId: roomId,
            senderId: userId,
            receiverId: receiverId,
            content: message
        });
        setMessage('');
    };

    // console.log("chatHiistory",chatHistory)

    return (
        <>
            {userRole !== "company" ? <Nav /> : <TalentNav />}
            <div className='container-fluid my-5'>
                <div className="row">
                    <div className="col-sm-5 mb-3 mb-sm-0">
                        <div className="card">
                            <div className="card-body chat-main-container">
                                <h3 className="header card-title text-start">Messages</h3>
                                {chats.map((item, index) => (
                                    <ul key={index} onClick={() => fetchChatHistory(item._id, item.participants.filter(i => i._id !== userId)[0]._id)}> {/* Replace item._id with your chatId */}
                                        <li className='text-start my-3'>
                                            <div style={{ display: "flex", flexDirection: "row", cursor: "pointer" }}>
                                                <img
                                                    className="mx-2 my-2"
                                                    src={`${Imagebaseurl}${item.participants.filter(i => i._id !== userId)[0].picture}`}
                                                    alt="Profile"
                                                    style={{ width: "4%", height: "4%", borderRadius: "10px" }}
                                                />
                                                <p className='mx-2 my-2 active-messages' style={{ fontSize: 18 }}>
                                                    {item.participants.filter(i => i._id !== userId)[0].name}
                                                </p>
                                            </div>
                                            <hr />

                                        </li>
                                    </ul>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <div className="card">
                        {isChatHistoryVisible && (   
                        <div className='header-for-topchat-btns'>
                                <Link to={'/videocall'}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-camera-video-fill" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd" d="M0 5a2 2 0 0 1 2-2h7.5a2 2 0 0 1 1.983 1.738l3.11-1.382A1 1 0 0 1 16 4.269v7.462a1 1 0 0 1-1.406.913l-3.111-1.382A2 2 0 0 1 9.5 13H2a2 2 0 0 1-2-2z" />
                                </svg>
                                </Link>
                            </div>  )}
                            <div className='chat-container chat-main-container'>
                                <div className="message-list">
                                    <div className="chat-history">
                                        {chatHistory?.map((msg, index) => {

                                            const isCurrentUser = msg.senderId._id == currentUserId;
                                            // console.log("msg", msg);
                                            const messageClass = isCurrentUser ? 'message-right' : 'message-left';

                                            return (
                                                <div key={index} className={`message-item my-2 ${messageClass}`}>
                                                    {isCurrentUser == msg.senderId._id ? (
                                                        <img src={`${Imagebaseurl}${msg.senderId.picture}`} alt="Sender Avatar" className="avatar" />
                                                    ) : (
                                                        <img src={`${Imagebaseurl}${msg.receiverId.picture}`} alt="Sender Avatar" className="avatar mx-2" />
                                                    )}
                                                    <p className={isCurrentUser ? 'text-end' : 'text-start'}>{msg?.content}</p>
                                                </div>
                                            );
                                        }) ?? <div>No messages found</div>}
                                        <div ref={messagesEndRef} /> {/* Invisible element to auto-scroll to */}
                                    </div>


                                </div>
                                {isChatHistoryVisible && ( // Conditionally render based on isChatHistoryVisible
                                    <div style={{ position: "sticky", bottom: "0" }}>
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
                                )}
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
