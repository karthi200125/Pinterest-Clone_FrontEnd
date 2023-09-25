import React, { useState } from 'react'
import './LandingPageNavbar.css';
import Login from '../../pages/Login/Login';
import Register from '../../pages/Register/Register';
import { BsPinterest } from 'react-icons/bs'

const LandingPageNavbar = () => {

    const [loginopen, setloginopen] = useState(false);
    const [signupopen, setsignupopen] = useState(false);

const handleclose =()=>{
  setloginopen(false)
  setsignupopen(false)
}

const handleloginlink =()=>{
    setloginopen(true)
    setsignupopen(false)
}

const handlereglink =()=>{
    setloginopen(false)
    setsignupopen(true)
}

    return (
        <div className='LandingPageNavbar'>
            <>
                <div className="left">
                    <BsPinterest size={35} />
                    <h1>Pinterest</h1>
                </div>
                <div className="right">
                    <ul>
                        <li>About</li>
                        <li>Buisness</li>
                        <li>Blog</li>
                    </ul>
                    <button className='btn loginbtn' onClick={() => setloginopen(true)}>Login</button>
                    <button className='btn signupbtn' onClick={() => setsignupopen(true)}>Sign up</button>
                </div>
            </>
            {loginopen &&
                <div className="logincon">
                    <Login onclose={handleclose} onreglink={handlereglink}/>
                </div>
            }
            {signupopen &&
                <div className="signupcon">
                    <Register onclose={handleclose} onloginlink={handleloginlink}/>
                </div>
            }

        </div>
    )
}

export default LandingPageNavbar