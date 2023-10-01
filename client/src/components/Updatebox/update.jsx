import React, { useContext } from 'react';
import './Update.css';
import { FaTimes } from 'react-icons/fa';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { makeRequest } from '../../axios';
import { AuthContext } from '../../Context/Authcontext';
import { useLocation } from 'react-router-dom';

const Update = ({ CLICK, data, unsave }) => {
  const queryClient = useQueryClient();
  const { user, dispatch } = useContext(AuthContext);
  const location = useLocation();
  const pathnameSegments = location.pathname.split('/');
  const pathname = pathnameSegments.pop();  

  const mutation = useMutation((newpost) => {
    return makeRequest.delete(`/posts/${data._id}`, newpost);
  }, {
    onSuccess: () => {
      queryClient.invalidateQueries(['posts']);
      // Reload the page after successful delete
      window.location.reload();
    },
  });

  const handleclick = () => {
    CLICK(false);
  };

  const handledelete = () => {
    mutation.mutate({ data: { userId: user._id } });
    alert('Are you sure you want to delete the image');
    console.log("post deleted successfully");
  };

  const handleupdate = () => {
    // Add your update logic here
  };

  const handleunsave = async () => {
    try {                  
      const res = await makeRequest.post('/users/unsavepost', { userId: user._id, postId: data.postId });        
      dispatch({ type: "UPDATE_PROFILE", payload: { savedposts: res } });
      // Reload the page after successful unsave
      window.location.reload();
    } catch (err) {
      console.error(err);
    }
  }
  

  console.log(data)
  const imageUrl = "/upload/" + data.p_image;

  return (
    <div className="updatecon">
      <FaTimes size={20} onClick={handleclick} />
      <div className="update">
        <a href={imageUrl} download>
          Download Image
        </a>
        {!unsave && pathname === user._id && <span onClick={handleupdate}>Update Image</span>}
        {!unsave && pathname === user._id && <span onClick={handledelete}>Delete Image</span>}
        {unsave && <span className="unsave" onClick={handleunsave}>Unsave Image</span>}
      </div>
    </div>
  );
};

export default Update;
