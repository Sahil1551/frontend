
import React,{useState} from 'react'
import './navbar.css'
import {Link} from 'react-router-dom'
import { RiAccountBoxLine } from "react-icons/ri";

const Navbar = () => {
  const [isOpen,setIsOpen]=useState(false)
  const handlClick=async()=>{
    setIsOpen(!isOpen)
  }
  const user=localStorage.getItem('accesstoken')
  
  return (
    <>
        <div className='navbar oswald-bolds'>
            <Link to="/" className='Link'><h2>mancot <h6>mens clothing</h6></h2></Link> 
            <div className='ele'>
            <Link className='About' to='/About'><h2>About Us</h2></Link>
            
            <Link className='About' to='/Product'><h2>Products</h2></Link>
            
            <Link className='About' to='/Contact'><h2>contact us</h2></Link>

      {user &&  
        <div className="user-profile-container">
            <RiAccountBoxLine  className='userProfile' size={50} onClick={handlClick} />
            {isOpen && (
        <div className="dropdown-menu">
          <ul>
          <Link to='/Profile'><li>My Profile</li></Link>
          <Link to='/Orders'><li>My Orders</li></Link>
          <Link to='/Cart'><li>My Cart</li></Link>
          </ul>

        </div>
      )}
      </div>}
            </div>
        </div> 
    </>
  )
}

export default Navbar
