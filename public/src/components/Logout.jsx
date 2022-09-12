import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

function Logout() {
    const navigate = useNavigate();
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
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  border-radius: 0.5rem;
  background-color: #AB9F8D;
  border: none;
  cursor: pointer;
  h2 {
    color: white;
  }
`;

export default Logout;