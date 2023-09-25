import React from 'react'
import './Register.css'
import { BsPinterest } from 'react-icons/bs'
import { AiOutlineClose } from 'react-icons/ai'
import { Link } from 'react-router-dom'


const Register = ({onclose , onloginlink}) => {

  const handleclick =()=>{
    onclose(false)
  }
  const handleloginlink =() =>{
    onloginlink(false)
  }

  return (
    <div className='login'>
      <button className='close' onClick={handleclick}><AiOutlineClose/></button>
      <form action="">
        <div className="top">
          <BsPinterest size={30} />
          <h1>Welcome to Pinterest</h1>
          <span>Find new ideas to try</span>
        </div>
        <div className="inputs">
          <div className="inputbox">
            <label htmlFor="">Email</label>
            <input type="email" name="email" id="email" />
          </div>
          <div className="inputbox">
            <label htmlFor="">Password</label>
            <input type="password" name="password" id="password" />
          </div>
          <span className='fp'>Forget your Password?</span>
          <button className='btnlog'>Sign up</button>
          <span>OR</span>
          <div className="auth">
            <div className="inputbox">
              facebook
            </div>
            <div className="inputbox">
              Google
            </div>
          </div>          
        </div>
        <div className="bottom">
            <p>
              By continuing, you agree to Pinterest's<br/> <b>Terms of Service</b> and acknowledge you've read our <b> <br/>Privacy Policy. Notice at collection</b>
            </p>
            <div className="line"></div>
            <span>Already a member? <b  className="link"onClick={handleloginlink}>Log in</b></span>                        
            <p>create a free business account</p>
          </div>
      </form>
    </div>
  )
}

export default Register