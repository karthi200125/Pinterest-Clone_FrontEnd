import React, { useContext, useState, useEffect } from 'react';
import './Card.css';
import { RiUpload2Line } from 'react-icons/ri';
import { FiMoreHorizontal } from 'react-icons/fi';
import { AuthContext } from '../../Context/Authcontext';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';
import noimage from '../../assets/notimage.png';
import Update from '../Updatebox/update';
import { makeRequest } from '../../axios';

const Card = ({ src , unsave}) => {
  const { user, dispatch } = useContext(AuthContext);
  const [saved, setSaved] = useState(false);
  const [share, setShare] = useState(false);
  const [update, setUpdate] = useState(false);
  const [imageExists, setImageExists] = useState(true);

  const location = useLocation();
  const pathname = location.pathname.split('/').pop();

  useEffect(() => {    
    if (Array.isArray(user.savedposts)) {
      const isSaved = user.savedposts.some(savedPost => savedPost.postId === src._id);
      setSaved(isSaved);
    } else {
      setSaved(false); 
    }
  }, [user.savedposts, src._id]);


  useEffect(() => {
    const img = new Image();
    img.src = `/upload/${src.p_image}`;
    img.onload = () => setImageExists(true);
    img.onerror = () => setImageExists(false);
  }, [src.p_image]);

  const toggleSave = async (e) => {
    // e.stopPropagation();
    try {
      let updatedSavedposts = [];
      if (Array.isArray(user.savedposts)) {
        updatedSavedposts = saved ? user.savedposts.filter(savedPost => savedPost.postId !== src._id) : [...user.savedposts, { postId: src._id }];
      } else {
        updatedSavedposts = [{ postId: src._id }]; 
      }
      
      await makeRequest.post(`/users/${saved ? 'unsavepost' : 'savepost'}`, { userId: user._id, postId: src._id, postImage: src.p_image });
      setSaved(!saved);
      dispatch({ type: "UPDATE_PROFILE", payload: { savedposts: updatedSavedposts } });
    } catch (err) {
      console.error(err);
    }
  }
  

  const handleUpdate = (e) => {
    // e.stopPropagation();
    setUpdate(!update);
  }

  const handleShare = (e) => {
    // e.stopPropagation();
    setShare(!share);
  }

  const id = src.postId || src._id;
  const img = src.postImage || src.p_image;

  return (
    <div className="card" key={id}>            
        <Link to={`/single/${id}`} state={src}>
          <img
            src={"/upload/" + img}
            alt={src.username}
            className="card-image"
          />
        </Link>      
      {pathname === "home" && (
        <button className={saved ? "saved-btn" : "save-button"} onClick={toggleSave}>
          {!saved ? "Save" : "Unsave"}
        </button>
      )}
      <div className="bottom">
        <div className="cardiconcon"><RiUpload2Line size={20} onClick={handleShare} /></div>
        <div className="cardiconcon"><FiMoreHorizontal size={20} onClick={handleUpdate} /></div>
      </div>
      {update && (
        <div className="delete">
          <Update CLICK={() => setUpdate(false)} data={src} unsave={unsave}/>
        </div>
      )}
    </div>
  );
};

export default Card;
