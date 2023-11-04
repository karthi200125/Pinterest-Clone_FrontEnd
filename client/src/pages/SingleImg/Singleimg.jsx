import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useContext, useEffect, useState } from 'react';
import { AiFillHeart } from 'react-icons/ai';
import { CiUser } from 'react-icons/ci';
import { FaLink } from 'react-icons/fa';
import { FiMoreHorizontal } from 'react-icons/fi';
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md';
import { RiUpload2Line } from 'react-icons/ri';
import { TbZoomPan } from 'react-icons/tb';
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../../Context/Authcontext';
import { makeRequest } from '../../axios';
import Card from '../../components/Card/Card';
import Comment from '../../components/Comment/Comment';
import Loading from '../../components/Loading/Loading';
import Navbar from '../../components/Navbar/Navbar';
import { emojiToast, errorToast, successToast } from '../../toasts';
import './Singleimg.css';

const Singleimg = () => {
    const [liked, setLiked] = useState(false);
    const [commentopen, setCommentOpen] = useState(true);
    const [commentinput, setCommentInput] = useState("");
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
            saved ? successToast("post has been Unsaved") : successToast("post has been Saved");
        } catch (err) {
            console.log(err);
        }
    };

    const { isLoading, error, data: commentsdata } = useQuery(["comments"], async () =>
        await makeRequest.get(`/posts/singlepost/${pathname}`).then((res) => {
            return res.data;
        })
    );

    useEffect(() => {
        setLiked(data.p_likes.includes(user._id));
    }, [user._id, data.p_likes]);

    const [likecount, setLikeCount] = useState(data?.p_likes?.length);

    const handleLikeClick = async () => {
        try {
            await makeRequest.put(`/posts/${pathname}/like`, { userId: user._id });
            setLiked(!liked);
            liked ? emojiToast("post has been Disliked", "👎") : emojiToast("post has been Liked", "👍");
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

    const handleCommentClick = async (e) => {
        e.preventDefault();
        try {
            await mutation.mutateAsync({ userId: user._id, postId: data._id, username: user.username, profilePic: user.profilePic, comment: commentinput });
            emojiToast("Your comment has been added to that post", "💬");
            setCommentInput("");
        } catch (error) {
            errorToast("Failed");
        }
    }


    const { isLoading: filterpostsloading, error: filterposterr, data: filterposts } = useQuery(['posts'], async () => {
        const res = await makeRequest.get(`/posts/allposts`);
        const allPosts = res.data;
        const filteredPosts = allPosts.filter(post => post.p_title === data.p_title && post._id !== data._id);
        return filteredPosts;
    });

    const check = user?.followed?.includes(data?.userId)
    
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
                                <h1>Profile <MdKeyboardArrowDown /></h1>
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
                                        <h1>{data.username}<p>{check ? "Following" : "Follow"}</p></h1>
                                    </div>
                                </Link>
                            </div>
                        }
                        <div className="cud">
                            <span>{data?.comments?.length ?? 0} Comments <div className="iconhover" onClick={() => setCommentOpen(!commentopen)}>{commentopen ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}</div></span>
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
                                    <span className='nocmts'>No comments yet! Add one to start the conversation</span>
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
                                    <input type="text" placeholder='Add a comment' value={commentinput} onChange={(e) => setCommentInput(e.target.value)} />
                                    <button onClick={handleCommentClick} className='commentbtn'>Send</button> {/* Corrected 'send' */}
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>
            <div className="morelikethat">
                <h1>More Like This</h1>
                <div className="morelikathatcards">
                    {filterpostsloading ? (
                        <Loading />
                    ) : (
                        filterposts?.length > 0 ? (
                            filterposts.map((post) => (
                                <Card src={post} key={post._id} />
                            ))
                        ) : (
                            <span className='noposts'>No posts yet</span>
                        )
                    )}
                </div>
            </div>

        </div>
    );
}

export default Singleimg;
