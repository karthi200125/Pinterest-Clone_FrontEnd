import React, { useState } from 'react';
import './Create.css';
import { GrClose } from 'react-icons/gr';
import { BsQuestionLg } from 'react-icons/bs';
import { BiSolidUpArrowCircle } from 'react-icons/bi';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';

const Create = () => {
  const [createopen, setcreateopen] = useState(false);
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    // Navigate to the "Upload" page with the selected file as state
    navigate('/upload', { state: selectedFile });
  };

  return (
    <div className='create'>
      <Navbar />
      <div className='scp'>
        <img src='https://i.pinimg.com/originals/df/01/67/df016746913dc6cefe09cc822a82636c.jpg' alt='' />
        <div className='text'>
          <h1>Start creating Pins</h1>
          <span>Drafts expire 30 days after you’ve first</span>
          <span>saved them. After that, they’re deleted.</span>
          <button className='btn' onClick={() => setcreateopen(true)}>
            Create new
          </button>
        </div>
      </div>

      {createopen && (
        <div className='createboxcon'>
          <div className='createbox'>
            <div className='top'>
              <div className='createclose' onClick={() => setcreateopen(false)}>
                <GrClose />
              </div>
              <h1>Create Pin</h1>
              <div className='createclose'>
                <BsQuestionLg />
              </div>
            </div>

            <input
              type='file'
              id='imageInput'
              accept='image/*'
              onChange={handleFileChange}
              style={{ display: 'none' }}
            />
            <label htmlFor='imageInput' className='uploadbox'>
              <BiSolidUpArrowCircle size={30} />
              <span>Choose a File or Drag and Drop it here</span>
            </label>

            <div className='btm'>
              <span>Looking to create Pins from a website link instead?</span>
              <Link to='/upload'>
                <button>Save from URL</button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Create;
