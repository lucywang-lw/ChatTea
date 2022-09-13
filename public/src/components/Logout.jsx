import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

function Logout() {
    const navigate = useNavigate();

    // clear local storage and redirect to login page
    const handleClick = async () => {
        localStorage.clear();
        navigate("/login");
    }

  return (
    <Button onClick={handleClick}>
      <h2>Log Out</h2>
    </Button>
  )
}

const Button = styled.button`
  display: flex;
  border-radius: 0.25rem;
  justify-content: center;
  align-items: center;
  padding: 0.6rem;
  background-color: #AB9F8D;
  border: none;
  cursor: pointer;
  h2 {
    color: white;
  }
`;

export default Logout;