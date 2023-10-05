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
import { makeRequest } from '../../axios';
import Comment from '../../components/Comment/Comment';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { emojiToast, errorToast, successToast } from '../../toasts';

const Singleimg = () => {
    const [liked, setLiked] = useState(false);
    const [commentopen, setCommentOpen] = useState(true);
    const [commentinput, setcommentinput] = useState("");
    const [saved, setSaved] = useState(false);
    const location = useLocation();
    const queryClient = useQueryClient();    
    const data = location.state;
    const pathnameSegments = location.pathname.split('/');
    const pathname = pathnameSegments.pop();

    const { user } = useContext(AuthContext);

    useEffect(() => {
        if (Array.isArray(user.savedposts)) {
            const isSaved = user.savedposts.some(savedPost => savedPost.postId === data._id);
            setSaved(isSaved);
        } else {
            setSaved(false);
        }
    }, [user.savedposts, data._id]);    

    const handleSaveClick = async () => {
        try {
            if (saved) {
                await makeRequest.post("/users/unsavepost", { userId: user._id, postId: data._id });
            } else {
                await makeRequest.post("/users/savepost", { userId: user._id, postId: data._id, postImage: data.p_image });
            }
            setSaved(!saved);
            saved ? successToast("post has been UnSaved"):successToast("post has been Saved")
        } catch (err) {
            console.log(err);
        }
    };
    
    
    const { isLoading, error, data:commentsdata } = useQuery(["comments"], async() =>
    await makeRequest.get(`/posts/singlepost/${pathname}`).then((res) => {
      return res.data;
    })
  );      

    useEffect(() => {
        setLiked(data.p_likes.includes(user._id))
    }, [user._id, data.p_likes])

    const [likecount, setLikeCount] = useState(data?.p_likes?.length)

    const handleLikeClick = async () => {
        try {
            await makeRequest.put(`/posts/${pathname}/like`, { userId: user._id });
            setLiked(!liked);
            liked ? emojiToast("post has been DisLiked", "👎"): emojiToast("post has been Liked" , "👍") ;
            setLikeCount(liked ? likecount - 1 : likecount + 1);
        } catch (err) {
            console.log(err);
        }
    };

    const mutation = useMutation((newpost) => {
        return makeRequest.post(`/posts/comment`, newpost);
      }, {
        onSuccess: () => {
          queryClient.invalidateQueries(['comments']);
        },
      });

    const handlecommentclick = async (e) => {
        e.preventDefault();
        try {
            await mutation.mutateAsync({ userId: user._id, postId: data._id, username: user.username, profilePic: user.profilePic, comment: commentinput });            
            emojiToast("Your comment Has been added that post" , "💬")
            setcommentinput("");
        } catch (error) {
            errorToast("Failed")
        }
    }


    

    return (
        <div className='singlecon'>
            <Navbar />
            <div className="single">
                <div className="left">
                    <img src={data.p_image} alt="" />
                    <div className="iconhover zoom"><TbZoomPan size={25} /></div>
                </div>
                <div className="right">
                    <div className="s_top">
                        <div className="one">
                            <div className="iconhover"><FiMoreHorizontal size={25} /></div>
                            <div className="iconhover"><RiUpload2Line size={25} /></div>
                            <div className="iconhover"><FaLink size={25} /></div>
                        </div>
                        {data.userId !== user._id &&
                            <div className="two">
                                <h1>Profile <BsChevronDown /></h1>
                                <button className={saved ? "graybtn" : "redbtn"} onClick={handleSaveClick}>
                                    {saved ? "Saved" : "Save"}
                                </button>
                            </div>
                        }
                    </div>
                    <div className="s_mid">
                        <div className="imgcontent">
                            <h1>{data.p_title}</h1>
                            <span>{data.p_desc}</span>
                        </div>
                        {data.userId !== user._id &&
                            <div className="follow">
                                <Link to={`/profile/${data.userId}`} >
                                    <div className="fname">
                                        {data.userimg ?
                                            <img src={data.userimg} alt="" className='img fnameimg' />
                                            : <CiUser size={30} />}
                                        <h1>{data.username}<p> following</p></h1>
                                    </div>
                                </Link>
                            </div>
                        }
                        <div className="cud">
                            <span>Comments <div className="iconhover" onClick={() => setCommentOpen(!commentopen)}>{commentopen ? <MdKeyboardArrowUp /> : <BsChevronDown />}</div></span>
                            {
                                data?.comments?.length > 0 ? (
                                    commentopen && (
                                        <div className="commentscon">
                                            {commentsdata?.comments?.map((comment) => (
                                                <Comment comment={comment} key={comment._id} />
                                            ))}
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
                                        color: liked ? 'red' : 'gray'
                                    }}
                                />
                            </div>
                            {likecount} Likes
                        </span>
                        {data.userId !== user._id &&
                            <div className="comment">
                                <img src={user.profilePic} alt={user.username} />
                                <div className="input">
                                    <input type="text" placeholder='Add a comment' value={commentinput} onChange={(e) => setcommentinput(e.target.value)} />
                                    <button onClick={handlecommentclick} className='commentbtn'>send</button>                                    
                                </div>
                            </div>
                        }
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
