import React, { useContext, useState } from 'react';
import './Upload.css';
import { BiSolidPencil } from 'react-icons/bi';
import { AuthContext } from '../../Context/Authcontext';
import axios from 'axios';
import Navbar from '../../components/Navbar/Navbar';
import { useLocation } from 'react-router-dom';
import { makeRequest } from '../../axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { errorToast, successToast } from '../../toasts';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from '../../firebase'

const Upload = () => {
  const { user } = useContext(AuthContext);

  const queryClient = useQueryClient();

  const location = useLocation();
  const imgfromcreate = location.state;

  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const [desc, setDesc] = useState('');
  const [file, setFile] = useState(imgfromcreate || null);

  const mutation = useMutation((newpost) => {
    return makeRequest.post('/posts', newpost)
  }
    , {
      onSuccess: () => {
        queryClient.invalidateQueries(['posts'])
      },
    })

    const handleSubmit = async (e) => {
      e.preventDefault();
      if (loading || !file) return;
    
      setLoading(true);
    
      try {
        const imgUrl = new Date().getTime() + file.name;
        const storage = getStorage(app);
        const storageRef = ref(storage, imgUrl);
    
        const uploadTask = uploadBytesResumable(storageRef, file);
    
        uploadTask.on(
          'state_changed',
          (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');            
          },
          (error) => {            
            errorToast('Upload error:', error);
            setLoading(false); 
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref)
              .then(async (downloadURL) => {
                mutation.mutate({
                  p_title: title,
                  p_desc: desc,
                  userId: user._id,
                  p_image: downloadURL,
                });
                setFile(null);
                setDesc('');
                setTitle('');
                setLoading(false); 
                successToast('Post has been created successfully');
              })
              .catch((error) => {
                console.error('Error getting download URL:', error);
                setLoading(false); 
              });
          }
        );
      } catch (error) {
        console.error('Post create failed:', error);
        setLoading(false); 
      }
    };
    
  return (
    <div className="uploadcon">
      <Navbar />
      <div className="publish">
        <span>Changes Stored!</span>
        <button onClick={handleSubmit} className='redbtn'>{loading ? "publishing..." : "Publish"}</button>
      </div>
      <div className="upload">
        <div className="left">
          <div className="imgcon">
            <div className="iconhover pencil">
              <input
                type='file'
                id='imageInput'
                accept='image/*'
                onChange={(e) => setFile(e.target.files[0])}
                style={{ display: 'none' }}
              />
              <label htmlFor='imageInput' className='uploadbox'>
                <BiSolidPencil />
              </label>
            </div>
            {file && <img src={URL.createObjectURL(file)} alt="" />}
          </div>
        </div>
        <div className="right">
          <form>
            <div className="top">
              <label htmlFor="">Title</label>
              <input type="text" placeholder="Add a title" value={title} onChange={(e) => setTitle(e.target.value)} required />
              <label htmlFor="">Description</label>
              <textarea
                placeholder="Write a detailed description for your Pin here or add specific list below"
                className="textarea"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                required
              ></textarea>
            </div>
            <div className="details">
              <span>Details</span>
              <div className="checkboxs">
                <div className="checkbox">
                  <input type="checkbox" />
                  <span>Ingredients</span>
                </div>
                <div className="checkbox">
                  <input type="checkbox" />
                  <span>Supplies</span>
                </div>
                <div className="checkbox">
                  <input type="checkbox" />
                  <span>Notes</span>
                </div>
                <div className="checkbox">
                  <input type="checkbox" />
                  <span>None</span>
                </div>
              </div>
            </div>
            <div className="top">
              <label htmlFor="">Link</label>
              <input type="text" placeholder="Add a Link" />
              <label htmlFor="">Tagged topics (0)</label>
              <input type="text" placeholder="Search for a tag" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Upload;
