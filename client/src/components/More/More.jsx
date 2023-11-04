import React, { useContext } from 'react';
import { AiOutlineLogout } from 'react-icons/ai';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/Authcontext';
import { successToast } from '../../toasts';
import './More.css';

const More = () => {
  const { user, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;

  const handleLogout = () => {
    localStorage.removeItem("user");
    dispatch({ type: "LOGOUT" });
    navigate('/');
    successToast("logged out successfully")
  };

  return (
    <div className='more'>
      <div className="mobilenav">
        <ul>
          <Link to='/home' className={pathname === '/home' ? "active" : ""}><li>Home</li></Link>
          <Link to='/explore'><li className={pathname === '/explore' ? "active" : ""}>Explore</li></Link>
          <Link to='/create' className={pathname === '/create' ? "active" : ""}><li>Create</li></Link>
        </ul>
      </div>
      <p>Currently in</p>
      <div className="infobox">
        <img src={user.profilePic ? user.profilePic : 'https://images.getpng.net/uploads/preview/instagram-social-network-app-interface-icons-smartphone-frame-screen-template27-1151637511568djfdvfkdob.webp'} alt={user.username} className='morepropic' />
        <div className="details">
          <h1>{user.username}</h1>
          <span>Personal</span>
          <span>{user.email}</span>
        </div>
      </div>
      <div className="con">
        <button className='logout' onClick={handleLogout}>
          Logout <AiOutlineLogout size={20} />
        </button>
      </div>
    </div>
  );
};

export default More;
