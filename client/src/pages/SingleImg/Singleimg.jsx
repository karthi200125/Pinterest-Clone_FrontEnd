import React, { useState } from 'react'
import './Singleimg.css'
import { TbZoomPan } from 'react-icons/tb'
import { FiMoreHorizontal } from 'react-icons/fi'
import { RiUpload2Line } from 'react-icons/ri'
import { FaLink } from 'react-icons/fa'
import { BsChevronDown } from 'react-icons/bs'
import { TfiHeart } from 'react-icons/tfi'
import { MdKeyboardArrowUp } from 'react-icons/md'
import { CiUser } from 'react-icons/ci'
import { Link, useLocation } from 'react-router-dom'
import { useContext } from 'react'
import {AuthContext} from '../../Context/Authcontext'
import Navbar from '../../components/Navbar/Navbar'


const Singleimg = () => {

    const [commentopen, setcommentopen] = useState(false)
    const location = useLocation();
    const data = location.state;

    const {user} = useContext(AuthContext)

    const comments = false

    console.log("check user img",user.profilePic)


    return (
        <div className='singlecon'>
            <Navbar/>
            <div className="single">
                <div className="left">
                    <img src={data.p_image} alt="" />
                    <div className="iconhover"><TbZoomPan /></div>
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
                            <button className='redbtn'>Save</button>
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
                                    <img src={data.userimg} alt="" className='img fnameimg' />
                                    : <CiUser size={30} />}
                                <h1>{data.username}<p>100 followers</p></h1>
                            </div>
                            </Link>
                            <button className='graybtn'>Follow</button>
                        </div>
                        <div className="cud">
                            <span>Comments <div className="iconhover" onClick={() => setcommentopen(!commentopen)}>{commentopen ? <MdKeyboardArrowUp /> : <BsChevronDown />}</div></span>
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
                        <span>2 comments <div className="iconhover"><TfiHeart /></div></span>
                        <div className="comment">
                            <img src={user.profilePic} alt={user.username} />
                            <div className="input">
                                <input type="text" placeholder='Add a comment' />
                                <img src="" alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="moreliket">
                <h1>More Like This</h1>
            </div>
        </div>
    )
}

export default Singleimg