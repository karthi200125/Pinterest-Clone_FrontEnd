import React, { useState } from 'react'
import './Navbar.css'
import { BsPinterest, BsChevronDown } from 'react-icons/bs'
import { BiSolidBell } from 'react-icons/bi'
import { AiFillMessage } from 'react-icons/ai'
import { FaSearch } from 'react-icons/fa'
import More from '../More/More'
import {Link, useLocation} from 'react-router-dom'


const Navbar = () => {

    const [moreopen, setmoreopen] = useState(false)

    const location = useLocation();
    const pathname = location.pathname

    console.log(pathname)

    return (
        <div className='navbar'>
            <div className="left">
                <BsPinterest size={30} />
                <ul>
                    <Link to='/home' className={pathname === '/home' ? "active":""}><li>Home</li></Link>
                    <Link to="/explore"className={pathname === '/explore' ? "active":""}><li>Explore</li></Link>
                    <Link to='/create'className={pathname === '/create' ? "active":""}><li>Create</li></Link>
                </ul>
            </div>
            <div className="search">
                <FaSearch />
                <input type="text" placeholder='Search' />
            </div>
            <div className="right">
                <div className='iconhovercon'><BiSolidBell size={27} /><span className='iconname'>Notifications</span></div>
                <div className='iconhovercon'><AiFillMessage size={27} /><span className='iconname'>Messages</span></div>
                <Link to="/profile"><div className='iconhovercon'>
                    <img src="https://i.pinimg.com/75x75_RS/41/7e/5c/417e5c126d9754ecc265007a096f97a1.jpg" alt="" /><span className='iconname'>Your Profile</span>
                </div></Link>
                <div className='iconhovercon' onClick={() => setmoreopen(!moreopen)}><BsChevronDown size={15} /><span className='iconname'>More</span></div>
            </div>
            {moreopen &&
                <More />
            }
        </div>
    )
}

export default Navbar