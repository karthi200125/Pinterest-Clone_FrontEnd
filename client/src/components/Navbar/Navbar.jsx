import React, { useContext, useState } from 'react';
import { AiFillMessage } from 'react-icons/ai';
import { RiMenu3Line } from 'react-icons/ri';
import { BiSolidBell } from 'react-icons/bi';
import { BsChevronDown, BsPinterest } from 'react-icons/bs';
import { FaSearch } from 'react-icons/fa';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/Authcontext';
import More from '../More/More';
import './Navbar.css';
import MobileNav from '../MobileNav/MobileNav';

const Navbar = () => {
  const [moreopen, setmoreopen] = useState(false);
  const [monavopen, setmonavopen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();
  const pathname = location.pathname;
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();

    if (searchQuery.trim() === '') {
      navigate("/home");
    } else {
      navigate(`/home?search=${searchQuery}`);
    }
  };

  return (
    <div className='navbar'>
      <div className="left">
        <Link to="/home"><BsPinterest size={30} style={{ color: '#E60023' }} /></Link>
        <ul>
          <Link to='/home' className={pathname === '/home' ? "active" : ""}><li>Home</li></Link>
          <Link to='/explore'><li className={pathname === '/explore' ? "active" : ""}>Explore</li></Link>
          <Link to='/create' className={pathname === '/create' ? "active" : ""}><li>Create</li></Link>
        </ul>
      </div>
      <form className="search" onSubmit={handleSearchSubmit}>
        <FaSearch />
        <input type="text" placeholder='Search by post name...' value={searchQuery} onChange={handleSearchInputChange} />
      </form>
      <div className="right">
        <div className='iconhovercon'><BiSolidBell size={27} /><span className='iconname'>Notifications</span></div>
        <div className='iconhovercon'><AiFillMessage size={27} /><span className='iconname'>Messages</span></div>
        <Link to={`/profile/${user._id}`}>
          <div className='iconhovercon'>
            {user.profilePic ?
              <img src={user.profilePic} alt="" />
              :
              <img src="https://images.getpng.net/uploads/preview/instagram-social-network-app-interface-icons-smartphone-frame-screen-template27-1151637511568djfdvfkdob.webp" alt="" />
            }
            <span className='iconname'>Your Profile</span>
          </div>
        </Link>
        <div className='iconhovercon'>
          <BsChevronDown size={15} className='hambur1' onClick={() => setmoreopen(!moreopen)} /><span className='iconname'>More</span>
          <RiMenu3Line size={25} className='hambur2' onClick={() => setmonavopen(!monavopen)} /> </div>
      </div>
      {moreopen &&
        <More />
      }
      <div className={monavopen ? "mnactive" : "mb"}>
        <MobileNav onclose={setmonavopen} />
      </div>
    </div>
  );
};

export default Navbar;
