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
import { useQuery, useQueryClient } from '@tanstack/react-query';
import Loading from '../../components/Loading/Loading';

const Profile = () => {
  const [create, setCreate] = useState(true);
  const [saved, setSaved] = useState(false);
  const [share, setShare] = useState(false);  

  const location = useLocation();
  const pathname = location.pathname.split('/').pop();
  const { user , dispatch} = useContext(AuthContext);

  const { isLoading: profileLoading, error: profileError, data: profileData } = useQuery(['profile', pathname], async () => {
    if (!pathname) {
      return {}; 
    }
  
    const res = await makeRequest.get(`/users/${pathname}`);
    return res.data;
  });
  
  const [filteredPosts, setFilteredPosts] = useState([]);
  
  const { isLoading: createdPostsLoading, error: createdPostsError, data: createdPostsData } = useQuery(['posts', pathname], async () => {
    if (!pathname) {
      return []; 
    }
  
    const res = await makeRequest.get(`/posts/allposts`);
    const allPosts = res.data;
    const filteredPosts = allPosts.filter(post => post.userId === pathname);
    setFilteredPosts(filteredPosts);
    return filteredPosts;
  });


  const { isLoading, error, data } = useQuery(["savedposts"], async() =>
    await makeRequest.get(`posts/allposts/savedposts/${pathname}`).then((res) => {
      return res.data;
    })
  );    

  const profilePic = profileData?.profilePic || '';
  const username = profileData?.username || '';
  const email = profileData?.email || '';

  const [followed, setFollowed] = useState(false);

  // Cheking is that user folllwed or not
  useEffect(() => {    
    const isFollowing = Array.isArray(user?.followers) && user.followers.includes(profileData?._id);    
    setFollowed(isFollowing || false);
  }, [user.followers, profileData]);
  

  // cerate , saved open and close
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
        dispatch({ type: "FOLLOW", payload: { followed:  pathname} }) 
      } else {        
        dispatch({ type: "FOLLOW", payload: { followed:  pathname} }) 
      }
      
      console.log("Update success");
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
      <div className="cs-maincon">
        <div className="c-s">
          <span onClick={handleCreate} className={create ? "slideactive" : ""}>Created</span>
          <span onClick={handleSaved} className={saved ? "slideactive" : ""}>Saved</span>
        </div>
        <div className="cs-con">

          {create &&
            <>
              {createdPostsLoading ? (
                <Loading/>
              ) : (
                filteredPosts && filteredPosts.length > 0 ? (
                  <div className="createcon">
                    {filteredPosts.map((createpost) => (
                      <Card src={createpost} key={createpost._id} />                                            
                    ))}
                  </div>
                ) : (
                  <div className="createcon notceated">                                        
                    <span>{pathname === user._id ? "Nothing to show...yet! Pins you create will live here.":"they haven't created yet!"}</span>
                    {pathname === user._id && <Link to="/create"><button className='redbtn'>Create Pin</button></Link>}
                  </div>
                )
              )}
            </>
          }

          {saved &&
            <div className="saved">
              {data && data?.length > 0 ? (
                <div className='savedcon'>
                  {data.map((save) => (
                    <Card src={save} key={save._id} unsave={saved}/>
                  ))}
                </div>
              ) : (
                < div className='savedcon nosaved'>
                  {pathname === user._id &&
                    <div className='savedconicons'>
                      <div className="iconhover"><BiGitCompare size={25} /></div>
                      <div className="iconhover"><AiOutlinePlus size={25} /></div>
                    </div>
                  }
                  <p>{pathname === user._id ? "You haven't saved any Pins yet" : "they havent save anything"}</p>
                  {pathname === user._id && <button className='graybtn'>Find Ideas</button>}
                </div>
              )}
            </div>
          }
        </div>
      </div>
    </div>
  );
}

export default Profile;
