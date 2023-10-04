import React, { useContext } from 'react';
import { AiOutlineLogout } from 'react-icons/ai';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/Authcontext';
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
  };

  return (
    <div className='more'>
      <div className="mobnav">
        <Link to='/home' className={pathname === '/home' ? "active" : ""}><li>Home</li></Link>
        <li className={pathname === '' ? "active" : ""}>Explore</li>
        <Link to='/create' className={pathname === '/create' ? "active" : ""}><li>Create</li></Link>
      </div>
      <p>Currently in</p>
      <div className="infobox">
        <img src={user.profilePic ? `../upload/${user.profilePic}` : 'https://images.getpng.net/uploads/preview/instagram-social-network-app-interface-icons-smartphone-frame-screen-template27-1151637511568djfdvfkdob.webp'} alt={user.username} className='morepropic' />
        <div className="details">
          <h1>{user.username}</h1>
          <span>Personal</span>
          <span>{user.email}</span>
        </div>
      </div>
      <button className='logout' onClick={handleLogout}>
        Logout <AiOutlineLogout size={20} />
      </button>
    </div>
  );
};

export default More;
