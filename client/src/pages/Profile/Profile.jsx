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
import Card from '../../components/Card/Card'
import Share from '../../components/Share/Share';

const Profile = () => {
  const [create, setCreate] = useState(true);
  const [saved, setSaved] = useState(false);
  const [share, setshare] = useState(false);
  const [profile, setProfile] = useState({});
  const [followed, setFollowed] = useState(false);
  const [createdposts, setcreatedposts] = useState([]);

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

  const savedPosts = user.savedposts;

  useEffect(() => {
    const getcreateposts = async () => {
      try {
        const res = await axios.get(`http://localhost:8800/api/posts/${pathname}`)
        setcreatedposts(res.data)
      } catch (err) {
        console.log(err)
      }
    }
    getcreateposts();
  }, [pathname])

  console.log(profile, "from created posts")

  return (
    <div className='profilecon'>
      <Navbar />
      <div className="profile">
        {profile.profilePic ? (
          // <img src={profile._id === user._id ? "../upload/" + profile.profilePic : profile.profilePic} alt="" />
          <img src={ "../upload/" + profile.profilePic } alt="" />
        ) : (
          <img src="https://images.getpng.net/uploads/preview/instagram-social-network-app-interface-icons-smartphone-frame-screen-template27-1151637511568djfdvfkdob.webp" alt="" className='profilnonuserpic'/>
        )}
        <h1>{profile.username}</h1>
        <p>{profile.email}</p>
        <span>{profile?.followers?.length} following</span>
        {user._id === pathname ? (
          <div className="btns">
            <button className='graybtn' onClick={()=>setshare(!share)}> Share</button>            
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
          Created
        </span>
        <span onClick={handleSaved} className={saved ? "slideactive" : ""}>
          Saved
        </span>

        {user._id === pathname ? (
          <>
            {create && (
              <>
              {createdposts && createdposts.length > 0 ? (
                  <div className="createdposts">
                    {createdposts.map((createpost) => (
                      <Card src={createpost} key={createpost._id} />
                    ))}
                  </div>
                ) : (
                  <div className="createe">
                    <span>Nothing to show...yet! Pins you create will live here.</span>
                    <Link to="/create"><button className='redbtn'>Create Pin</button></Link>
                  </div>
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
            {create && <div className="createe">
            {pathname !== user._id ? 
            <div className="createdposts">              
                {createdposts.map((createpost) => (
                  <Card src={createpost} key={createpost._id} />                  
                ))}
              </div>
              :""}
              </div>}
            {saved && <div className="saved">not current user</div>}
          </>
        )}
      </div>      
    </div>
  );
}

export default Profile;
