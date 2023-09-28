import React, { useState } from 'react'
import './Navbar.css'
import { BsPinterest, BsChevronDown } from 'react-icons/bs'
import { BiSolidBell } from 'react-icons/bi'
import { AiFillMessage } from 'react-icons/ai'
import { FaSearch } from 'react-icons/fa'
import More from '../More/More'
import {Link, useLocation} from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../../Context/Authcontext'


const Navbar = () => {
    const [moreopen, setmoreopen] = useState(false)

    const location = useLocation();
    const pathname = location.pathname

    console.log(pathname)
    const {user} = useContext(AuthContext)

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
                <Link to={`/profile/${user._id}`}><div className='iconhovercon'>
                    <img src={user.profilePic} alt="" /><span className='iconname'>Your Profile</span>
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