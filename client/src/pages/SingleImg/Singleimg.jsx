import React, { useEffect, useState } from 'react';
import './Singleimg.css';
import { TbZoomPan } from 'react-icons/tb';
import { FiMoreHorizontal } from 'react-icons/fi';
import { RiUpload2Line } from 'react-icons/ri';
import { FaLink } from 'react-icons/fa';
import { BsChevronDown } from 'react-icons/bs';
import { AiFillHeart } from 'react-icons/ai';
import { MdKeyboardArrowUp } from 'react-icons/md';
import { CiUser } from 'react-icons/ci';
import { Link, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../Context/Authcontext';
import Navbar from '../../components/Navbar/Navbar';
import axios from 'axios';

const Singleimg = () => {
    const [liked, setLiked] = useState(false);
    const [commentopen, setCommentOpen] = useState(false);
    const [saved, setSaved] = useState(false);
    const [followed, setFollowed] = useState(false);
    const location = useLocation();
    const data = location.state;
    const pathnameSegments = location.pathname.split('/');
    const pathname = pathnameSegments.pop();

    const { user } = useContext(AuthContext);

    const comments = false;

    useEffect(() => {
        if (user.savedposts.some(savedPost => savedPost.postId === data._id)) {
            setSaved(true);
        }
    }, [user.savedposts, data._id]);

    useEffect(() => {
        setFollowed(user.followers?.includes(pathname));
      }, [user.followers, pathname]);

    const handleSaveClick = async () => {
        try {
            if (saved) {
                await axios.post("http://localhost:8800/api/users/unsavepost", { userId: user._id, postId: data._id });
            } else {
                await axios.post("http://localhost:8800/api/users/savepost", { userId: user._id, postId: data._id, postImage: data.p_image });
            }
            setSaved(!saved);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        // Check if the user has liked this post and set the initial state
        const checkLiked = async () => {
            try {
                const response = await axios.get(`http://localhost:8800/api/posts/${pathname}/like/${user._id}`);
                setLiked(response.data.liked);
            } catch (error) {
                console.error(error);
            }
        };

        checkLiked();
    }, [pathname, user._id]);

    const handleLikeClick = async () => {
        try {
            // Toggle the like status when the heart icon is clicked
            if (liked) {
                await axios.put(`http://localhost:8800/api/posts/${pathname}/unlike`, { userId: user._id });
            } else {
                await axios.put(`http://localhost:8800/api/posts/${pathname}/like`, { userId: user._id });
            }
            setLiked(!liked);
        } catch (err) {
            console.log(err);
        }
    };

    const handleFollow = async () => {
        try {
          if (followed) {
            await axios.put(`http://localhost:8800/api/users/${pathname}/unfollow`, { userId: user._id });
          } else {
            await axios.put(`http://localhost:8800/api/users/${pathname}/follow`, { userId: user._id });
          }
        } catch (error) {
          console.log(error);
        }
        setFollowed(!followed);
      };
    
console.log(pathname,"pathname")

    return (
        <div className='singlecon'>
            <Navbar />
            <div className="single">
                <div className="left">
                    <img src={'/upload/' + data.p_image} alt="" />
                    <div className="iconhover zoom"><TbZoomPan size={25} /></div>
                </div>
                <div className="right">
                    <div className="s_top">
                        <div className="one">
                            <div className="iconhover"><FiMoreHorizontal size={25} /></div>
                            <div className="iconhover"><RiUpload2Line size={25} /></div>
                            <div className="iconhover"><FaLink size={25} /></div>
                        </div>
                        <div className="two">
                            <h1>Profile <BsChevronDown /></h1>
                            <button className={saved ? "graybtn" : "redbtn"} onClick={handleSaveClick}>
                                {saved ? "Saved" : "Save"}
                            </button>
                        </div>
                    </div>
                    <div className="s_mid">
                        <div className="imgcontent">
                            <h1>{data.p_title}</h1>
                            <span>{data.p_desc}</span>
                        </div>
                        <div className="follow">
                            <Link to={`/profile/${data.userId}`} >
                                <div className="fname">
                                    {data.userimg ?
                                        <img src={"/upload/" + data.userimg} alt="" className='img fnameimg' />
                                        : <CiUser size={30} />}
                                    <h1>{data.username}<p>{data.folloers} following</p></h1>
                                </div>
                            </Link>
                            <button className='redbtn' onClick={handleFollow}>
                                {followed ? "Unfollow" : "Follow"}
                            </button>
                        </div>
                        <div className="cud">
                            <span>Comments <div className="iconhover" onClick={() => setCommentOpen(!commentopen)}>{commentopen ? <MdKeyboardArrowUp /> : <BsChevronDown />}</div></span>
                            {
                                comments ? (
                                    commentopen && (
                                        <div className="commentscon">
                                            comments
                                        </div>
                                    )
                                ) : (
                                    "No comments yet! Add one to start the conversation."
                                )
                            }
                        </div>
                    </div>
                    <div className="s_btm">
                        <span>
                            <div className="iconhover">
                                <AiFillHeart
                                    size={25}
                                    onClick={handleLikeClick}
                                    style={{
                                        color: data.p_likes.includes(user._id) ? 'red' : liked ? 'red' : 'gray'
                                    }}
                                />
                            </div>
                            {data.p_likes.length} Likes
                        </span>
                        <div className="comment">
                            <img src={"/upload/" + user.profilePic} alt={user.username} />
                            <div className="input">
                                <input type="text" placeholder='Add a comment' />
                                <img src="https://images.getpng.net/uploads/preview/happy-3d-stylized-emoji-10-11516522523175sv6evaiwb.webp" alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="moreliket">
                <h1>More Like This</h1>
            </div>
        </div>
    );
}

export default Singleimg;
