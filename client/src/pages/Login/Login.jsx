import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import JWT_decode from 'jwt-decode';
import React, { useContext, useState } from 'react';
import { AiFillEye, AiFillEyeInvisible, AiOutlineClose } from 'react-icons/ai';
import { BiSolidError } from 'react-icons/bi';
import { BsPinterest } from 'react-icons/bs';
import { AuthContext } from '../../Context/Authcontext';
import { LoginCall } from '../../apicalls';
import './Login.css';
import googleimg from '../../assets/google.svg'
import fbimg from '../../assets/facebook.svg'

const Login = ({ onClose, onRegLink }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);


  const { isFetching, error, dispatch } = useContext(AuthContext);

  const handleClick = () => {
    onClose(false);
  };

  const handleRegLink = () => {
    onRegLink(false);
  };

  const handleGoogleLogin = async (credentialResponse) => {
    const details = JWT_decode(credentialResponse.credential);
    console.log(details);
    try {
      await LoginCall(
        {
          email: details.email,
          password: details.sub,
          username: details.name,
          profilePic: details.picture,
        },
        dispatch
      );
    } catch (err) {
      console.log('Google Login Failed', err);
    }
  };

  const CLIENT_ID = '97301674459-dn2r9s3m5p10omcpn42cc4l67jbo5kad.apps.googleusercontent.com';

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await LoginCall({ email, password }, dispatch);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className='login'>
      <button className='close' onClick={handleClick}>
        <AiOutlineClose />
      </button>
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
            <div className='passwordbox'>
              <input
                type={showPassword ? 'text' : 'password'}
                name='password'
                id='password'
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder='Password'
                className='passowrdinput'
              />
              {showPassword ? (
                <AiFillEyeInvisible size={25} onClick={() => setShowPassword(!showPassword)} />
              ) : (
                <AiFillEye size={25} onClick={() => setShowPassword(!showPassword)} />
              )}
            </div>
          </div>
          {error && (
            <p className='err'>
              <BiSolidError />
              {error}
            </p>
          )}
          <span className='fp'>Forget your Password?</span>
          <button className='btnlog' disabled={isFetching}>
            {isFetching ? 'Please Wait...' : 'Log in'}
          </button>
          <span>OR</span>
          <div className='auth'>
            <GoogleOAuthProvider clientId={CLIENT_ID} >
              <div className="google">
                <img src={googleimg} alt="" />
                <span>Sign in with google</span>
                <GoogleLogin onSuccess={handleGoogleLogin} onError={() => console.log('Google Login Failed')} />
              </div>
            </GoogleOAuthProvider>
            <div className='inputbox'>
              <img src={fbimg} alt="" />
              <span>Sign in with facebook</span>
            </div>
          </div>
        </div>
        <div className='btm'>
          <p>
            By continuing, you agree to Pinterest's<br /> <b>Terms of Service</b> and acknowledge you've read our <b> <br />Privacy Policy. Notice at collection</b>
          </p>
          <div className='line'></div>
          <span>
            Not on Pinterest yet?<b className='link' onClick={handleRegLink}>
              Sign up
            </b>
          </span>
          <p>Are you a business? Get started here!</p>
        </div>
      </form>
    </div>
  );
};

export default Login;
