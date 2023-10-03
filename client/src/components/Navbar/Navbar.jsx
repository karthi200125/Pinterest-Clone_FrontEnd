import React, { useContext, useState } from 'react';
import './Navbar.css';
import { BsPinterest, BsChevronDown } from 'react-icons/bs';
import { BiSolidBell } from 'react-icons/bi';
import { AiFillMessage } from 'react-icons/ai';
import { FaSearch } from 'react-icons/fa';
import More from '../More/More';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/Authcontext';

const Navbar = () => {
  const [moreopen, setmoreopen] = useState(false);
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
        <Link to="/home"><BsPinterest size={30} style={{color:'#E60023'}}/></Link>
        <ul>
          <Link to='/home' className={pathname === '/home' ? "active" : ""}><li>Home</li></Link>
          <li className={pathname === '' ? "active" : ""}>Explore</li>
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
              <img src={`../upload/${user.profilePic}`} alt="" />
              :
              <img src="https://images.getpng.net/uploads/preview/instagram-social-network-app-interface-icons-smartphone-frame-screen-template27-1151637511568djfdvfkdob.webp" alt="" />
            }
            <span className='iconname'>Your Profile</span>
          </div>
        </Link>
        <div className='iconhovercon' onClick={() => setmoreopen(!moreopen)}><BsChevronDown size={15} /><span className='iconname'>More</span></div>
      </div>
      {moreopen &&
        <More />
      }
    </div>
  );
};

export default Navbar;
