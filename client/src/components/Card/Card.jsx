import React, { useContext, useEffect, useState } from 'react';
import { FiMoreHorizontal } from 'react-icons/fi';
import { RiUpload2Line } from 'react-icons/ri';
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../../Context/Authcontext';
import { makeRequest } from '../../axios';
import Share from '../Share/Share';
import Update from '../Updatebox/update';
import './Card.css';
import { successToast } from '../../toasts';

const Card = ({ src, unsave }) => {
  const { user, dispatch } = useContext(AuthContext);
  const [saved, setSaved] = useState(false);
  const [share, setShare] = useState(false);
  const [update, setUpdate] = useState(false);
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

  const toggleSave = async () => {
    try {
      const updatedSavedposts = Array.isArray(user.savedposts)
        ? (saved
            ? user.savedposts.filter(savedPost => savedPost.postId !== src._id)
            : [...user.savedposts, { userId: user._id, postId: src._id, postImage: src.p_image }])
        : [{ userId: user._id, postId: src._id, postImage: src.p_image }];

      await makeRequest.post(`/users/${saved ? 'unsavepost' : 'savepost'}`, {
        userId: user._id,
        postId: src._id,
        postImage: src.p_image
      });
      setSaved(!saved);
      saved ? successToast("post has been UnSaved"):successToast("post has been Saved")
      dispatch({ type: "SAVEDPOSTS", payload: { savedposts: updatedSavedposts } });
    } catch (err) {
      console.error(err);
    }
  }

  const handleUpdate = () => {
    setUpdate(!update);
  }

  const handleShare = () => {
    setShare(!share);
  }

  const id = src.postId || src._id;
  const img = src.postImage || src.p_image;

  return (
    <div className="card" key={id}>
      <Link to={`/single/${id}`} state={src}>
        <img src={img} alt={src.username} className="card-image" />
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
          <Update updateClose={setUpdate} data={src} unsave={unsave} />
        </div>
      )}
      {share && (
        <div className="delete">
          <Share imageUrl={src.p_image} shareClose={setShare} />
        </div>
      )}
    </div>
  );
};

export default Card;
