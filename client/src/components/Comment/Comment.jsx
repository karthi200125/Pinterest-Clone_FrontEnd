import React, { useContext } from 'react';
import { FiMoreHorizontal } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../Context/Authcontext';
import './Comment.css';

const Comment = ({ comment }) => {
  const { user } = useContext(AuthContext);

  return (
    <div className='commentbox'>
      <div className='t'>
        <Link to={`/profile/${user._id}`}>
          <img
            src={comment.profilePic ? comment.profilePic : 'https://images.getpng.net/uploads/preview/instagram-social-network-app-interface-icons-smartphone-frame-screen-template27-1151637511568djfdvfkdob.webp'}
            alt=''
          />
        </Link>
        <span>{comment.username}</span>
        <div className='iconhover'>
          <FiMoreHorizontal />
        </div>
      </div>

      <p>{comment.comment}</p>
    </div>
  );
};

export default Comment;
