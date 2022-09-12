import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import styled from "styled-components";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { loginRoute } from '../utils/APIRoutes';
import Logo from "../assets/logo.svg";


function Login() {
    const navigate = useNavigate();
    const [values, setValues] = useState({
        username: "",
        password: "",
    })

    const toastOptions = {
        position: "bottom-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
    }

    useEffect(() => {
        if (localStorage.getItem("chat-app-user")) {
            navigate("/");
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (handleValidation()) {
            const {username, password } = values;
            const { data } = await axios.post(loginRoute, {
                username,
                password,
            });
            if (data.status === false) {
                toast.error(data.msg, toastOptions);
            } else {
                localStorage.setItem("chat-app-user", JSON.stringify(data.user));
                navigate("/");
            }
        };
    }

    const handleValidation = () => {
        const {username, password } = values;
        if (password === "") {
            toast.error("Password is required.", toastOptions);
            return false;
        } else if (username === "") {
            toast.error("Username is required.", toastOptions);
            return false;
        }
        return true;
    }

    const handleChange = (e) => {
        setValues({...values, [e.target.name]: e.target.value });
    }

  return (
    <>
        <FormContainer>
            <form onSubmit={ (e) => handleSubmit(e) }>
                <div className="brand">
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
                <span>Don't have an account? <Link to="/register">Register</Link></span>
            </form>
        </FormContainer>
        <ToastContainer />
    </>
  ) 
}

const FormContainer = styled.div`
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1rem;
    align-items: center;
    background-color: #D1D7B5;

    .brand {
        display: flex;
        align-items: center;
        img {
            height: 5rem;
        }
        h1 {
            color: white;
            margin: auto;
        }
    } 
    form {
        display: flex;
        flex-direction: column;
        gap: 2rem;
        background-color: #00000076;
        border-radius: 2rem;
        padding: 3rem 5rem;
        input {
            background-color: transparent;
            padding: 1rem;
            border: 0.1rem solid #D1D7B5;
            border-radius: 0.4rem;
            color: white;
            width: 100%;
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
        background-color: #D1D7B5;
        color: white;
        padding: 1rem 2rem;
        border: none;
        font-weight: bold;
        cursor: pointer;
        border-radius: 0.4rem;
        font-size: 1rem;
        text-transform: uppercase;
        transition: 0.5s ease-in-out;
        &:hover {
            background-color: #809C6C;
        }
    } 
    span {
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