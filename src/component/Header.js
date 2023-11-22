import React, { useState } from 'react'
import logo from '../assest/logo.png'
import { Link, useNavigate } from 'react-router-dom'
import { HiOutlineUserCircle } from 'react-icons/hi'
import { BsCartFill } from 'react-icons/bs'
import Menu from '../page/Menu'
import Home from '../page/Home'
import Contact from '../page/Contact'
import About from '../page/About'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { logoutRedux } from '../redux/userSlice'
import toast from 'react-hot-toast'

const Header = () => {
const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const userData = useSelector((state) => state.user);
  console.log(userData);
  const dispatch = useDispatch();

  const handleShowMenu = () => {
    setShowMenu(preve => !preve);
  } 

  const handleLogout = () => {
    dispatch(logoutRedux());
    toast("You logged out successfully")
    navigate("/");
  }

  const cartNumberItems = useSelector((state) => state.product.cartItem);
  return (
    <header className='fixed shadow-md w-full h-12 md:shadow-md px-3 md:px-4 z-50 bg-white'>
        {/* desktop */}
        <div className='flex items-center justify-between h-full'>

   <Link to={""}>
   <div className='h-12'>
        <img src={logo} className='cursor-pointer h-full' alt={logo} />
        </div>

   </Link>
   <div className='flex items-center justify-center gap-4 md:gap-7 cursor-pointer'>
    <nav className='text-base gap-4 md:gap-6 md:text-lg hidden md:flex'>
      <Link to={""}>Home</Link>
      <Link to={"menu/:filterby"}>Menu</Link>
      <Link to={"about"}>About</Link>
      <Link to={"contact"}>Contact</Link>
    </nav>
    <Link to={"cart"}>
    <div className='text-2xl text-slate-600 relative'>
      <BsCartFill />
      <div className='absolute -top-1 -right-1 h-4 w-4 text-white rounded-full items-center m-0 text-center text-sm  bg-red-600'>{cartNumberItems.length}</div>
    </div>
    </Link>
    <div className='text-slate-600' onClick={handleShowMenu}>
<div className='text-4xl items-center w-10 h-10 rounded-full overflow-hidden'>
  { userData.image ? <img src={userData.image} className='h-full w-full' alt={userData.image} /> : <HiOutlineUserCircle /> }
  {
    showMenu && (  <div className='absolute flex flex-col text-sm bg-white rounded-sm shadow drop-shadow-sm right-2 text-stone-950 px-2 py-2'>
      {
        userData.email === process.env.REACT_APP_ADMIN_EMAIL && <Link to={"newproduct"} className='whitespace-nowrap hover:underline'>New Product</Link>  
      }
    { userData.image ? <p className='hover:underline' onClick={handleLogout}>Logout ({userData.firstName}) </p> : <Link to={"login"} className='text-center whitespace-nowrap hover:underline text-base'>Login</Link>}
    <nav className='text-base md:text-lg flex flex-col md:hidden min-w-[60px]'>
      <Link to={""} className='text-center hover:underline'>Home</Link>
      <Link to={"menu"} className='text-center hover:underline'>Menu</Link>
      <Link to={"about"} className='text-center hover:underline'>About</Link>
      <Link to={"contact"} className='text-center hover:underline'>Contact</Link>
    </nav>
  </div>
  )
  }
</div>
    </div>
   </div>
        </div>
        {/* mobile */}
    </header>
  )
}

export default Header
