import React, { useContext } from 'react';
import './Update.css';
import { FaTimes } from 'react-icons/fa';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { makeRequest } from '../../axios';
import { AuthContext } from '../../Context/Authcontext';
import { useLocation } from 'react-router-dom';
import { errorToast, successToast } from '../../toasts';
import { storage } from '../../firebase';
import { ref, deleteObject } from "firebase/storage";


const Update = ({ updateClose, data, unsave }) => {
  const queryClient = useQueryClient();
  const { user, dispatch } = useContext(AuthContext);
  const location = useLocation();
  const pathname = location.pathname.split('/').pop();

  const mutation = useMutation(() => makeRequest.delete(`/posts/${data._id}`, { data: { userId: user._id } }), {
    onSuccess: () => {
      queryClient.invalidateQueries(['posts']);
      window.location.reload();
    },
  });

  const handleDelete = async () => {
    try {
      mutation.mutate();
      const imageRef = ref(storage, data.p_image);
      await deleteObject(imageRef);
      alert('Are you sure you want to delete the image');
      successToast("Post deleted successfully");
    } catch (error) {
      errorToast("Somthing went wrong", error)
    }

  };

  console.log(data.p_image)

  const handleUnsave = async () => {
    try {
      const res = await makeRequest.post('/users/unsavepost', { userId: user._id, postId: data._id });
      dispatch({ type: "UPDATE_PROFILE", payload: { savedposts: res } });
      window.location.reload();
      successToast("post Has been un saved")
    } catch (err) {
      console.error(err);
      errorToast("somthing went wrong")
    }
  }

  const imageUrl = "/upload/" + data.p_image;



  return (
    <div className="updatecon">
      <FaTimes size={20} onClick={() => updateClose(false)} />
      <div className="update">
        <a href={imageUrl} download onClick={() => successToast("image donwloaded successfully")}>
          Download Image
        </a>
        {(!unsave && pathname === user._id) && (
          <>
            <span onClick={handleDelete}>Delete Image</span>
          </>
        )}
        {unsave && pathname === user._id && (
          <span className="unsave" onClick={handleUnsave}>Unsave Image</span>
        )}
      </div>
    </div>
  );
};

export default Update;
