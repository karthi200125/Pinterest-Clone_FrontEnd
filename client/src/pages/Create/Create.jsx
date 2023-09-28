import React, { useState } from 'react'
import './Create.css'
import { GrClose } from 'react-icons/gr'
import { BsQuestionLg } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import Navbar from '../../components/Navbar/Navbar'

const Create = () => {

    const [createopen, setcreateopen] = useState(false)

    return (
        <div className='create'>
            <Navbar/>
            <div className="scp">
                <img src="https://i.pinimg.com/originals/df/01/67/df016746913dc6cefe09cc822a82636c.jpg" alt="" />
                <div className="text">
                    <h1>Start creating Pins</h1>
                    <span>Drafts expire 30 days after you’ve first</span>
                    <span>saved them. After that, they’re deleted.</span>
                    <button className='btn' onClick={() => setcreateopen(true)}>Create new</button>
                </div>
            </div>

            {createopen &&
                <div className="createboxcon">
                    <div className="createbox">
                        <div className="top">                            
                            <div className="createclose" onClick={() => setcreateopen(false)}><GrClose /></div>
                            <h1>Create Pin</h1>
                            <div className="createclose"><BsQuestionLg /></div>
                        </div>
                        <div className="uploadbox">

                        </div>
                        <div className="btm">
                            <span>Looking to create Pins from a website link instead?</span>
                            <Link to='/upload'><button>Save from URL</button></Link>                            
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default Create