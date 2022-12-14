import React from 'react';
import styled from "styled-components";
import Logo from "../assets/logo.svg";
import Logout from './Logout';



function Welcome({ currentUser }) {
  return (
    <Container>
        <img src={Logo} alt="logo" />
        <div>
        <h1>
        Welcome to ChatTea, <span>{currentUser.username}!</span>
        </h1>
        </div>
        <Logout />
  </Container>  )
}

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    flex-direction: column;
    img {
        height: 16rem;
        padding: 10px;
        margin-left: 70px;
    }
    div {
        margin: 20px;

    }
    span {
        color: #F9EBDB;
    }
`;

export default Welcome