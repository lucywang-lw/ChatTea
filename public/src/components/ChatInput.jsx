import React, { useState } from 'react';
import styled from 'styled-components';
import Picker from "emoji-picker-react";
import { IoMdSend } from "react-icons/io";
import { BsEmojiSmileFill } from "react-icons/bs";


function ChatInput({ handleSendMsg }) {
    const [ showEmoji, setShowEmoji ] = useState(false);
    const [ msg, setMsg ] = useState("");

    const handleEmojiClick = () => {
        setShowEmoji(!showEmoji);
    };

    const handleUseEmoji = (event, emoji) => {
        let message = msg;
        message += emoji.emoji;
        setMsg(message);
    };

    const sendChat = (e) => {
        
        e.preventDefault();
        if(msg !== "") {
            handleSendMsg(msg);
            setMsg('');
        }
    }


  return (
    <Container>
        <div className="button-container">
            <div className="emoji">
                <BsEmojiSmileFill onClick={handleEmojiClick} />
                { showEmoji && <Picker onEmojiClick={handleUseEmoji} />}
            </div>
        </div>
        <form className="input-container" onSubmit={sendChat}>
            <input type="text" placeholder="Type your message here." value={msg} onChange={(e) => setMsg(e.target.value)} />
            <button className='submit'>
                <IoMdSend />
            </button>
        </form>
    </Container>
  )
}

const Container = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 5% 95%;
  background-color: #080420;
  padding: 0 2rem;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    padding: 0 1rem;
    gap: 1rem;
  }
  .button-container {
    display: flex;
    align-items: center;
    color: white;
    gap: 1rem;
    .emoji {
      position: relative;
      svg {
        font-size: 1.5rem;
        color: #F9EBDB;
        cursor: pointer;
      }
      .emoji-picker-react {
        position: absolute;
        top: -350px;
        background-color: #F9EBDB;
        box-shadow: 0 5px 10px #AB9F8D;
        border-color: #AB9F8D;
        .emoji-scroll-wrapper::-webkit-scrollbar {
          background-color: #F9EBDB;
          width: 5px;
          &-thumb {
            background-color: #AB9F8D;
          }
        }
        .emoji-categories {
          button {
            filter: contrast(0);
          }
        }
        .emoji-search {
          background-color: transparent;
          border-color: #AB9F8D;
        }
        .emoji-group:before {
          background-color: #F9EBDB;
        }
      }
    }
  }
  .input-container {
    width: 100%;
    border-radius: 2rem;
    display: flex;
    align-items: center;
    gap: 2rem;
    background-color: #ffffff34;
    input {
      width: 90%;
      height: 60%;
      background-color: transparent;
      color: white;
      border: none;
      padding-left: 1rem;
      font-size: 1.2rem;
      &::selection {
        background-color: #AB9F8D;
      }
      &:focus {
        outline: none;
      }
    }
    button {
      padding: 0.3rem 2rem;
      border-radius: 2rem;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #AB9F8D;
      border: none;
      @media screen and (min-width: 720px) and (max-width: 1080px) {
        padding: 0.3rem 1rem;
        svg {
          font-size: 1rem;
        }
      }
      svg {
        font-size: 2rem;
        color: white;
      }
    }
  }
`;

export default ChatInput