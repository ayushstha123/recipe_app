import React, { useState } from 'react'
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import {toast} from 'react-toastify';
import {useCookies} from 'react-cookie';

const Login=()=>{
  const [username,setUsername]=useState('');
  const [password,setPassword]=useState('');
const [_, setCookies]=useCookies(["access_token"]);
const navigate=useNavigate();

  const handleSubmit=async(e)=>{
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3001/auth/login", {
        username,
        password,
      });

      setCookies("access_token", res.data.token);
      window.localStorage.setItem("userID", res.data.userID);
      toast.success("Login successful");
      navigate("/");
    } catch (error) {
      toast.error("Something went wrong!!");
    }
  };
  return(
    <div>
       <form onSubmit={handleSubmit}>
                <div>
                <h2>Login</h2>
                <label htmlFor='username'>username : </label>
                <input type='text' onChange={(e)=>setUsername(e.target.value)}/></div>

                <div>
                <label htmlFor='password'>password : </label>
                <input type='password' onChange={(e)=>setPassword(e.target.value)}/></div>
                <button type='submit'>Login</button>
            </form>
    </div>
  )
}


const Register=()=>{
    const [username,setUsername]=useState("");
    const [password,setPassword]=useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          await axios.post("http://localhost:3001/auth/register", {
            username,
            password,
          });
          toast.success("Registration successful");
          
        } catch (err){
            toast.error("Registration unsuccessful" || err.message);
        }
    };
    return (
        <div>

            <form onSubmit={handleSubmit}>
                <div>
                <h2>REGISTER</h2>
                <label htmlFor='username'>username : </label>
                <input type='text' onChange={(e)=>setUsername(e.target.value)}/></div>

                <div>
                <label htmlFor='password'>password : </label>
                <input type='password' onChange={(e)=>setPassword(e.target.value)}/></div>
                <button type='submit'>register</button>
            </form>
        </div>
    )
}

const Auth = () => {
  return (
    <div>
        <Register/>
        <Login/>
    </div>
  )
}

export default Auth