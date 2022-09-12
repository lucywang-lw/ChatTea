import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useRef } from 'react';
import styled from "styled-components";
import { getAllMessagesRoute, sendMessageRoute } from '../utils/APIRoutes';
import ChatInput from './ChatInput';
import Logout from './Logout';
import Messages from './Messages';

function ChatContainer({ currentChat, currentUser, socket }) {
    const scrollRef = useRef();
    const [ messages, setMessages ] = useState([]);
    const [ recvMsg, setRecvMsg ] = useState(null);
    var key = 1;

    async function getAllMsg() {
        const response = await axios.post(getAllMessagesRoute, {
            from: currentUser._id,
            to: currentChat._id,
        });
        setMessages(response.data);
    }

    useEffect(() => {
        if (currentChat) {
            getAllMsg();
        };
    }, [currentChat]);

    const handleSendMsg = async (msg) => {
        await axios.post(sendMessageRoute, {
            from: currentUser._id,
            to: currentChat._id,
            message: msg,
        });
        socket.current.emit("send-msg", {
            to: currentChat._id,
            from: currentUser._id,
            message: msg,
        });

        const msgs = [...messages];
        msgs.push({fromSelf: true, message: msg});
        setMessages(msgs);
    };

    useEffect(() => {
        if (socket.current) {
            socket.current.on("msg-recieve", (msg) => {
                setRecvMsg({fromSelf: false, message: msg });
            })
        }
    }, []);

    useEffect(() => {
        recvMsg && setMessages((prev) => [...prev, recvMsg]);
    }, [recvMsg]);


    useEffect(() => {
        scrollRef.current?.scrollIntoView({behaviour: "smooth"});
    }, [messages]);

  return (
    <>
    { currentChat && (
          <Container>
        <div className="chat-header">
            <div className="user-details">
                <div className="avatar">
                <img src={`data:image/svg+xml;base64,${currentChat.avatarImage}`} alt="avatar" />

                </div>
                <div className="username">
                    <h3>{currentChat.username}</h3>
                </div>
            </div>
            <Logout />
        </div>
        <div className="chat-messages">
            { messages.map((msg) => {
                    return (
                        <div ref={scrollRef} key={key+=1} >
                            <div className={`message ${msg.fromSelf ? "sended": "recieved"}`}>
                                <div className="content">
                                    <p>
                                        {msg.message}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </div>
        <ChatInput handleSendMsg={handleSendMsg} />
    </Container>  
    )}
    </>
  )
}

const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 80% 10%;
  gap: 0.1rem;
  overflow: hidden;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    grid-template-rows: 15% 70% 15%;
  }
  .chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem;
    .user-details {
      display: flex;
      align-items: center;
      gap: 1rem;
      .avatar {
        img {
          height: 3rem;
        }
      }
      .username {
        h3 {
          color: white;
        }
      }
    }
  }
  .chat-messages {
    padding: 1rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow: auto;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .message {
      display: flex;
      align-items: center;
      .content {
        max-width: 40%;
        overflow-wrap: break-word;
        padding: 1rem;
        font-size: 1.1rem;
        border-radius: 1rem;
        color: #809C6C;
        @media screen and (min-width: 720px) and (max-width: 1080px) {
          max-width: 70%;
        }
      }
    }
    .sended {
      justify-content: flex-end;
      .content {
        background-color: #F9EBDB;
      }
    }
    .recieved {
      justify-content: flex-start;
      .content {
        background-color: #F9EBDB;
      }
    }
  } 
`;

export default ChatContainer