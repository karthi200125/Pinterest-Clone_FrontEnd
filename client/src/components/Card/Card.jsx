import React, { useContext, useState, useEffect } from 'react';
import './Card.css';
import { RiUpload2Line } from 'react-icons/ri';
import { FiMoreHorizontal } from 'react-icons/fi';
import { AuthContext } from '../../Context/Authcontext';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import noimage from '../../assets/notimage.png';
import Update from '../Updatebox/update';
import { makeRequest } from '../../axios';

const Card = ({ src }) => {
  const { user } = useContext(AuthContext);
  const [saved, setSaved] = useState(false);
  const [share, setShare] = useState(false);
  const [update, setUpdate] = useState(false);
  const [imageExists, setImageExists] = useState(true); // Default to true

  const location = useLocation();
  const pathnameSegments = location.pathname.split('/');
  const pathname = pathnameSegments.pop();

  useEffect(() => {
    if (user.savedposts.some(savedPost => savedPost.postId === src._id)) {
      setSaved(true);
    } else {
      setSaved(false);
    }
  }, [user.savedposts, src._id]);

  console.log(saved)

  useEffect(() => {    
    const img = new Image();
    img.src = `/upload/${src.p_image}`;
    img.onload = () => {
      setImageExists(true);
    };
    img.onerror = () => {
      setImageExists(false);
    };
  }, [src.p_image]);
  

  const toggleSave = async () => {
    try {
      if (saved) {
        await makeRequest.post("/users/unsavepost", { userId: user._id, postId: src._id });
        setSaved(false);
      } else {
        await makeRequest.post("/users/savepost", { userId: user._id, postId: src._id, postImage: src.p_image });
        setSaved(true);
      }
    } catch (err) {
      console.log(err);
    }
  }

  const id = src.postId ? src.postId : src._id;
  const img = src.postImage ? src.postImage : src.p_image;

  return (
    <>
      <div className="card" key={id}>
        <img src={imageExists ? `/upload/${img}` : "https://i.pinimg.com/236x/e2/27/8b/e2278beeec09a6f26a64b0b1b5f8240a.jpg"} alt={src.username} className="card-image" />        
        {pathname === "home" && (
          <button className={saved ? "saved-btn" : "save-button"} onClick={toggleSave}>
            {!saved ? "Save" : "Unsave"}
          </button>
        )}
        <div className="bottom">
          <div className="cardiconcon"><RiUpload2Line size={20} onClick={() => setShare(!share)} /></div>
          <div className="cardiconcon"><FiMoreHorizontal size={20} onClick={() => setUpdate(!update)} /></div>
        </div>
        {update && (
          <div className="delete">
            <Update CLICK={() => setUpdate(false)} data={src} />
          </div>
        )}
      </div>
    </>
  );
};

export default Card;
