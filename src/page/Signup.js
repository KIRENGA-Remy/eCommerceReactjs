import React, { useState } from 'react'
import loginSignupImage from '../assest/login-animation.gif';
import { BiShow, BiHide} from 'react-icons/bi';
import { Link, useNavigate } from 'react-router-dom';
import { ImagetoBase64 } from '../utility/ImagetoBase64';
import {toast} from "react-hot-toast";

const Signup = () => {
const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const handleShowPassword = () => {
    setShowPassword( preve => !preve);
  }
  const handleShowConfirmPassword = () => {
    setShowConfirmPassword(preve => !preve)
  }

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    image : ""
  });

  const handleOnChange = (e) => {
    const {name, value} = e.target;
    setData((preve) => ({ 
        ...preve,
      [name] : value
    }))
  }

  console.log(process.env.REACT_APP_SERVER_DOMIN);
  const handleSubmit = async (e) => {
    e.preventDefault();
  

  const {firstName, lastName, email, password, confirmPassword} = data;
  if(firstName && lastName && email && password && confirmPassword){
    if(confirmPassword === password){
      const fetchData = await fetch(`${process.env.REACT_APP_SERVER_DOMIN}/signup`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(data)
      });
      
      
      if (!fetchData.ok) {
        console.error("Failed to register user:", fetchData.statusText);
        alert("Failed to register user. Please try again.");
        return;
      }
      
      const dataRes = await fetchData.json();
      console.log(dataRes);
      toast(dataRes.message);
      if(dataRes.alert){
        navigate("/login");
      }
      
    } else{
      alert("ConfirmPassword must be the same as Password")
    }
  } else {
    alert("All fields are required")
  }
};

const handleUploadProfileImage =  async(e) => {
  const data = await ImagetoBase64(e.target.files[0])
  setData((preve) => {
    return {
      ...preve,
      image : data
    }
  })
}

  return (
    <div className='w-full max-w-sm bg-white m-auto rounded-md p-4 flex-col'>
      <h2 className='flex items-center justify-center font-bold mb-2'>Sign Up</h2>
      <form className='flex flex-col' onSubmit={handleSubmit}>
        <div className='w-20 h-20 items-center m-auto overflow-hidden rounded-full drop-shadow shadow-md relative'>
          <img src={data.image ? data.image : loginSignupImage} alt="image" className='w-full'/>
          <label htmlFor="profileImage">
          <div className='pb-1 h-full opacity-60'>
            <p className='absolute text-white bg-slate-500 text-center bottom-0 cursor-pointer h-1/3  w-full'>Upload</p>
            <input type={"file"} name='profileImage' accept='image/*' id='profileImage'
            onChange={handleUploadProfileImage} className='hidden'/>
          </div>
          </label>
        </div>
        <label htmlFor="firstName">First Name</label>
        <input type={"text"} name='firstName' className='bg-slate-200 w-full mt-1 font-bold' value={data.firstName} 
        onChange={handleOnChange} />

        <label htmlFor="lastName">Last Name</label>
        <input type={"text"} name='lastName' className='bg-slate-200 w-full mt-1 font-bold' value={data.lastName} 
        onChange={handleOnChange}/>

        <label htmlFor="email">Email</label>
        <input type={"email"} name='email' className='bg-slate-200 w-full mt-1 font-bold' value={data.email} 
        onChange={handleOnChange}/>

        <label htmlFor="password">Password</label>
        <div className='flex items-center bg-slate-200 rounded-sm'>
        <input type={showPassword ? "text" : "password"} name="password" className='bg-slate-200 w-full mt-1 h-5 justify-center outline-none pb-2 font-bold'
        value={data.password} onChange={handleOnChange}/>
        <span className='text-xl px-2 cursor-pointer'  onClick={handleShowPassword} >{showPassword ? <BiShow /> : <BiHide />} </span> 
        </div>

        <label htmlFor="password">Confirm Password</label>
        <div className='flex items-center bg-slate-200 rounded-sm'>
        <input type={showConfirmPassword ? "text" : "password"} name="confirmPassword" className='bg-slate-200 w-full mt-1 h-5 justify-center outline-none pb-2 font-bold' 
        value={data.confirmPassword} onChange={handleOnChange}/>
        <span className='text-xl px-2 cursor-pointer'  onClick={handleShowConfirmPassword} >{showConfirmPassword ? <BiShow /> : <BiHide />} </span> 
        </div>
        
        <button type={'submit'} className='flex text-white bg-red-500 hover:bg-red-600 font-bold rounded-xl mt-5 max-w-[150px] m-auto px-7 py-1'>Sign Up</button>
      </form>
      <div className='flex gap-2'>
      <p>Already have an account? </p> <Link to={"/login"} className='font-bold'>Login</Link>
      </div>
    </div>
  )
}

export default Signup;
