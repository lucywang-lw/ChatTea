import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import styled from "styled-components";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { loginRoute } from '../utils/APIRoutes';
import Logo from "../assets/logo.svg";
import { toastOptions } from './toastOptions';

function Login() {
    const navigate = useNavigate();
    const [ inputVal, setInputVal ] = useState({
        username: "",
        password: "",
    })

    // If user is already logged in, redirect to chat page
    useEffect(() => {
        if (localStorage.getItem("chat-app-user")) {
            navigate("/");
        }
    }, []);

    // update inputted values
    const handleChange = (e) => {
        setInputVal({...inputVal, [e.target.name]: e.target.value });
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (handleValidation()) {
            const {username, password } = inputVal;
            const { data } = await axios.post( loginRoute, {
                username,
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

    // check that user filled in username and password
    const handleValidation = () => {
        const { username, password } = inputVal;
        if (password === "") {
            toast.error("Password is required.", toastOptions);
            return false;
        } else if (username === "") {
            toast.error("Username is required.", toastOptions);
            return false;
        }
        return true;
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
                    min="3"
                />
                <input 
                    type="password" 
                    placeholder="Password" 
                    name="password" 
                    onChange={(e) => handleChange(e)} 
                />
                
                <button type="submit">Login</button>
                <div className='account'>Don't have an account? <Link to="/register">Register</Link></div>
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

export default Login;