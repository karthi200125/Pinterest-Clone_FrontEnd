import React, { useContext, useState } from 'react';
import './Login.css';
import { BsPinterest } from 'react-icons/bs';
import { AiOutlineClose, AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { BiSolidError } from 'react-icons/bi';
import { LoginCall } from '../../apicalls';
import { AuthContext } from '../../Context/Authcontext';
import { useNavigate } from 'react-router-dom';
import { errorToast, successToast } from '../../toasts';

const Login = ({ onClose, onRegLink }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showpassword, setshowpassword] = useState('');
  const naviagate = useNavigate();

  const { isFetching, error, dispatch } = useContext(AuthContext);

  const handleClick = () => {
    onClose(false);
  };

  const handleRegLink = () => {
    onRegLink(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();    
    try {
      const res = await LoginCall({ email, password }, dispatch);            
    } catch (err) {      
      console.log(err)
    }
  };

  return (
    <div className='login'>
      <button className='close' onClick={handleClick}><AiOutlineClose /></button>
      <form action='' onSubmit={handleSubmit}>
        <div className='top'>
          <BsPinterest size={30} />
          <h1>Welcome to Pinterest</h1>
        </div>
        <div className='inputs'>
          <div className='inputbox'>
            <label htmlFor='email'>Email</label>
            <input type='email' name='email' id='email' onChange={(e) => setEmail(e.target.value)} required placeholder='Email' />
          </div>
          <div className='inputbox '>
            <label htmlFor='password'>Password</label>
            <div className="passwordbox">
            <input type={showpassword ? "text" : "password"} name='password' id='password' onChange={(e) => setPassword(e.target.value)} required placeholder='Password' className='passowrdinput'/>
            {showpassword ? <AiFillEyeInvisible size={25} onClick={() => setshowpassword(!showpassword)} />
              : <AiFillEye size={25} onClick={() => setshowpassword(!showpassword)} />
            }
            </div>
          </div>
          {error && <p className='err'><BiSolidError />{error}</p>}
          <span className='fp'>Forget your Password?</span>
          <button className='btnlog' disabled={isFetching}>{isFetching ? 'Please Wait...' : 'Log in'}</button>
          <span>OR</span>
          <div className='auth'>
            <div className='inputbox'>Facebook</div>
            <div className='inputbox'>Google</div>
          </div>
        </div>
        <div className='btm'>
          <p>
            By continuing, you agree to Pinterest's<br /> <b>Terms of Service</b> and acknowledge you've read our <b> <br />Privacy Policy. Notice at collection</b>
          </p>
          <div className='line'></div>
          <span>Not on Pinterest yet?<b className='link' onClick={handleRegLink}>Sign up</b></span>
          <p>Are you a business? Get started here!</p>
        </div>
      </form>
    </div>
  );
};

export default Login;
