import React, { useContext, useState } from 'react';
import './EditProfile.css';
import { AuthContext } from '../../Context/Authcontext';
import Navbar from '../../components/Navbar/Navbar';
import { BiSolidRightArrowAlt } from 'react-icons/bi'
import { makeRequest } from '../../axios'
import { useMutation, useQueryClient } from '@tanstack/react-query';

const EditProfile = () => {
  const { user, dispatch } = useContext(AuthContext);
  const queryClient = useQueryClient();

  const [file, setFile] = useState(null);
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [password, setpassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await makeRequest.post("/upload", formData);
      return res.data;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  const mutation = useMutation((newpost) => {
    return makeRequest.put(`/users/${user._id}`, newpost);
  }, {
    onSuccess: () => {
      queryClient.invalidateQueries(['profile']);
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLoading) return;
    setIsLoading(true);

    try {
      let imgUrl = await upload();
      await mutation.mutateAsync({
        email,
        username,
        // password,
        userId: user._id,
        profilePic: imgUrl
      });
      dispatch({ type: "UPDATE_PROFILE", payload: { email, username, profilePic: imgUrl } });
      console.log("Update success");
    } catch (error) {
      console.error("Update Failed");
    } finally {
      setIsLoading(false);
    }
  };

  console.log("fromn edit", user)

  return (
    <>
      <Navbar />
      <div className='editcon'>
        <form onSubmit={handleSubmit}>
          <div className='edittop'>
            <h1>Edit Profile</h1>
            <p>Keep your personal details private. Information you add here is visible to anyone who can view your profile.</p>
          </div>

          <div className='imgcon'>
            <p>Photo</p>
            <div className='imgcon2'>
              {user.profilePic ?
                <img src={"../upload/" + user.profilePic} alt={user.username} className='editproimg' />
                :
                <img src="https://images.getpng.net/uploads/preview/instagram-social-network-app-interface-icons-smartphone-frame-screen-template27-1151637511568djfdvfkdob.webp" alt="" className='editpropic' />
              }
              <label className='graybtn' htmlFor='imageInput'>
                Change
              </label>
              {file && (
                <div className="changeimgcon">
                  <BiSolidRightArrowAlt size={30} />
                  <img className="changeimg" alt="" src={URL.createObjectURL(file)} />
                </div>
              )}
              <input
                type='file'
                id='imageInput'
                accept='image/*'
                onChange={(e) => setFile(e.target.files[0])}
                style={{ display: 'none' }}
              />
            </div>
          </div>

          <div className='editinputbox'>
            <span>Name</span>
            <input type='text' placeholder='User Name' value={username} onChange={(e) => setUsername(e.target.value)} />
          </div>
          <div className='editinputbox'>
            <span>Email</span>
            <input type='email' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          {/* <div className='editinputbox'>
            <span>password</span>
            <input type='password' placeholder='password' value={password} onChange={(e) => setpassword(e.target.value)} />
          </div> */}
          <div className='btns'>
            <button className='graybtn'>Reset</button>
            <button className='redbtn' type='submit'>
              {isLoading ? "pleaseWait..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditProfile;
