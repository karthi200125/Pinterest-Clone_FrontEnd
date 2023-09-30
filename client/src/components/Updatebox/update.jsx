import React, { useContext } from 'react';
import './Update.css';
import { FaTimes } from 'react-icons/fa';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { makeRequest } from '../../axios';
import { AuthContext } from '../../Context/Authcontext';
import { useLocation } from 'react-router-dom';

const Update = ({ CLICK, data }) => {
  const queryClient = useQueryClient();
  const { user } = useContext(AuthContext);
  const location = useLocation();
  const pathnameSegments = location.pathname.split('/');
  const pathname = pathnameSegments.pop();

  const mutation = useMutation((newpost) => {
    return makeRequest.delete(`/posts/${data._id}`, newpost);
  }, {
    onSuccess: () => {
      queryClient.invalidateQueries(['createdpost']);
    },
  });

  const handleclick = () => {
    CLICK(false);
  };

  const handledelete = () => {
    mutation.mutate({ data: { userId: user._id } });
    alert('Are you sure you want to delete the image');
  };

  const handleupdate = () => {
    // Add your update logic here
  };

  const imageUrl ="/upload/"+ data.p_image;

  return (
    <div className="updatecon">
      <FaTimes size={20} onClick={handleclick} />
      <div className="update">
        
        <a href={imageUrl} download >
           Download Image
        </a>       
        {pathname === user._id && (          
            <span onClick={handleupdate}>Update Image</span>            
        )}
        {pathname === user._id && (          
            <span onClick={handledelete}>Delete Image</span>          
        )}
      </div>
    </div>
  );
};

export default Update;
