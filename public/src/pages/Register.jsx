import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import styled from "styled-components";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { registerRoute } from '../utils/APIRoutes';
import Logo from "../assets/logo.svg";
import { toastOptions } from './toastOptions';

function Register() {
    const navigate = useNavigate();
    const [ inputVal, setInputVal ] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    // if user is logged in, redirect to chat page
    useEffect(() => {
        if (localStorage.getItem("chat-app-user")) {
            navigate("/");
        }
    }, []);

    // update inputted values
    const handleChange = (e) => {
        setInputVal({...inputVal, [e.target.name]: e.target.value });
    };

    
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (handleValidation()) {
            const { username, email, password } = inputVal;
            const { data } = await axios.post(registerRoute, {
                username,
                email,
                password,
            });
            if (data.valid === false) {
                toast.error(data.msg, toastOptions);
            } else {
                // set user in local storage and navigate to chat app
                localStorage.setItem("chat-app-user", JSON.stringify(data.user));
                navigate("/");
            }
        };
    }

    // check that input is valid
    const handleValidation = () => {
        const {username, email, password, confirmPassword } = inputVal;
        if (password !== confirmPassword) {
            toast.error("Make sure passwords are the same.", toastOptions);
            return false;
        } else if (username.length < 3) {
            toast.error("Username must be longer than 3 characters.", toastOptions);
            return false;
        } else if (password.length < 8) {
            toast.error("Password must be equal or longer than 8 characters.", toastOptions);
            return false;
        } else if (email.length === 0) {
            toast.error("Email is required.", toastOptions);
        } else {
            return true;
        }
    }

  return (
    <>
        <FormContainer>
            <form onSubmit={ (e) => handleSubmit(e) }>
                <div className="logo">
                    <img src={Logo} alt="logo" />                    
                    <h1>ChatTea</h1>
                </div>

                <input 
                    type="text" 
                    placeholder="Username" 
                    name="username" 
                    onChange={(e) => handleChange(e)} 
                />
                <input 
                    type="email" 
                    placeholder="username@email.com" 
                    name="email" 
                    onChange={(e) => handleChange(e)} 
                />
                <input 
                    type="password" 
                    placeholder="Password" 
                    name="password" 
                    onChange={(e) => handleChange(e)} 
                />
                <input 
                    type="password" 
                    placeholder="Confirm Password" 
                    name="confirmPassword" 
                    onChange={(e) => handleChange(e)} 
                />
                <button type="submit">Create User</button>
                <div className='account'>Already have an account? <Link to="/login">Login</Link></div>
            </form>
        </FormContainer>
        <ToastContainer />
    </>
  ) 
}

const FormContainer = styled.div`
    height: 100vh;
    width: 100vw;
    background-color: #D1D7B5;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .logo {
        display: flex;
        align-items: center;
        img {
            height: 65%;
        }
        h1 {
            color: white;
            margin: auto;
        }
    } 
    form {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
        background-color: #0000008a;
        border-radius: 15px;
        padding: 2.5rem 5rem;
        input {
            background-color: transparent;
            padding: 1rem;
            border: 0.1rem solid #D1D7B5;
            border-radius: 0.4rem;
            color: white;
            font-size: 1rem;
            ::placeholder { 
            color: white;
            }
        }
        input:focus {
            border: 0.1rem solid #AB9F8D;
            outline: none;
            background-color: #F9EBDB;
            color: #809C6C;
            ::placeholder { 
            color: #809C6C;
            }
        }
    }  
    button {
        border: none;
        background-color: #D1D7B5;
        color: white;
        padding: 1rem 2rem;
        font-weight: bold;
        cursor: pointer;
        border-radius: 0.4rem;
        font-size: 18px;
        text-transform: uppercase;
        transition: 0.5s ease-in-out;
        &:hover {
            background-color: #809C6C;
        }
    } 
    .account {
        color: white;
        text-transform: uppercase;
        a {
            color: #809C6C ;
            text-decoration: none;
            font-weight: bold;

        }
    }   
`;

export default Register;