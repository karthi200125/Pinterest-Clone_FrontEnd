import React, { useContext, useEffect, useState } from 'react';
import './Profile.css';
import { AiOutlinePlus } from 'react-icons/ai';
import { BiGitCompare } from 'react-icons/bi';
import { useLocation, Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../Context/Authcontext';
import Navbar from '../../components/Navbar/Navbar';
import Card from '../../components/Card/Card';
import Share from '../../components/Share/Share';
import { makeRequest } from '../../axios';
import { useQuery } from '@tanstack/react-query';

const Profile = () => {
  const [create, setCreate] = useState(true);
  const [saved, setSaved] = useState(false);
  const [share, setShare] = useState(false);
  const [followed, setFollowed] = useState(false);
  
  const location = useLocation();
  const pathname = location.pathname.split('/').pop();
  const { user } = useContext(AuthContext);
  const savedPosts = user.savedposts;

  const { isLoading: profileLoading, error: profileError, data: profileData } = useQuery(['profile', pathname], async () => {
    const res = await makeRequest.get(`/users/${pathname}`);
    return res.data;
  });

  const { isLoading: createdPostsLoading, error: createdPostsError, data: createdPostsData } = useQuery(['createdpost', pathname], async () => {
    const res = await makeRequest.get(`/posts/${pathname}`);
    return res.data;
  });

  const profilePic = profileData?.profilePic || '';
  const username = profileData?.username || '';
  const email = profileData?.email || '';

  useEffect(() => {
    setFollowed(user.followers?.includes(profileData?._id) || false);
  }, [user.followers, profileData]);

  const handleCreate = () => {
    setCreate(true);
    setSaved(false);
  };

  const handleSaved = () => {
    setSaved(true);
    setCreate(false);
  };

  const [followerscount, setFollowerscount] = useState(0);

useEffect(() => {
  if (profileData && profileData.followers) {
    setFollowerscount(profileData.followers.length);
  }
}, [profileData]);

useEffect(() => {
  if (profileData?.followers) {
    setFollowed(profileData.followers.includes(user._id));
  }
}, [user._id, profileData?.followers]);


const handleFollow = async () => {
  try {    
    const response = await makeRequest.put(`/users/${pathname}/follow`, { userId: user._id });

    if (response.status === 200) {      
      setFollowed(!followed);
      setFollowerscount(followed ? followerscount - 1 : followerscount + 1);
    } else {      
      console.error('Failed to follow/unfollow user:', response.data);
    }
  } catch (err) {
    console.error('Error while following/unfollowing user:', err);
  }
};


  return (
    <div className='profilecon'>
      <Navbar />
      <div className="profile">
        {profilePic ? (
          <img src={`../upload/${profilePic}`} alt="" />
        ) : (
          <img src="https://images.getpng.net/uploads/preview/instagram-social-network-app-interface-icons-smartphone-frame-screen-template27-1151637511568djfdvfkdob.webp" alt="" className='profilnonuserpic' />
        )}
        <h1>{username}</h1>
        <p>{email}</p>
        <span>{followerscount} followers</span>
        {user._id === pathname ? (
          <div className="btns">
            <button className='graybtn' onClick={() => setShare(!share)}> Share</button>
            <Link to={`/editprofile/${user._id}`}>
              <button className='graybtn'>Edit Profile</button>
            </Link>
          </div>
        ) : (
          <div className="btns">
            <button className='graybtn'>Message</button>
            {username !== user.username && (
              <button className={followed ? "graybtn" : "redbtn"} onClick={handleFollow}>
                {followed ? "Unfollow" : "Follow"}
              </button>
            )}
          </div>
        )}
      </div>
      <div className="c-s">
        <span onClick={handleCreate} className={create ? "slideactive" : ""}>
          Created
        </span>
        <span onClick={handleSaved} className={saved ? "slideactive" : ""}>
          Saved
        </span>

        {user._id === pathname ? (
          <>
            {create && (
              <>
                {createdPostsLoading ? (
                  <span>Loading..</span>
                ) : (
                  createdPostsData && createdPostsData.length > 0 ? (
                    <div className="mycreatedposts">
                      {createdPostsData.map((createpost) => (
                        <Card src={createpost} key={createpost._id} />
                      ))}
                    </div>
                  ) : (
                    <div className="createe">
                      <span>Nothing to show...yet! Pins you create will live here.</span>
                      <Link to="/create"><button className='redbtn'>Create Pin</button></Link>
                    </div>
                  )
                )}
              </>
            )}
            {saved && (
              <div className="saved">
                <span>
                  <div className="iconhover"><BiGitCompare size={25} /></div>
                  <div className="iconhover"><AiOutlinePlus size={25} /></div>
                </span>
                {savedPosts && savedPosts.length > 0 ? (
                  <div className='profilesavedcard'>
                    {savedPosts.map((save) => (
                      <Card src={save} key={save._id} />
                    ))}
                  </div>
                ) : (
                  <>
                    <p>You haven't saved any Pins yet</p>
                    <button className='graybtn'>Find Ideas</button>
                  </>
                )}
              </div>
            )}
          </>
        ) : (
          <>
            {create && <div className="createe">not the current user</div>}
            {saved && <div className="saved">not the current user</div>}
          </>
        )}
      </div>
    </div>
  );
}

export default Profile;
