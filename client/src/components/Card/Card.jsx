import React, { useContext, useState, useEffect } from 'react';
import './Card.css';
import { RiUpload2Line } from 'react-icons/ri';
import { FiMoreHorizontal } from 'react-icons/fi';
import { AuthContext } from '../../Context/Authcontext';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const Card = ({ src }) => {

  const { user } = useContext(AuthContext);
  const [saved, setSaved] = useState(false);
  const [share, setshare] = useState(false);
  const location = useLocation();
  const pathnameSegments = location.pathname.split('/');
  const pathname = pathnameSegments.pop();


  useEffect(() => {
    if (user.savedposts.some(savedPost => savedPost.postId === src._id)) {
      setSaved(true);
    }
  }, [user.savedposts, src._id]);

  const handleSaveClick = async () => {
    try {
      saved ?
        await axios.post("http://localhost:8800/api/users/unsavepost", { userId: user._id, postId: src._id })
        :
        await axios.post("http://localhost:8800/api/users/savepost", { userId: user._id, postId: src._id, postImage: src.p_image });
      setSaved(!saved);
    } catch (err) {
      console.log(err);
    }
  }

  const id = src.postId ? src.postId : src._id;
  const img = src.postImage ? src.postImage : src.p_image;

  return (
    <>
      <div className="card" key={id}>
        <img src={"/upload/" + img} alt="" className="card-image" />
        {pathname === "home" &&
          <button className={saved ? "saved-btn" : "save-button"} onClick={handleSaveClick}>
            {saved ? "Saved" : "Save"}
          </button>
        }
        <div className="bottom">
          <div className="cardiconcon"><RiUpload2Line size={20} onClick={() => setshare(!share)} /></div>
          <div className="cardiconcon"><FiMoreHorizontal size={20} /></div>
        </div>        
      </div>
    </>
  );
};

export default Card;
