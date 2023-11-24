import React, { useContext, useState } from 'react';
import { AiFillEye, AiFillEyeInvisible, AiOutlineClose } from 'react-icons/ai';
import { BiSolidError } from 'react-icons/bi';
import { BsPinterest } from 'react-icons/bs';
import { AuthContext } from '../../Context/Authcontext';
import { makeRequest } from '../../axios';
import './Register.css';
import { errorToast, successToast } from '../../toasts';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import { LoginCall } from '../../apicalls';
import googleimg from '../../assets/google.svg'
import fbimg from '../../assets/facebook.svg'
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner'
import JWT_decode from 'jwt-decode';

const Register = ({ onClose, onLoginLink }) => {
  const [inputs, setInputs] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  

  const handleClick = () => {
    onClose(false);
  };
  const handleLoginLink = () => {
    onLoginLink(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const { isFetching, error, dispatch } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLoading) return;
    setIsLoading(true);
    try {
      const res = await makeRequest.post("/auth/register", inputs);
      successToast(res.data)
      onLoginLink(false);
    } catch (err) {
      errorToast(err.response.data)
    } finally {
      setIsLoading(false);
    }
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


  return (
    <div className='login'>
      <button className='close' onClick={handleClick}><AiOutlineClose /></button>
      <form action='' onSubmit={handleSubmit}>
        <div className='top'>
          <BsPinterest size={30} />
          <h1>Welcome to Pinterest</h1>
          <span>Find new ideas to try</span>
        </div>
        <div className='inputs'>
          <div className='inputbox'>
            <label htmlFor='username'>Username</label>
            <input type='text' name='username' id='username' placeholder='Username' onChange={handleChange} required />
          </div>
          <div className='inputbox'>
            <label htmlFor='email'>Email</label>
            <input type='email' name='email' id='email' placeholder='Email' onChange={handleChange} required />
          </div>
          <div className='inputbox '>
            <label htmlFor='password'>Password</label>
            <div className='passwordbox'>
              <input
                type={showPassword ? "text" : "password"}
                name='password'
                id='password'
                onChange={handleChange}
                required
                placeholder='Password'
                className='passwordinput'
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
            {isLoading ? <LoadingSpinner/> : 'Sign Up'}
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
          </div>
        </div>
        <div className='btm'>          
          <span>
            Already a member? <b className='link' onClick={handleLoginLink}>Log in</b>
          </span>          
        </div>
      </form>
    </div>
  );
};

export default Register;
