import React, { useContext, useState } from 'react';
import './EditProfile.css';
import { AuthContext } from '../../Context/Authcontext';
import axios from 'axios';
import Navbar from '../../components/Navbar/Navbar';

const EditProfile = () => {
  const [username, setusername] = useState('');
  const [email, setemail] = useState('');
  const [profilePic, setprofilePic] = useState(null);

  const { user } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('username', username);
      formData.append('email', email);
      formData.append('profilePic', profilePic);

      await axios.put(`http://localhost:8800/api/users/${user._id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    } catch (error) {
      console.error('Update Error:', error);
    }
  };

  return (
    <div className='editcon'>
      <Navbar />
      <form onSubmit={handleSubmit}>
        <div className='edittop'>
          <h1>Edit Profile</h1>
          <p>Keep your personal details private. Information you add here is visible to anyone who can view your profile.</p>
        </div>

        <div className='imgcon'>
          <p>Photo</p>
          <div className='imgcon2'>
            <img src={user.profilePic} alt={user.username} />
            <label className='graybtn' htmlFor='imageInput'>
              Change
            </label>
            <input
              type='file'
              id='imageInput'
              accept='image/*'
              onChange={(e) => setprofilePic(e.target.files[0])}
              style={{ display: 'none' }}
            />
          </div>
        </div>

        <div className='editinputbox'>
          <span>Name</span>
          <input type='text' placeholder='User Name' value={username} onChange={(e) => setusername(e.target.value)} />
        </div>
        <div className='editinputbox'>
          <span>Email</span>
          <input type='email' placeholder='Email' value={email} onChange={(e) => setemail(e.target.value)} />
        </div>
        <div className='btns'>
          <button className='graybtn'>Reset</button>
          <button className='redbtn' type='submit'>
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
