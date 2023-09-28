import React, { useContext, useEffect, useState } from 'react';
import './Profile.css';
import { AiOutlinePlus } from 'react-icons/ai';
import { BiGitCompare } from 'react-icons/bi';
import { CiUser } from 'react-icons/ci';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../Context/Authcontext';
import Navbar from '../../components/Navbar/Navbar';

const Profile = () => {
  const [create, setCreate] = useState(true);
  const [saved, setSaved] = useState(false);
  const [profile, setProfile] = useState({});
  const [followed, setFollowed] = useState(false);

  const location = useLocation();
  const pathname = location.pathname.split('/').pop();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`http://localhost:8800/api/users/${pathname}`);
        setProfile(res.data);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchProfile();
  }, [pathname]);

  const { user } = useContext(AuthContext);

  useEffect(() => {
    setFollowed(user.followers?.includes(profile._id));
  }, [user.followers, profile._id]);

  const handleCreate = () => {
    setCreate(true);
    setSaved(false);
  };

  const handleSaved = () => {
    setSaved(true);
    setCreate(false);
  };

  const handleFollow = async () => {
    try {
      if (followed) {
        await axios.put(`http://localhost:8800/api/users/${profile._id}/unfollow`, { userId: user._id });
      } else {
        await axios.put(`http://localhost:8800/api/users/${profile._id}/follow`, { userId: user._id });
      }
    } catch (error) {
      console.log(error);
    }
    setFollowed(!followed);
  };

  console.log(profile?.followers?.length);

  return (
    <div className='profilecon'>
      <Navbar/>
      <div className="profile">
        {profile.profilePic ? (
          <img src={profile.profilePic} alt="" />
        ) : (
          <CiUser size={70} />
        )}
        <h1>{profile.username}</h1>
        <p>{profile.email}</p>
        <span>{profile?.followers?.length} following</span>
        {user._id === pathname ? (
          <div className="btns">
            <button className='graybtn'> Share</button>
            <Link to={`/editprofile/${user._id}`}>
              <button className='graybtn'>Edit Profile</button>
            </Link>
          </div>
        ) : (
          <div className="btns">
            <button className='graybtn'>Message</button>
            {profile.username !== user.username && (
              <button className='redbtn' onClick={handleFollow}>
                {followed ? "Unfollow" : "Follow"}
              </button>
            )}
          </div>
        )}
      </div>
      <div className="c-s">
        <span onClick={handleCreate} className={create ? "slideactive" : ""}>
          Create
        </span>
        <span onClick={handleSaved} className={saved ? "slideactive" : ""}>
          Saved
        </span>

        {user._id === pathname ? (
          <>
            {create && (
              <div className="createe">
                <span>Nothing to show...yet! Pins you create will live here.</span>
                <button className='redbtn'>Create Pin</button>
              </div>
            )}
            {saved && (
              <div className="saved">
                <span>
                  <div className="iconhover"><BiGitCompare size={25} /></div>
                  <div className="iconhover"><AiOutlinePlus size={25} /></div>
                </span>
                <p>You haven't saved any Pins yet</p>
                <button className='graybtn'>Find Ideas</button>
              </div>
            )}
          </>
        ) : (
          <>
            {create && <div className="createe"></div>}
            {saved && <div className="saved"></div>}
          </>
        )}
      </div>
    </div>
  );
}

export default Profile;
