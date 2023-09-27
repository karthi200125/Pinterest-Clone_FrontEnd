import React, { useState } from 'react'
import './Singleimg.css'
import { TbZoomPan } from 'react-icons/tb'
import { FiMoreHorizontal } from 'react-icons/fi'
import { RiUpload2Line } from 'react-icons/ri'
import { FaLink } from 'react-icons/fa'
import { BsChevronDown } from 'react-icons/bs'
import { TfiHeart } from 'react-icons/tfi'
import { MdKeyboardArrowUp } from 'react-icons/md'

const Singleimg = () => {

    const [commentopen, setcommentopen] = useState(false)

    return (
        <div className='singlecon'>
            <div className="single">
                <div className="left">
                    <img src="https://i.pinimg.com/564x/ad/d1/62/add162e1daaf49e9560bf26b5d639bb5.jpg" alt="" />
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
                        <div className="follow">
                            <div className="fname">
                                <img src="https://i.pinimg.com/75x75_RS/73/72/a6/7372a6f7f3ed4ce626b99928e8ee109f.jpg" alt="" className='img fnameimg' />
                                <h1>karthkeyan <p>100 followers</p></h1>
                            </div>
                            <button className='graybtn'>Follow</button>
                        </div>
                        <div className="cud">
                            <span>Comments <div className="iconhover" onClick={()=>setcommentopen(!commentopen)}>{commentopen ? <MdKeyboardArrowUp/> : <BsChevronDown/> }</div></span>
                            {commentopen &&
                                <div className="commentscon">
                                    comments
                                </div>
                            }
                        </div>
                    </div>
                    <div className="s_btm">
                        <span>2 comments <div className="iconhover"><TfiHeart /></div></span>
                        <div className="comment">
                            <img src="https://i.pinimg.com/75x75_RS/41/7e/5c/417e5c126d9754ecc265007a096f97a1.jpg" alt="" />
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