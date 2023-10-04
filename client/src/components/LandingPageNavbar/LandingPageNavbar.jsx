import React, { useState } from 'react';
import { BsPinterest } from 'react-icons/bs';
import Login from '../../pages/Login/Login';
import Register from '../../pages/Register/Register';
import './LandingPageNavbar.css';

const LandingPageNavbar = () => {
  const [loginopen, setloginopen] = useState(false);
  const [signupopen, setsignupopen] = useState(false);

  const handleClose = () => {
    setloginopen(false);
    setsignupopen(false);
  };

  const handleLinkClick = (login) => {
    setloginopen(login);
    setsignupopen(!login);
  };

  return (
    <div className='LandingPageNavbar'>
      <div className="left">
        <BsPinterest size={35} style={{ color: '#E60023' }} />
        <h1 className="brand" onClick={() => handleLinkClick(true)}>Pinterest</h1>
      </div>
      <div className="right">
        <ul className='aboutlink'>
          <li>About</li>
          <li>Business</li>
          <li>Blog</li>
        </ul>
        <button className='btn loginbtn' onClick={() => handleLinkClick(true)}>Login</button>
        <button className='btn signupbtn' onClick={() => handleLinkClick(false)}>Sign up</button>
      </div>
      {(loginopen || signupopen) && (
        <div className={loginopen ? "logincon" : "signupcon"}>
          {loginopen ? <Login onClose={handleClose} onRegLink={() => handleLinkClick(false)} /> : <Register onClose={handleClose} onLoginLink={() => handleLinkClick(true)} />}
        </div>
      )}
    </div>
  );
};


export default LandingPageNavbar;
