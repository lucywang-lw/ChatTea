import React, { useState, useEffect, useRef } from 'react';
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { allUsersRoute, host } from "../utils/APIRoutes"; 
import Contacts from '../components/Contacts';
import Welcome from '../components/Welcome';
import ChatContainer from '../components/ChatContainer';
import {io} from "socket.io-client";

function Chat() {
  const socket = useRef();
  const navigate = useNavigate();
  const [ contacts, setContacts ] = useState([]);
  const [ currentUser, setCurrentUser ] = useState(undefined);
  const [ currentChat, setCurrentChat ] = useState(undefined);
  const [ loaded, setLoaded ] = useState(false);

  // if user is not logged in, direct to login page - if logged in, set as currentUser and set loaded to true
  useEffect(() => {
    async function addCurrentUser() {
      if(!localStorage.getItem("chat-app-user")) {
            navigate("/login");
      } else {
        setLoaded(true);
        setCurrentUser(await JSON.parse(localStorage.getItem("chat-app-user")));
      }
      };

      addCurrentUser();
    }, []);

  
  // connect to socket whenever the current user changes, and sends message to add the user
  useEffect(() => {
    if (currentUser) {
      socket.current = io(host); // connection
      socket.current.emit("add-user", currentUser._id); // send message
    }
  }, [currentUser]);

  // if current user is set, and avatar image is also set, get all the users in database
  useEffect(() => {
    async function addContacts() {
      if (currentUser) {
        if (currentUser.isAvatarImageSet) {
          const data = await axios.get(`${allUsersRoute}/${currentUser._id}`);
          console.log("contacts: ", data.data);
          setContacts(data.data);
        } else {
          navigate("/setAvatar");
        }
      }
    };

    addContacts();
  }, [currentUser]);

  // update chat whenever it changes
  const handleChat = (chat) => {
    setCurrentChat(chat);
  };
  

  return (
    <Container>
      <div className="container">
        <Contacts contacts={contacts} currentUser={currentUser} changeChat={handleChat} />
        { loaded && currentChat === undefined ? (
          <Welcome currentUser={currentUser} />
        ) : (
          <ChatContainer currentChat={currentChat} currentUser={currentUser} socket={socket} />
        )
      }
      </div>
    </Container>
  );
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #D1D7B5;
  .container {
    height: 85vh;
    width: 85vw;
    background-color: #00000076;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }

`;

export default Chat;