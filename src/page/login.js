import React, { useState } from 'react'
import loginSignupImage from '../assest/login-animation.gif';
import { BiShow, BiHide} from 'react-icons/bi';
import { Link, useNavigate } from 'react-router-dom';
import {toast} from "react-hot-toast";
import { useDispatch } from 'react-redux';
import { loginRedux } from '../redux/userSlice';

const Login = () => {
const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => {
    setShowPassword( preve => !preve);
  }

  const [data, setData] = useState({
    email: "",
    password: "",
  });

const dispatch = useDispatch();


  const handleOnChange = (e) => {
    const {name, value} = e.target;
    setData((preve) => {
      return{ 
        ...preve,
      [name] : value
    }
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const { email, password } = data;
    if (email === "" || password === "") {
      alert("Email and password are required");
      return;
    }
  
    try {
      const fetchData = await fetch(`${process.env.REACT_APP_SERVER_DOMIN}/login`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(data),
      });
  
      const dataRes = await fetchData.json();
      toast(dataRes.message);
  
      if (!fetchData.ok) {
        console.error("Failed to log in:", fetchData.statusText);
        return;
      }
  
      if (!dataRes.alert) {
        toast(dataRes.message);
        setTimeout(() => {
          navigate('/signup');
        }, 2000);
      } else {
        dispatch(loginRedux(dataRes));
        setTimeout(() => {
          navigate("/");
        }, 2000);
        setData({
          email: "",
          password: "",
        });
      }
    } catch (error) {
      console.error("Error during login:", error);
      toast("Error during login. Please try again later.");
    }
  };
  return (
    <div className='w-full max-w-sm bg-white m-auto rounded-md p-4 flex-col'>
      <h2 className='flex items-center justify-center font-bold mb-2'>Login</h2>
      <form className='flex flex-col' onSubmit={handleSubmit}>
        <div className='w-20 items-center m-auto overflow-hidden rounded-full drop-shadow shadow-md'>
         <img src={loginSignupImage} alt="image" className='w-full'/> 
        </div>

        <label htmlFor="email">Email</label>
        <input type={"email"} name='email' className='bg-slate-200 w-full mt-1 font-bold' value={data.email} 
        onChange={handleOnChange}/>

        <label htmlFor="password" className='mt-3'>Password</label>
        <div className='flex items-center bg-slate-200 rounded-sm'>
        <input type={showPassword ? "text" : "password"} name="password" className='bg-slate-200 w-full mt-1 h-5 justify-center outline-none pb-2 font-bold'
        value={data.password} onChange={handleOnChange}/>
        <span className='text-xl px-2 cursor-pointer' onClick={handleShowPassword} >{showPassword ? <BiShow /> : <BiHide />} </span> 
        </div>
        
        <button type={'submit'} className='flex text-white bg-red-500 hover:bg-red-600 font-bold rounded-xl mt-5 max-w-[150px] m-auto px-7 py-1'>Login</button>
      </form>
      <div className='flex gap-2'>
      <p>Don't have an account? </p> <Link to={"/signup"} className='font-bold'>Signup</Link>
      </div>
    </div>
  )
}

export default Login;
