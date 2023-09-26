import React, { useState } from 'react'
import './Profile.css'
import { AiOutlinePlus } from 'react-icons/ai'
import { BiGitCompare } from 'react-icons/bi'

const Profile = () => {

    const [create, setcreate] = useState(true)
    const [saved, setsaved] = useState(false)

    const handlecreate = () => {
        setcreate(true)
        setsaved(false)
    }

    const handlesaved = () => {
        setsaved(true)
        setcreate(false)

    }

    return (
        <div className='profilecon'>
            <div className="profile">
                <img src="https://i.pinimg.com/280x280_RS/41/7e/5c/417e5c126d9754ecc265007a096f97a1.jpg" alt="" />
                <h1>KarthiKeyan</h1>
                <p>Email.com</p>
                <span>0 following</span>
                <div className="btns">
                    <button className='graybtn'> Share</button>
                    <button className='graybtn'>Edit Profile</button>
                </div>
            </div>
            <div className="c-s">
                <span onClick={handlecreate} className={create ? "slideactive" : ""}>Create</span>
                <span onClick={handlesaved} className={saved ? "slideactive" : ""}>Saved</span>
                {create &&
                    <div className="createe" >
                        <span>Nothing to show...yet! Pins you create will live here.</span>
                        <button className='redbtn'>Create Pin</button>
                    </div>
                }
                {saved &&
                    <div className="saved">
                        <span>
                            <div className="iconhover"><BiGitCompare size={25}/></div>
                            <div className="iconhover"><AiOutlinePlus size={25}/></div>
                        </span>
                        <p>You haven't saved any Pins yet</p>
                        <button className='graybtn'>Finde Ideas</button>
                    </div>
                }
            </div>
        </div>
    )
}

export default Profile