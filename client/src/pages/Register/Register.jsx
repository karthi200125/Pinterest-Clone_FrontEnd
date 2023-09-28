import React, { useContext, useState } from 'react';
import './Register.css';
import { BsPinterest } from 'react-icons/bs';
import { AiOutlineClose, AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import axios from 'axios';
import { AuthContext } from '../../Context/Authcontext';
import { BiSolidError } from 'react-icons/bi';

const Register = ({ onClose, onLoginLink }) => {
  const [inputs, setInputs] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);

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
    try {
      const res = await axios.post("http://localhost:8800/api/auth/register", inputs);
      console.log("register sucess")
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
            {isFetching ? 'Please Wait...' : 'Sign Up'}
          </button>
          <span>OR</span>
          <div className='auth'>
            <div className='inputbox'>Facebook</div>
            <div className='inputbox'>Google</div>
          </div>
        </div>
        <div className='bottom'>
          <p>
            By continuing, you agree to Pinterest's<br /> <b>Terms of Service</b> and acknowledge you've read our{' '}
            <b> <br />Privacy Policy. Notice at collection</b>
          </p>
          <div className='line'></div>
          <span>
            Already a member? <b className='link' onClick={handleLoginLink}>Log in</b>
          </span>
          <p>create a free business account</p>
        </div>
      </form>
    </div>
  );
};

export default Register;
