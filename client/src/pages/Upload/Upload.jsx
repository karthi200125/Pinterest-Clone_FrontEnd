import React, { useContext, useState } from 'react';
import './Upload.css';
import { BiSolidPencil } from 'react-icons/bi';
import { AuthContext } from '../../Context/Authcontext';
import axios from 'axios';
import Navbar from '../../components/Navbar/Navbar';
import { useLocation } from 'react-router-dom';

const Upload = () => {
  const { user } = useContext(AuthContext);

const location = useLocation();
const imgfromcreate = location.state;

  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const [desc, setDesc] = useState('');
  const [file, setFile] = useState(imgfromcreate || null);

  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      const res = await axios.post('http://localhost:8800/api/upload', formData);
      return res.data;
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(loading) return ;
    setLoading(true)
    try {
      let imgUrl = await upload();
      await axios.post(`http://localhost:8800/api/posts`, {
        p_title: title,
        p_desc: desc,
        userId: user._id,
        p_image: imgUrl,
      });      
      setFile("")
      setDesc("")
      setFile(null)
      console.log('Post created successfully');
    } catch (error) {
      console.error('Post create failed');
    }finally{
        setLoading(false)
    }
  };

  return (
    <div className="uploadcon">
      <Navbar />
      <div className="publish">
        <span>Changes Stored!</span>
        <button onClick={handleSubmit}>{loading ? "publishing..." : "Publish"}</button>
      </div>
      <div className="upload">
        <div className="left">
          <div className="imgcon">
            <div className="iconhover pencil">
            <input
              type='file'
              id='imageInput'
              accept='image/*'
              onChange={(e)=>setFile(e.target.files[0])}
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
              <input type="text" placeholder="Add a title" onChange={(e) => setTitle(e.target.value)} required />
              <label htmlFor="">Description</label>
              <textarea
                placeholder="Write a detailed description for your Pin here or add specific list below"
                className="textarea"
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
