import React from 'react'
import './Upload.css'
import { BiSolidPencil } from 'react-icons/bi'

const Upload = () => {
    return (
        <div className='uploadcon'>
            <div className="publish">
                <span>Changes Stored!</span>
                <button>Publish</button>
            </div>
            <div className="upload">
                <div className="left">
                    <div className="imgcon">
                        <div className='iconhover pencil'><BiSolidPencil /></div>
                        <img src="" alt="" />
                    </div>
                </div>
                <div className="right">
                    <form action="">
                        <div className="top">
                            <label htmlFor="">Title</label>
                            <input type="text" placeholder='Add a title' />
                            <label htmlFor="">Description</label>
                            <input type="textarea" placeholder='write a detailed description for your Pin  Here or add specific list below' className='textarea' />
                        </div>
                        <div className="details">
                            <span>Details</span>
                            <div className="checkboxs">
                                <div className='checkbox'><input type="checkbox" /><span>Ingrdients</span></div>
                                <div className='checkbox'><input type="checkbox" /><span>Supplies</span></div>
                                <div className='checkbox'><input type="checkbox" /><span>Notes</span></div>
                                <div className='checkbox'><input type="checkbox" /><span>None</span></div>
                            </div>
                        </div>
                        <div className="top">
                            <label htmlFor="">Link</label>
                            <input type="text" placeholder='Add a Link' />
                            <label htmlFor="">Tagged topics (0)</label>
                            <input type="text" placeholder='Search for a tag' />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Upload